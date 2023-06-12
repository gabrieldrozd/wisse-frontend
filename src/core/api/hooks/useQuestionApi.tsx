import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const questionUrlSegment = "/education-module/questions";
const key = "questions";

export const useQuestionApi = () => {
    const queryClient = useQueryClient();

    const browseQuestions = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => client.browse<IQuestion>(`${questionUrlSegment}/browse`, pagination),
            select: (data: DataEnvelope<IPaginatedList<IQuestion>>) => data.data as IPaginatedList<IQuestion>,
            enabled: true,
        });
    };

    const browseQuestionsByLevel = (languageLevel: string) => {
        return useQuery({
            queryKey: [key, "browse-by-level", languageLevel],
            queryFn: () => client.browse<IQuestion>(`${questionUrlSegment}/browse/${languageLevel}`, {
                pageIndex: 1,
                pageSize: 100,
                isAscending: true
            } as IPaginationRequest),
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
