import {AxiosClient} from "@api/AxiosClient";
import {useTestApiUrls} from "@api/urls/useTestApiUrls";
import {useAppContext} from "@context/ApplicationContext";
import type {ITest} from "@models/education/test";
import {useTestState} from "@store/slices/education/test/useTestState";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "tests";

export const useTestApi = () => {
    const appContext = useAppContext();
    const queryClient = useQueryClient();
    const urls = useTestApiUrls();
    const testState = useTestState();

    const prepareTest = useMutation({
        mutationKey: [key, "prepareTest"],
        mutationFn: async () => {
            try {
                appContext.setLoading(true);
                const response = await client.post<ITest>(urls.prepareTest(), {});
                appContext.setLoading(false);
                return response;
            } catch (e) {
                console.error(e);
            }
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries([key, "prepareTest"]);

            const currentTest = testState.selectors.currentTest();
            if (currentTest) {
                testState.actions.clearTest(currentTest.externalId);
            }
            if (data?.data) {
                testState.actions.setTest(data.data);
            }
        },
        cacheTime: 0,
    });

    const answerQuestion = useMutation({
        mutationKey: [key, "answerQuestion"],
        mutationFn: async (payload: { testId: string, questionId: string, answerId: string }): Promise<boolean> => {
            appContext.setLoading(true);
            const response = await client.put(urls.answerQuestion(payload.testId), {
                testExternalId: payload.testId,
                questionExternalId: payload.questionId,
                answerExternalId: payload.answerId,
            });
            appContext.setLoading(false);
            console.log("Answer question response", response);
            return response.isSuccess;
        },
        cacheTime: 0,
    });

    const updateQuestionAnswer = useMutation({
        mutationKey: [key, "updateQuestionAnswer"],
        mutationFn: async (payload: { testId: string, questionId: string, answerId: string }) => {
            appContext.setLoading(true);
            const response = await client.put(urls.updateQuestionAnswer(payload.testId), {
                testExternalId: payload.testId,
                questionExternalId: payload.questionId,
                answerExternalId: payload.answerId,
            });
            appContext.setLoading(false);
            return response.isSuccess;
        },
        cacheTime: 0,
    });

    const completeTest = useMutation({
        mutationKey: [key, "completeTest"],
        mutationFn: async (payload: { testId: string }) => {
            appContext.setLoading(true);
            const response = await client.put<any>(urls.completeTest(payload.testId), {});
            appContext.setLoading(false);
            return response.isSuccess;
        },
        cacheTime: 0,
    });

    return {
        queries: {},
        commands: {
            prepareLevelTest: prepareTest,
            answerQuestion,
            updateQuestionAnswer,
            completeTest,
        }
    };
};
