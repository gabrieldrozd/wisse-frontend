import {AxiosClient} from "@api/AxiosClient";
import {useTeacherApiUrls} from "@api/urls/useTeacherApiUrls";
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

    const teacherDetails = (id: string) => {
        return useQuery({
            queryKey: [key, "details", id],
            queryFn: () => client.get<TeacherDetails>(urls.details(id)),
            select: (data: DataEnvelope<TeacherDetails>) => data.data,
            enabled: false
        });
    };

    const browseTeachers = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => client.browse<TeacherBase>(urls.browse(), pagination),
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
