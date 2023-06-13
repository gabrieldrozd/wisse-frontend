import {useDispatch, useSelector} from "react-redux";
import {ActionDispatch, RootState} from "@store/store";
import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import {testSlice} from "@store/slices/education/test/testSlice";
import {Notify} from "@services/Notify";

export const useTestState = () => {
    const state = useSelector((state: RootState) => state.test);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testSlice.actions;
    const agent = requestAgent.education.test;
    const {setLoading} = useAppContext();

    const testActions = {
        prepareLevelAssessmentTest: async () => {
            setLoading(true);
            try {
                const envelope = await agent.command.prepare();
                if (envelope.isSuccess) {
                    Notify.success("Ready", "Test is ready!");
                    await dispatch(actions.set(envelope.data));
                    return true;
                }
            } finally {
                setLoading(false);
            }
        },
        answerQuestion: async (testId: string, questionId: string, answerId: string) => {
            setLoading(true);
            try {
                const envelope = await agent.command.answer(testId, questionId, answerId);
                if (envelope.isSuccess) {
                    Notify.success("Answered", "Question answer has been set");
                    return true;
                }
            } finally {
                setLoading(false);
            }
        },
        updateQuestionAnswer: async (testId: string, questionId: string, answerId: string) => {
            setLoading(true);
            try {
                const envelope = await agent.command.changeAnswer(testId, questionId, answerId);
                if (envelope.isSuccess) {
                    Notify.success("Changed", "Question answer has been changed");
                    return true;
                }
            } finally {
                setLoading(false);
            }
        },
        completeTest: async (testId: string) => {
            setLoading(true);
            try {
                const envelope = await agent.command.complete(testId);
                if (envelope.isSuccess) {
                    Notify.success("Completed", "Test has been completed");
                    return true;
                }
            } finally {
                setLoading(false);
            }
        },
        clearTest: async (testId: string) => {
            await dispatch(actions.clearTest({testId}));
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