import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import type {IEnrollmentPost} from "@models/enrollment/IEnrollmentPost";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const enrollmentUrlSegment = "/enrollments-module";
const key = "enrollments";

export const useEnrollmentApi = () => {
    const queryClient = useQueryClient();

    const enrollmentDetails = (id: string) => {
        return useQuery({
            queryKey: [key, "details", id],
            queryFn: () => client.get<EnrollmentDetails>(`${enrollmentUrlSegment}/${id}`),
            select: (data: DataEnvelope<EnrollmentDetails>) => data.data,
            enabled: false
        });
    };

    const browseEnrollments = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse`, pagination),
            select: (data: DataEnvelope<IPaginatedList<EnrollmentBase>>) => data.data as IPaginatedList<EnrollmentBase>,
            enabled: true,
        });
    };

    const browseApproved = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", "approved", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/approved`, pagination),
            select: (data: DataEnvelope<IPaginatedList<EnrollmentBase>>) => data.data as IPaginatedList<EnrollmentBase>,
        });
    };

    const browseRejected = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", "rejected", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/rejected`, pagination),
            select: (data: DataEnvelope<IPaginatedList<EnrollmentBase>>) => data.data as IPaginatedList<EnrollmentBase>,
        });
    };

    // Mutations
    const submit = useMutation({
        mutationFn: (enrollmentPostModel: IEnrollmentPost) => client.post(enrollmentUrlSegment, {
            enrollment: {
                applicant: enrollmentPostModel.applicant,
                contact: enrollmentPostModel.contact,
                levelTestResult: enrollmentPostModel.testResult,
            },
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries([key, "browse"]);
        }
    });
    const approve = useMutation({
        mutationFn: (id: string) => client.put(`${enrollmentUrlSegment}/${id}/approve`, {}),
        onSuccess: async (variables) => {
            await queryClient.invalidateQueries([key, "browse"]);
            await queryClient.invalidateQueries([key, "details", variables]);
        }
    });

    const reject = useMutation({
        mutationFn: (id: string) => client.put(`${enrollmentUrlSegment}/${id}/reject`, {}),
        onSuccess: async (variables) => {
            await queryClient.invalidateQueries([key, "browse"]);
            await queryClient.invalidateQueries([key, "details", variables]);
        }
    });

    return {
        queries: {
            enrollmentDetails,
            browseEnrollments,
            browseApproved,
            browseRejected,
        },
        commands: {
            submit,
            approve,
            reject,
        }
    };
};

