// education-module
import {QuestionCommands, QuestionQueries} from "@api/modules/education/questionRequests";
// enrollments-module
import {TestCommands, TestQueries} from "@api/modules/education/testRequests";
import {TestResultCommands, TestResultQueries} from "@api/modules/education/testResultRequests";
import {TestTemplateCommands, TestTemplateQueries} from "@api/modules/education/testTemplateRequests";
import {EnrollmentCommands, EnrollmentQueries} from "@api/modules/enrollments/enrollmentRequests";
// users-module
import {AuthCommands, AuthQueries} from "@api/modules/users/authRequests";
import {StudentCommands, StudentQueries} from "@api/modules/users/studentRequests";
import {TeacherCommands, TeacherQueries} from "@api/modules/users/teacherRequests";

export const requestAgent = {
    education: {
        question: {
            query: QuestionQueries,
            command: QuestionCommands
        },
        test: {
            query: TestQueries,
            command: TestCommands
        },
        testResult: {
            query: TestResultQueries,
            command: TestResultCommands
        },
        testTemplate: {
            query: TestTemplateQueries,
            command: TestTemplateCommands
        }
    },
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