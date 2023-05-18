import {AxiosClient} from "@api/AxiosClient";
import {DataEnvelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {IQuestion} from "@models/education/test-template/question";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/questions";

export const QuestionQueries = {
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<IQuestion>>> => {
        return client.browse<IQuestion>(`${educationUrlSegment}/browse`, pagination);
    },
    browseByLevel: (pagination: PaginationRequest, languageLevel: string): Promise<DataEnvelope<PaginatedList<IQuestion>>> => {
        return client.browse<IQuestion>(`${educationUrlSegment}/browse/${languageLevel}`, pagination);
    },
};

export const QuestionCommands = {
    // submit: (enrollmentPostModel: EnrollmentPost) => {
    //     // TODO: remember to always match object name with the API (enrollment:)
    //     return client.post(enrollmentUrlSegment, {enrollment: enrollmentPostModel});
    // },
    // approve: (id: string) => {
    //     return client.put(`${enrollmentUrlSegment}/${id}/approve`, {});
    // },
    // reject: (id: string) => {
    //     return client.put(`${enrollmentUrlSegment}/${id}/reject`, {});
    // },
};