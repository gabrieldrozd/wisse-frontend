import {AxiosClient} from "@api/AxiosClient";
import {DataEnvelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {IQuestion} from "@models/education/test-template/question";
import {ITestTemplatePost} from "@models/education/test-template/testTemplate";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/test-templates";

export const TestTemplateQueries = {
};

export const TestTemplateCommands = {
    create: (testTemplatePostModel: ITestTemplatePost) => {
        return client.post(educationUrlSegment, {testTemplate: testTemplatePostModel});
    },
};