export interface ITestResult {
    testExternalId: string;
    calculatedLevel: string;
    correctAnswers: number;
    incorrectAnswers: number;
    totalAnswers: number;
    percentage: number;
}