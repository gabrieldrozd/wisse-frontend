import {RootState} from "@store/store";
import {AnyAction, Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {persistActions} from "@store/persistActions";

const localStorageKey = "appState";
const saveStateToLocalStorage = (state: RootState): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageKey, serializedState);
    } catch (error) {
        console.error(error);
    }
};

export const loadStateFromLocalStorage = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem(localStorageKey);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as RootState;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const stateMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    const result = next(action);
    if (persistActions.map(pa => pa.type).includes(action.type)) {
        const currentState = store.getState();
        saveStateToLocalStorage(currentState);
    }
    return result;
};