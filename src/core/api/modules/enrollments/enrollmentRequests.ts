import {AxiosClient} from "@api/AxiosClient";
import {DataEnvelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {EnrollmentPost} from "@models/enrollment/enrollmentPost";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";

const client = AxiosClient.initialize();
const enrollmentUrlSegment = "/enrollments-module";

export const EnrollmentQueries = {
    details: (id: string): Promise<DataEnvelope<EnrollmentDetails>> => {
        return client.details<EnrollmentDetails>(`${enrollmentUrlSegment}`, id);
    },
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse`, pagination);
    },
    browseApproved: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/approved`, pagination);
    },
    browseRejected: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse/rejected`, pagination);
    }
};

export const EnrollmentCommands = {
    submit: (enrollmentPostModel: EnrollmentPost) => {
        // TODO: remember to always match object name with the API (enrollment:)
        return client.post(enrollmentUrlSegment, {enrollment: enrollmentPostModel});
    },
    approve: (id: string) => {
        return client.put(`${enrollmentUrlSegment}/${id}/approve`, {});
    },
    reject: (id: string) => {
        return client.put(`${enrollmentUrlSegment}/${id}/reject`, {});
    },
};