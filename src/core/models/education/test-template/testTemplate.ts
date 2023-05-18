import {uuid} from "@utils/uuidUtils"
import {IQuestionPost} from "@models/education/test-template/question";

export interface ITestTemplatePost {
    id?: string;
    name: string;
    description: string;
    languageLevel: string;
    questionIds: string[];
    questions: IQuestionPost[];
}

export class TestTemplatePost implements ITestTemplatePost {
    id?: string;
    name: string;
    description: string;
    languageLevel: string;
    questionIds: string[];
    questions: IQuestionPost[];

    constructor() {
        this.id = uuid();
        this.name = "";
        this.description = "";
        this.languageLevel = "";
        this.questionIds = [];
        this.questions = [];
    }
}