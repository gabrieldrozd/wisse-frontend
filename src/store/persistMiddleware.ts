import type {AnyAction, Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {persistActions} from "@store/persistActions";
import type {RootState} from "@store/store";
import {defaultState} from "@store/store";

const DB_NAME = "appStateDB";

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            for (const sliceName of Object.keys(defaultState)) {
                if (!db.objectStoreNames.contains(sliceName)) {
                    db.createObjectStore(sliceName);
                }
            }
        };
    });
};

const saveStateToIndexedDB = async (state: RootState): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(Object.keys(state), "readwrite");
    for (const [sliceName, sliceState] of Object.entries(state)) {
        const objectStore = transaction.objectStore(sliceName);
        for (const [key, value] of Object.entries(sliceState)) {
            objectStore.put(value, key);
        }
    }
};

export const loadStateFromIndexedDB = async (): Promise<RootState | undefined> => {
    const db = await openDB();
    const transaction = db.transaction(db.objectStoreNames, "readonly");
    const state: Partial<RootState> = {};
    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(state as RootState);
        transaction.onerror = () => reject("Couldn't read from IndexedDB.");
        for (const sliceName of Array.from(db.objectStoreNames)) {
            const objectStore = transaction.objectStore(sliceName);
            const request = objectStore.openCursor();
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    const sliceKey = sliceName as keyof RootState;
                    if (!state[sliceKey]) {
                        state[sliceKey] = {} as any;
                    }
                    const stateKey = cursor.key as keyof typeof state[typeof sliceKey];
                    (state[sliceKey] as any)[stateKey] = cursor.value;
                    cursor.continue();
                }
            };
        }
    });
};

export const stateMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    const result = next(action);
    if (persistActions.map(pa => pa.type).includes(action.type)) {
        const currentState = store.getState();
        saveStateToIndexedDB(currentState).catch(console.error);
    }
    return result;
};

