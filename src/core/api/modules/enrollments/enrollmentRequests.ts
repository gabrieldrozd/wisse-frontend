import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, PaginationRequest} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import type {IEnrollmentPost} from "@models/enrollment/IEnrollmentPost";

const client = AxiosClient.initialize();
const enrollmentUrlSegment = "/enrollments-module";

export const EnrollmentQueries = {
    details: (id: string): Promise<DataEnvelope<EnrollmentDetails>> => {
        return client.details<EnrollmentDetails>(`${enrollmentUrlSegment}`, id);
    },
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<IPaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse`, pagination);
    },
    browseApproved: (pagination: PaginationRequest): Promise<DataEnvelope<IPaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/approved`, pagination);
    },
    browseRejected: (pagination: PaginationRequest): Promise<DataEnvelope<IPaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/rejected`, pagination);
    }
};

export const EnrollmentCommands = {
    submit: (enrollmentPostModel: IEnrollmentPost) => {
        // TODO: remember to always match object name with the API (enrollment:)
        return client.post(enrollmentUrlSegment, {
            enrollment: {
                applicant: enrollmentPostModel.applicant,
                contact: enrollmentPostModel.contact,
                levelTestResult: enrollmentPostModel.testResult,
            }
        });
    },
    approve: (id: string) => {
        return client.put(`${enrollmentUrlSegment}/${id}/approve`, {});
    },
    reject: (id: string) => {
        return client.put(`${enrollmentUrlSegment}/${id}/reject`, {});
    },
};