import {TestResultCommands, TestResultQueries} from "@api/modules/education/testResultRequests";
import {TestTemplateCommands, TestTemplateQueries} from "@api/modules/education/testTemplateRequests";

export const requestAgent = {
    education: {
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