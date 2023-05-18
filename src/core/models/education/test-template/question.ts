import {uuid} from "@utils/uuidUtils";
import {AnswerPost, IAnswer, IAnswerPost} from "@models/education/test-template/answer";

export interface IQuestion {
    id?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswer[];
}

export interface IQuestionPost {
    id?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswerPost[];
}

export class QuestionPost implements IQuestionPost {
    id?: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: IAnswerPost[];

    constructor() {
        this.id = uuid();
        this.text = "";
        this.languageLevel = "";
        this.category = "";
        this.answers = [];
    }

    public static initialize(): IQuestionPost {
        let question = new QuestionPost();
        for (let i = 0; i < 4; i++) {
            question.answers.push(new AnswerPost());
        }

        question.answers[0].correct = true;
        return question;
    }
}