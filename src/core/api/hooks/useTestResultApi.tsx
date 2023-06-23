import {AxiosClient} from "@api/AxiosClient";
import {useTestResultApiUrls} from "@api/urls/useTestResultApiUrls";
import {useAppContext} from "@context/ApplicationContext";
import type {ITestResult} from "@models/education/testResult";
import {useTestResultState} from "@store/slices/education/test-result/useTestResultState";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "tests";

export const useTestResultApi = () => {
    const appContext = useAppContext();
    const queryClient = useQueryClient();
    const urls = useTestResultApiUrls();
    const testResultState = useTestResultState();

    const calculateTestResult = useMutation({
        mutationKey: [key, "calculateTestResult"],
        mutationFn: async (payload: { testId: string }) => {
            try {
                appContext.setLoading(true);
                const response = await client.post<ITestResult>(urls.calculateTestResult(payload.testId), {});
                appContext.setLoading(false);
                return response;
            } catch (err) {
                console.error(err);
                appContext.setLoading(false);
            } finally {
                appContext.setLoading(false);
            }
        },
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
