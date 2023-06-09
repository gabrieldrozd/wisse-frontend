import {AxiosClient} from "@api/AxiosClient";
import type {IPaginationRequest} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {IEnrollmentPost} from "@models/enrollment/IEnrollmentPost";
import {useMutation, useQuery} from "@tanstack/react-query";
import {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import {DataEnvelope} from "@models/api/dataEnvelope";

const client = AxiosClient.initialize();
const enrollmentUrlSegment = "/enrollments-module";
const key = "enrollments";

export const useEnrollmentApi = () => {
    const queries = {
        enrollmentDetails: (id: string) => {
            return useQuery({
                queryKey: [key, "details", id],
                queryFn: () => client.get<EnrollmentDetails>(`${enrollmentUrlSegment}/${id}`),
                select: (data: DataEnvelope<EnrollmentDetails>) => data.data,
                enabled: false
            });
        },
        browseEnrollments: (pagination: IPaginationRequest) => {
            return useQuery({
                queryKey: [key, "browse", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
                queryFn: () => client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse`, pagination),
            });
        },
        browseApproved: (pagination: IPaginationRequest) => {
            return useQuery({
                queryKey: [key, "browse", "approved", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
                queryFn: () => client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/approved`, pagination),
            });
        },
        browseRejected: (pagination: IPaginationRequest) => {
            return useQuery({
                queryKey: [key, "browse", "rejected", pagination.pageIndex, pagination.pageSize, pagination.isAscending],
                queryFn: () => client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/rejected`, pagination),
            });
        },
    };

    const commands = {
        submit: (enrollmentPostModel: IEnrollmentPost) => {
            return useMutation(() =>
                client.post(enrollmentUrlSegment, {
                    enrollment: {
                        applicant: enrollmentPostModel.applicant,
                        contact: enrollmentPostModel.contact,
                        levelTestResult: enrollmentPostModel.testResult,
                    },
                })
            );
        },
        approve: (id: string) => {
            return useMutation(() => client.put(`${enrollmentUrlSegment}/${id}/approve`, {}));
        },
        reject: (id: string) => {
            return useMutation(() => client.put(`${enrollmentUrlSegment}/${id}/reject`, {}));
        },
    };

    return {
        queries,
        commands,
    };
};
