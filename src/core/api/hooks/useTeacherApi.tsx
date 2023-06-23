import {AxiosClient} from "@api/AxiosClient";
import {useTeacherApiUrls} from "@api/urls/useTeacherApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {TeacherBase} from "@models/users/teacher/teacherBrowse";
import type {TeacherDetails} from "@models/users/teacher/teacherDetails";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "teachers";

export const useTeacherApi = () => {
    const queryClient = useQueryClient();
    const urls = useTeacherApiUrls();
    const apiRequest = useApiRequest();

    const teacherDetails = (id: string) => {
        return useQuery({
            queryKey: [key, "details", id],
            queryFn: () => apiRequest.execute({
                withLoading: false,
                requestFn: () => client.get<TeacherDetails>(urls.details(id))
            }),
            select: (data: DataEnvelope<TeacherDetails>) => data.data,
            enabled: false
        });
    };

    const browseTeachers = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<TeacherBase>(urls.browse(), pagination)
            }),
            select: (data: DataEnvelope<IPaginatedList<TeacherBase>>) => data.data as IPaginatedList<TeacherBase>,
            enabled: true,
        });
    };

    return {
        queries: {
            teacherDetails,
            browseTeachers
        },
        commands: {}
    };
};
