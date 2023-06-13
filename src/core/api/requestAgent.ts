import {TestCommands, TestQueries} from "@api/modules/education/testRequests";
import {TestResultCommands, TestResultQueries} from "@api/modules/education/testResultRequests";
import {TestTemplateCommands, TestTemplateQueries} from "@api/modules/education/testTemplateRequests";

export const requestAgent = {
    education: {
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
    }
};