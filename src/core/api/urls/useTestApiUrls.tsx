export const useTestApiUrls = () => {
    const baseUrlSegment = "/education-module/tests";

    return {
        prepareLevelTest: () => `${baseUrlSegment}`,
        answerQuestion: (testId: string) => `${baseUrlSegment}/${testId}/answer`,
        updateQuestionAnswer: (testId: string) => `${baseUrlSegment}/${testId}/change-answer`,
        completeTest: (testId: string) => `${baseUrlSegment}/${testId}/complete`,
    };
};
