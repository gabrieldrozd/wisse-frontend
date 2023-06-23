import {AxiosClient} from "@api/AxiosClient";
import {useQuestionApiUrls} from "@api/urls/useQuestionApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "questions";

export const useQuestionApi = () => {
    const queryClient = useQueryClient();
    const urls = useQuestionApiUrls();
    const apiRequest = useApiRequest();

    const browseQuestions = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<IQuestion>(urls.browse(), pagination)
            }),
            select: (data: DataEnvelope<IPaginatedList<IQuestion>>) => data.data as IPaginatedList<IQuestion>,
            enabled: true,
        });
    };

    const browseQuestionsByLevel = (languageLevel: string) => {
        return useQuery({
            queryKey: [key, "browse-by-level", languageLevel],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<IQuestion>(urls.browseByLevel(languageLevel), {
                    pageIndex: 1,
                    pageSize: 100,
                    isAscending: true
                } as IPaginationRequest)
            }),
            select: (data: DataEnvelope<IPaginatedList<IQuestion>>) => data.data as IPaginatedList<IQuestion>,
            enabled: true,
        });
    };

    return {
        queries: {
            browseQuestions,
            browseQuestionsByLevel
        },
        commands: {}
    };
};
