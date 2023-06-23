import {AxiosClient} from "@api/AxiosClient";
import {useTestApiUrls} from "@api/urls/useTestApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {ITest} from "@models/education/test";
import {useTestState} from "@store/slices/education/test/useTestState";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "tests";

export const useTestApi = () => {
    const queryClient = useQueryClient();
    const urls = useTestApiUrls();
    const testState = useTestState();
    const apiRequest = useApiRequest();

    const prepareLevelTest = useMutation({
        mutationKey: [key, "prepareLevelTest"],
        mutationFn: async () => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.post<ITest>(urls.prepareLevelTest(), {})
        }),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries([key, "prepareLevelTest"]);

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
        mutationFn: async (payload: { testId: string, questionId: string, answerId: string }) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.put(urls.answerQuestion(payload.testId), {
                testExternalId: payload.testId,
                questionExternalId: payload.questionId,
                answerExternalId: payload.answerId,
            })
        }),
        cacheTime: 0,
    });

    const updateQuestionAnswer = useMutation({
        mutationKey: [key, "updateQuestionAnswer"],
        mutationFn: async (payload: { testId: string, questionId: string, answerId: string }) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.put(urls.updateQuestionAnswer(payload.testId), {
                testExternalId: payload.testId,
                questionExternalId: payload.questionId,
                answerExternalId: payload.answerId,
            })
        }),
        cacheTime: 0,
    });

    const completeTest = useMutation({
        mutationKey: [key, "completeTest"],
        mutationFn: async (payload: { testId: string }) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.put(urls.completeTest(payload.testId), {})
        }),
        cacheTime: 0,
    });

    return {
        queries: {},
        commands: {
            prepareLevelTest,
            answerQuestion,
            updateQuestionAnswer,
            completeTest,
        }
    };
};
