import type {ITestResult} from "@models/education/testResult";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {useTestResultActions} from "@store/slices/education/test-result/testResultActions";
import {TestResultSelectors} from "@store/slices/education/test-result/testResultSelectors";

export interface TestResultSliceState {
    currentTestResult: ITestResult | null;
}

const initialState: TestResultSliceState = {
    currentTestResult: null
};

export const testResultSlice = createSlice({
    name: "test-result",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<ITestResult>) => {
            state.currentTestResult = action.payload;
        }
    }
});

export const useTestResultSlice = () => {
    return {
        actions: useTestResultActions(),
        selectors: new TestResultSelectors()
    };
};