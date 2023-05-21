import {uuid} from "@utils/uuidUtils";

export interface IAnswer {
    externalId?: string;
    text: string;
    correct: boolean;
}

export interface IAnswerPost {
    externalId?: string;
    text: string;
    correct: boolean;
}

export class AnswerPost implements IAnswerPost {
    externalId?: string;
    text: string;
    correct: boolean;

    constructor() {
        this.externalId = uuid();
        this.text = "";
        this.correct = false;
    }

    public static fromAnswer(answer: IAnswer): IAnswerPost {
        let answerPost = new AnswerPost();
        answerPost.externalId = answer.externalId;
        answerPost.text = answer.text;
        answerPost.correct = answer.correct;
        return answerPost;
    }
}