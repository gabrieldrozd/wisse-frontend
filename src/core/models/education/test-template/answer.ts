import {uuid} from "@utils/uuidUtils";

export interface IAnswer {
    id?: string;
    text: string;
    correct: boolean;
}

export interface IAnswerPost {
    id?: string;
    text: string;
    correct: boolean;
}

export class AnswerPost implements IAnswerPost {
    id?: string;
    text: string;
    correct: boolean;

    constructor() {
        this.id = uuid();
        this.text = "";
        this.correct = false;
    }
}