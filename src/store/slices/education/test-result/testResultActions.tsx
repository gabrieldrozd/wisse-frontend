import {requestAgent} from "@api/requestAgent";
import {useGlobalContext} from "@context/ApplicationContext";
import {Notify} from "@services/Notify";
import {testResultSlice} from "@store/slices/education/test-result/testResultSlice";
import type {ActionDispatch} from "@store/store";
import {useDispatch} from "react-redux";

export const useTestResultActions = () => {
    const testResultRequestAgent = requestAgent.education.testResult;
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testResultSlice.actions;

    const calculateTestResult = async (testId: string) => {
        isLoading.set(true);
        try {
            const envelope = await testResultRequestAgent.command.calculate(testId);
            if (envelope.isSuccess) {
                Notify.success("Result", "Test result has been received");
                await dispatch(actions.set(envelope.data));
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    return {
        calculateTestResult
    };
};