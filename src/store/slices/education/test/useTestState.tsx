import type {ITest} from "@models/education/test";
import {testSlice} from "@store/slices/education/test/testSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useTestState = () => {
    const state = useSelector((state: RootState) => state.test);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testSlice.actions;

    const testActions = {
        setTest: (test: ITest) => {
            dispatch(actions.set(test));
        },
        clearTest: (testId: string) => {
            dispatch(actions.clear({testId}));
        }
    };

    const testSelectors = {
        currentTest: () => state.currentTest,
    };

    return {
        actions: testActions,
        selectors: testSelectors
    };
};