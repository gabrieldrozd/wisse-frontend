import {AxiosClient} from "@api/AxiosClient";
import {useTestTemplateApiUrls} from "@api/urls/useTestTemplateApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {ITestTemplatePost} from "@models/education/testTemplate";
import {useTestTemplateState} from "@store/slices/education/test-template/useTestTemplateState";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "test-templates";

export const useTestTemplateApi = () => {
    const queryClient = useQueryClient();
    const urls = useTestTemplateApiUrls();
    const testResultState = useTestTemplateState();
    const apiRequest = useApiRequest();

    const createTestTemplate = useMutation({
        mutationKey: [key, "createTestTemplate"],
        mutationFn: async (payload: { testTemplatePostModel: ITestTemplatePost }) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.post(urls.createTestTemplate(), {testTemplate: payload.testTemplatePostModel})
        }),
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
