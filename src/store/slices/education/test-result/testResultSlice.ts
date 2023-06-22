import type {ITestResult} from "@models/education/testResult";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

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
        },
        clear: (state, action: PayloadAction<{testId: string}>) => {
            if (state.currentTestResult?.testExternalId === action.payload.testId) {
                state.currentTestResult = null;
            }
        }
    }
});
