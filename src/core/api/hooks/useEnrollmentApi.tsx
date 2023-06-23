import {AxiosClient} from "@api/AxiosClient";
import {useEnrollmentApiUrls} from "@api/urls/useEnrollmentApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {IEnrollmentDetails} from "@models/enrollment/IEnrollmentDetails";
import type {IEnrollmentPost} from "@models/enrollment/IEnrollmentPost";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "enrollments";

export const useEnrollmentApi = () => {
    const queryClient = useQueryClient();
    const urls = useEnrollmentApiUrls();
    const apiRequest = useApiRequest();

    const enrollmentDetails = (id: string) => {
        return useQuery({
            queryKey: [key, "details", id],
            queryFn: () => apiRequest.execute({
                withLoading: false,
                requestFn: () => client.get<IEnrollmentDetails>(urls.details(id))
            }),
            select: (data: DataEnvelope<IEnrollmentDetails>) => data.data,
            enabled: false
        });
    };

    const browseEnrollments = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<EnrollmentBase>(urls.browse(), pagination)
            }),
            select: (data) => data.data as IPaginatedList<EnrollmentBase>,
            enabled: true,
        });
    };

    const browseApproved = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", "approved", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<EnrollmentBase>(urls.browseApproved(), pagination)
            }),
            select: (data: DataEnvelope<IPaginatedList<EnrollmentBase>>) => data.data as IPaginatedList<EnrollmentBase>,
        });
    };

    const browseRejected = (pagination: IPaginationRequest) => {
        return useQuery({
            queryKey: [key, "browse", "rejected", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
            queryFn: () => apiRequest.execute({
                withLoading: true,
                requestFn: () => client.browse<EnrollmentBase>(urls.browseRejected(), pagination)
            }),
            select: (data: DataEnvelope<IPaginatedList<EnrollmentBase>>) => data.data as IPaginatedList<EnrollmentBase>,
        });
    };

    // Mutations
    const submit = useMutation({
        mutationFn: (enrollmentPostModel: IEnrollmentPost) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.post(urls.submit(), {
                enrollment: {
                    applicant: enrollmentPostModel.applicant,
                    contact: enrollmentPostModel.contact,
                    levelTestResult: enrollmentPostModel.testResult,
                }
            })
        }),
        onSuccess: async () => await queryClient.invalidateQueries([key, "browse"])
    });
    const approve = useMutation({
        mutationFn: (id: string) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.put(urls.approve(id), {})
        }),
        onSuccess: async (variables) => {
            await queryClient.invalidateQueries([key, "browse"]);
            await queryClient.invalidateQueries([key, "details", variables]);
        }
    });

    const reject = useMutation({
        mutationFn: (id: string) => apiRequest.execute({
            withLoading: true,
            requestFn: () => client.put(urls.reject(id), {})
        }),
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

