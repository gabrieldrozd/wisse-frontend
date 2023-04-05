// enrollments-module
import {EnrollmentCommands, EnrollmentQueries} from "@api/modules/enrollments/enrollmentRequests";

// users-module
import {AuthCommands, AuthQueries} from "@api/modules/users/authRequests";
import {StudentCommands, StudentQueries} from "@api/modules/users/studentRequests";
import {TeacherCommands, TeacherQueries} from "@api/modules/users/teacherRequests";

export const requestAgent = {
    enrollment: {
        enrollment: {
            query: EnrollmentQueries,
            command: EnrollmentCommands
        },
    },
    users: {
        auth: {
            query: AuthQueries,
            command: AuthCommands
        },
        student: {
            query: StudentQueries,
            command: StudentCommands
        },
        teacher: {
            query: TeacherQueries,
            command: TeacherCommands
        }
    },
};