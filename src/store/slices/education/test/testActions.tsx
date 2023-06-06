import {requestAgent} from "@api/requestAgent";
import {useGlobalContext} from "@context/ApplicationContext";
import {Notify} from "@services/Notify";
import {testSlice} from "@store/slices/education/test/testSlice";
import type {ActionDispatch} from "@store/store";
import {useDispatch} from "react-redux";

export const useTestActions = () => {
    const testRequestAgent = requestAgent.education.test;
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testSlice.actions;

    const prepareLevelAssessmentTest = async () => {
        isLoading.set(true);
        try {
            const envelope = await testRequestAgent.command.prepare();
            if (envelope.isSuccess) {
                Notify.success("Ready", "Test is ready!");
                await dispatch(actions.set(envelope.data));
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    const answerQuestion = async (testId: string, questionId: string, answerId: string) => {
        isLoading.set(true);
        try {
            const envelope = await testRequestAgent.command.answer(testId, questionId, answerId);
            if (envelope.isSuccess) {
                Notify.success("Answered", "Question answer has been set");
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    const updateQuestionAnswer = async (testId: string, questionId: string, answerId: string) => {
        isLoading.set(true);
        try {
            const envelope = await testRequestAgent.command.changeAnswer(testId, questionId, answerId);
            if (envelope.isSuccess) {
                Notify.success("Changed", "Question answer has been changed");
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    const completeTest = async (testId: string) => {
        isLoading.set(true);
        try {
            const envelope = await testRequestAgent.command.complete(testId);
            if (envelope.isSuccess) {
                Notify.success("Completed", "Test has been completed");
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    const clearTest = async (testId: string) => {
        await dispatch(actions.clearTest({testId}));
    };

    return {
        prepareLevelAssessmentTest,
        answerQuestion,
        updateQuestionAnswer,
        completeTest,
        clearTest
    };
};