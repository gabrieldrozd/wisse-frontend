import {useDispatch, useSelector} from "react-redux";
import {ActionDispatch, RootState} from "@store/store";
import {testResultSlice} from "@store/slices/education/test-result/testResultSlice";
import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import {Notify} from "@services/Notify";

export const useTestResultSlice = () => {
    const state = useSelector((state: RootState) => state.testResult);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testResultSlice.actions;
    const agent = requestAgent.education.testResult;
    const {isLoading} = useAppContext();

    const testResultActions = {
        calculateTestResult: async (testId: string) => {
            isLoading.set(true);
            try {
                const envelope = await agent.command.calculate(testId);
                if (envelope.isSuccess) {
                    Notify.success("Result", "Test result has been received");
                    await dispatch(actions.set(envelope.data));
                    return true;
                }
            } finally {
                isLoading.set(false);
            }
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