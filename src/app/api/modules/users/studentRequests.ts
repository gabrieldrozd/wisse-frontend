import {AxiosClient} from "@api/AxiosClient";
import {DataEnvelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {StudentBase} from "@models/users/student/studentBrowse";
import {StudentDetails} from "@models/users/student/studentDetails";

const client = AxiosClient.initialize();
const usersUrlSegment = "/users-module/students";

export const StudentQueries = {
    details: (id: string): Promise<DataEnvelope<StudentDetails>> => {
        return client.details<StudentDetails>(`${usersUrlSegment}`, id);
    },
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<StudentBase>>> => {
        return client.browse<StudentBase>(`${usersUrlSegment}/browse`, pagination);
    },
};

export const StudentCommands = {};