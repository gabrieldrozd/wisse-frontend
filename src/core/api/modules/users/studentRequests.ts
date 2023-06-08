import {AxiosClient} from "@api/AxiosClient";
import {DataEnvelope} from "@models/api/dataEnvelope";
import {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import {StudentBase} from "@models/users/student/studentBrowse";
import {StudentDetails} from "@models/users/student/studentDetails";

const client = AxiosClient.initialize();
const usersUrlSegment = "/users-module/students";

export const StudentQueries = {
    details: (id: string): Promise<DataEnvelope<StudentDetails>> => {
        return client.details<StudentDetails>(`${usersUrlSegment}`, id);
    },
    browse: (pagination: IPaginationRequest): Promise<DataEnvelope<IPaginatedList<StudentBase>>> => {
        return client.browse<StudentBase>(`${usersUrlSegment}/browse`, pagination);
    },
};

export const StudentCommands = {};