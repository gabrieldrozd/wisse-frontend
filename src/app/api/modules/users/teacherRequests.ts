import {DataEnvelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {AxiosClient} from "@api/AxiosClient";
import {TeacherBase} from "@models/users/teacher/teacherBrowse";
import {TeacherDetails} from "@models/users/teacher/teacherDetails";

const client = AxiosClient.initialize();
const usersUrlSegment = "/users-module/teachers";

export const TeacherQueries = {
    details: (id: string): Promise<DataEnvelope<TeacherDetails>> => {
        return client.details<TeacherDetails>(`${usersUrlSegment}`, id);
    },
    browse: (pagination: PaginationRequest): Promise<DataEnvelope<PaginatedList<TeacherBase>>> => {
        return client.browse<TeacherBase>(`${usersUrlSegment}/browse`, pagination);
    },
};

export const TeacherCommands = {};