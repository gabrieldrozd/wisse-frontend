import {AxiosClient} from "@api/AxiosClient";
import type {ITestTemplatePost} from "@models/education/testTemplate";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/test-templates";

export const TestTemplateQueries = {
};

export const TestTemplateCommands = {
    create: (testTemplatePostModel: ITestTemplatePost) => {
        return client.post(educationUrlSegment, {testTemplate: testTemplatePostModel});
    },
};