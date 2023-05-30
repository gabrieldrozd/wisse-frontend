import type {ITestAnswer} from "@models/education/answer";
import type {ITestQuestion} from "@models/education/question";
import type {ITest} from "@models/education/test";

export class TestModel {
    externalId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    testQuestions: TestQuestionModel[];
    isCompleted = false;

    constructor(
        externalId: string,
        name: string,
        description: string,
        startTime: string,
        endTime: string,
        testQuestions?: TestQuestionModel[]
    ) {
        this.externalId = externalId;
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.testQuestions = testQuestions ?? [];
    }

    static fromTest(test: ITest): TestModel {
        const testModel = new TestModel(
            test.externalId,
            test.name,
            test.description,
            test.startTime,
            test.endTime,
        );

        testModel.testQuestions = test.testQuestions.map(
            (testQuestion: ITestQuestion) => TestQuestionModel.fromTestQuestion(testQuestion)
        );

        return testModel;
    }
}

export class TestQuestionModel {
    externalId: string;
    text: string;
    languageLevel: string;
    category: string;
    answers: TestAnswerModel[];
    isAnswered = false;
    visited = false;

    constructor(
        externalId: string,
        text: string,
        languageLevel: string,
        category: string,
        answers?: TestAnswerModel[],
    ) {
        this.externalId = externalId;
        this.text = text;
        this.languageLevel = languageLevel;
        this.category = category;
        this.answers = answers ?? [];
    }

    static fromTestQuestion(testQuestion: ITestQuestion): TestQuestionModel {
        const testQuestionModel = new TestQuestionModel(
            testQuestion.externalId,
            testQuestion.text,
            testQuestion.languageLevel,
            testQuestion.category,
        );

        testQuestionModel.answers = testQuestion.answers.map(
            (testAnswer: ITestAnswer) => TestAnswerModel.fromTestAnswer(testAnswer)
        );

        return testQuestionModel;
    }
}

export class TestAnswerModel {
    externalId: string;
    text: string;
    isSelected = false;

    constructor(
        externalId: string,
        text: string,
    ) {
        this.externalId = externalId;
        this.text = text;
    }

    static fromTestAnswer(testAnswer: ITestAnswer): TestAnswerModel {
        return new TestAnswerModel(
            testAnswer.externalId,
            testAnswer.text,
        );
    }
}