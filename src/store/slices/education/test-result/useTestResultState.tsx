import type {ITestResult} from "@models/education/testResult";
import {testResultSlice} from "@store/slices/education/test-result/testResultSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useTestResultState = () => {
    const state = useSelector((state: RootState) => state.testResult);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testResultSlice.actions;

    const testResultActions = {
        setTestResult: (testResult: ITestResult) => {
            dispatch(actions.set(testResult));
        },
        clearTestResult: (testId: string) => {
            dispatch(actions.clear({testId}));
        }
    };

    const testResultSelectors = {
        currentTestResult: () => state.currentTestResult
    };

    return {
        actions: testResultActions,
        selectors: testResultSelectors
    };
};