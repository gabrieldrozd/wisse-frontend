import {AxiosClient} from "@api/AxiosClient";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {ITest} from "@models/education/test";
import {ITestResult} from "@models/education/testResult";

const client = AxiosClient.initialize();
const educationUrlSegment = "/education-module/tests";

export const TestQueries = {
};

export const TestCommands = {
    prepare: (): Promise<DataEnvelope<ITest>> => {
        return client.post<ITest>(educationUrlSegment, {});
    },

    answer: (testId: string, questionId: string, answerId: string): Promise<DataEnvelope<any>> => {
        return client.put<any>(`${educationUrlSegment}/${testId}/answer`, {
            testExternalId: testId,
            questionExternalId: questionId,
            answerExternalId: answerId,
        });
    },

    changeAnswer: (testId: string, questionId: string, answerId: string): Promise<DataEnvelope<any>> => {
        return client.put<any>(`${educationUrlSegment}/${testId}/change-answer`, {
            testExternalId: testId,
            questionExternalId: questionId,
            answerExternalId: answerId,
        });
    },

    complete: (testId: string): Promise<DataEnvelope<any>> => {
        return client.put<any>(`${educationUrlSegment}/${testId}/complete`, {});
    },

    calculateResult: (testId: string): Promise<DataEnvelope<ITestResult>> => {
        return client.post<ITestResult>(`${educationUrlSegment}/${testId}/calculate-result`, {});
    }
};