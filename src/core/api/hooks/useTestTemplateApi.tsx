import {AxiosClient} from "@api/AxiosClient";
import {useAppContext} from "@context/ApplicationContext";
import type {ITestTemplatePost} from "@models/education/testTemplate";
import {useTestTemplateState} from "@store/slices/education/test-template/useTestTemplateState";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const testTemplateUrlSegment = "/education-module/test-templates";
const key = "test-templates";

export const useTestTemplateApi = () => {
    const appContext = useAppContext();
    const queryClient = useQueryClient();
    const testResultState = useTestTemplateState();

    const createTestTemplate = useMutation({
        mutationKey: [key, "createTestTemplate"],
        mutationFn: async (payload: { testTemplatePostModel: ITestTemplatePost }) => {
            try {
                appContext.setLoading(true);
                const response = await client.post(testTemplateUrlSegment, {testTemplate: payload.testTemplatePostModel});
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
            await queryClient.invalidateQueries([key, "createTestTemplate"]);
            await queryClient.invalidateQueries([key, "browse"]);

            return data?.isSuccess;
        },
        cacheTime: 0,
    });

    return {
        queries: {},
        commands: {
            createTestTemplate,
        },
    };
};
