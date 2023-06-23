import {AxiosClient} from "@api/AxiosClient";
import {useTestResultApiUrls} from "@api/urls/useTestResultApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {ITestResult} from "@models/education/testResult";
import {useTestResultState} from "@store/slices/education/test-result/useTestResultState";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "tests";

export const useTestResultApi = () => {
    const queryClient = useQueryClient();
    const urls = useTestResultApiUrls();
    const testResultState = useTestResultState();
    const apiRequest = useApiRequest();

    const calculateTestResult = useMutation({
        mutationKey: [key, "calculateTestResult"],
        mutationFn: async (payload: { testId: string }) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.post<ITestResult>(urls.calculateTestResult(payload.testId), {})
        }),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries([key, "calculateTestResult"]);

            const currentTestResult = testResultState.selectors.currentTestResult();
            if (currentTestResult) {
                testResultState.actions.clearTestResult(currentTestResult.testExternalId);
            }
            if (data?.data) {
                testResultState.actions.setTestResult(data.data);
            }
        },
        cacheTime: 0,
    });

    return {
        queries: {},
        commands: {
            calculateTestResult,
        },
    };
};
