import {TestTemplateCommands, TestTemplateQueries} from "@api/modules/education/testTemplateRequests";

export const requestAgent = {
    education: {
        testTemplate: {
            query: TestTemplateQueries,
            command: TestTemplateCommands
        }
    }
};