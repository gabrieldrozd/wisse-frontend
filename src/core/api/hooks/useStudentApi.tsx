import {AxiosClient} from "@api/AxiosClient";
import {useStudentApiUrls} from "@api/urls/useStudentApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {IStudentDetails} from "@models/users/student/IStudentDetails";
import type {IStudentBase} from "@models/users/student/studentBrowse";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "students";

export const useStudentApi = () => {
    const queryClient = useQueryClient();
    const urls = useStudentApiUrls();
    const apiRequest = useApiRequest();

    const studentDetails = (id: string) => {
        return useQuery({
            queryKey: [key, "details", id],
            queryFn: () => apiRequest.execute({
                withLoading: false,
                requestFn: () => client.get<IStudentDetails>(urls.details(id))
            }),
            select: (data: DataEnvelope<IStudentDetails>) => data.data,
            enabled: false
        });
    };

    const browseStudents = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<IStudentBase>(urls.browse(), pagination)
            }),
            select: (data: DataEnvelope<IPaginatedList<IStudentBase>>) => data.data as IPaginatedList<IStudentBase>,
            enabled: true,
        });
    };

    return {
        queries: {
            studentDetails,
            browseStudents
        },
        commands: {}
    };
};
