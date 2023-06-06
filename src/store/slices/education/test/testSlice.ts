import type {ITest} from "@models/education/test";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {useTestActions} from "@store/slices/education/test/testActions";
import {TestSelectors} from "@store/slices/education/test/testSelectors";

export interface TestSliceState {
    currentTest: ITest | null;
}

const initialState: TestSliceState = {
    currentTest: {} as ITest
};

export const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<ITest>) => {
            state.currentTest = action.payload;
        },
        clearTest: (state, action: PayloadAction<{testId: string}>) => {
            if (state.currentTest?.externalId === action.payload.testId) {
                state.currentTest = null;
            }
        }
    }
});

export const useTestSlice = () => {
    return {
        actions: useTestActions(),
        selectors: new TestSelectors()
    };
};