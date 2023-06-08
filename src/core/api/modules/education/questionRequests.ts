import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/questions";

export const QuestionQueries = {
    browse: (pagination: IPaginationRequest): Promise<DataEnvelope<IPaginatedList<IQuestion>>> => {
        return client.browse<IQuestion>(`${educationUrlSegment}/browse`, pagination);
    },
    browseByLevel: (pagination: IPaginationRequest, languageLevel: string): Promise<DataEnvelope<IPaginatedList<IQuestion>>> => {
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