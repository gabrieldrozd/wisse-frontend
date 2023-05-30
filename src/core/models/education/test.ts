import type {ITestQuestion} from "@models/education/question";

export interface ITest {
    externalId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    testQuestions: ITestQuestion[];
}