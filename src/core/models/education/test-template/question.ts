import {uuid} from "@utils/uuidUtils";
import {AnswerPost, IAnswer, IAnswerPost} from "@models/education/test-template/answer";

/**
 * [QUERY] IQuestion interface
 */
export interface IQuestion {
    externalId?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswer[];
}

/**
 * [FORM] IQuestionFormModel interface
 */
export interface IQuestionPostFormModel {
    externalId?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswerPost[];
    existing?: boolean;
}

export class QuestionPostFormModel implements IQuestionPostFormModel {
    externalId?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswerPost[];
    existing?: boolean;

    constructor() {
        this.externalId = uuid();
        this.text = "";
        this.languageLevel = "";
        this.category = "";
        this.answers = [];
        this.existing = false;
    }

    public static initialize(): IQuestionPostFormModel {
        let questionFormModel = new QuestionPostFormModel();
        for (let i = 0; i < 4; i++) {
            questionFormModel.answers.push(new AnswerPost());
        }

        questionFormModel.answers[0].correct = true;
        return questionFormModel;
    }

    public static fromQuestion(question: IQuestion): IQuestionPostFormModel {
        let questionFormModel = new QuestionPostFormModel();
        questionFormModel.externalId = question.externalId;
        questionFormModel.text = question.text;
        questionFormModel.languageLevel = question.languageLevel;
        questionFormModel.category = question.category;
        questionFormModel.answers = question.answers.map((answer) => AnswerPost.fromAnswer(answer));
        questionFormModel.existing = true;
        return questionFormModel;
    }
}

/**
 * [POST] IQuestionPost interface
 */
export interface IQuestionPost {
    externalId?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswerPost[];
}

/**
 * [POST] QuestionPost : IQuestionPost
 */
export class QuestionPost implements IQuestionPost {
    externalId?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswerPost[];

    constructor() {
        this.externalId = uuid();
        this.text = "";
        this.languageLevel = "";
        this.category = "";
        this.answers = [];
    }

    public static fromFormModel(formModel: IQuestionPostFormModel): IQuestionPost {
        let question = new QuestionPost();
        question.externalId = formModel.externalId;
        question.text = formModel.text;
        question.languageLevel = formModel.languageLevel;
        question.category = formModel.category;
        question.answers = formModel.answers;
        return question;
    }
}