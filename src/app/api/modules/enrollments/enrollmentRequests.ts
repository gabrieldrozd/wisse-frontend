import {EnrollmentPost} from "@models/enrollment/enrollmentPost";
import {AxiosClient} from "@api/AxiosClient";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {DataEnvelope} from "@models/api/dataEnvelope";

const client = AxiosClient.initialize();
const enrollmentUrlSegment = "/enrollments-module";

export const EnrollmentQueries = {
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<EnrollmentBase>>> => {
        return client.browse<EnrollmentBase>(`${enrollmentUrlSegment}/browse`, pagination);
    }
};

export const EnrollmentCommands = {
    submit: (enrollmentPostModel: EnrollmentPost) => {
        // TODO: remember to always match object name with the API (enrollment:)
        return client.post(enrollmentUrlSegment, {enrollment: enrollmentPostModel});
    }
};