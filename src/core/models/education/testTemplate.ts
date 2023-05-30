import {uuid} from "@utils/uuidUtils";
import {IQuestionPost, IQuestionPostFormModel, QuestionPost} from "@models/education/question";

/**
 * [FORM] ITestTemplateFormModel interface
 */
export interface ITestTemplatePostFormModel {
    externalId?: string;
    name: string;
    description: string;
    languageLevel: string;
    questions: IQuestionPostFormModel[];
}

/**
 * [POST] ITestTemplatePost interface
 */
export interface ITestTemplatePost {
    externalId?: string;
    name: string;
    description: string;
    languageLevel: string;
    questionIds: string[];
    questions: IQuestionPost[];
}

/**
 * [POST] TestTemplatePost : ITestTemplatePost
 */
export class TestTemplatePost implements ITestTemplatePost {
    externalId?: string;
    name: string;
    description: string;
    languageLevel: string;
    questionIds: string[];
    questions: IQuestionPost[];

    constructor() {
        this.externalId = uuid();
        this.name = "";
        this.description = "";
        this.languageLevel = "";
        this.questionIds = [];
        this.questions = [];
    }

    public static fromFormModel(formModel: ITestTemplatePostFormModel): ITestTemplatePost {

        const testTemplatePost = new TestTemplatePost();
        testTemplatePost.externalId = formModel.externalId;
        testTemplatePost.name = formModel.name;
        testTemplatePost.description = formModel.description;
        testTemplatePost.languageLevel = formModel.languageLevel;

        testTemplatePost.questionIds = formModel.questions
            .filter((question) => question.existing)
            .map((question) => question.externalId!);

        testTemplatePost.questions = formModel.questions
            .filter((question) => !question.existing)
            .map((question) => QuestionPost.fromFormModel(question));

        return testTemplatePost;
    }
}