import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {StudentBase} from "@models/users/student/studentBrowse";
import type {StudentDetails} from "@models/users/student/studentDetails";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const studentUrlSegment = "/users-module/students";
const key = "students";

export const useStudentApi = () => {
    const queryClient = useQueryClient();

    const studentDetails = (id: string) => {
        return useQuery({
            queryKey: [key, "details", id],
            queryFn: () => client.get<StudentDetails>(`${studentUrlSegment}/${id}`),
            select: (data: DataEnvelope<StudentDetails>) => data.data,
            enabled: false
        });
    };

    const browseStudents = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => client.browse<StudentBase>(`${studentUrlSegment}/browse`, pagination),
            select: (data: DataEnvelope<IPaginatedList<StudentBase>>) => data.data as IPaginatedList<StudentBase>,
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
