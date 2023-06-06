import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, PaginationRequest} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/questions";

export const QuestionQueries = {
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<IPaginatedList<IQuestion>>> => {
        return client.browse<IQuestion>(`${educationUrlSegment}/browse`, pagination);
    },
    browseByLevel: (pagination: PaginationRequest, languageLevel: string): Promise<DataEnvelope<IPaginatedList<IQuestion>>> => {
        return client.browse<IQuestion>(`${educationUrlSegment}/browse/${languageLevel}`, pagination);
    },
};

export const QuestionCommands = {
    // approve: (id: string) => {
    //     return client.put(`${enrollmentUrlSegment}/${id}/approve`, {});
    // },
    // reject: (id: string) => {
    //     return client.put(`${enrollmentUrlSegment}/${id}/reject`, {});
    // },
};