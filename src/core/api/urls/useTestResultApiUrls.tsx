export const useTestResultApiUrls = () => {
    const baseUrlSegment = "/education-module/test-results";

    return {
        calculateTestResult: (testId: string) => `${baseUrlSegment}/${testId}/calculate`,
    };
};
