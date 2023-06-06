import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {ITestResult} from "@models/education/testResult";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/test-results";

export const TestResultQueries = {
};

export const TestResultCommands = {
    calculate: (testId: string): Promise<DataEnvelope<ITestResult>> => {
        return client.post<ITestResult>(`${educationUrlSegment}/${testId}/calculate`, {});
    }
};