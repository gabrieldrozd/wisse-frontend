export const useTestTemplateApiUrls = () => {
    const baseUrlSegment = "/education-module/test-templates";

    return {
        createTestTemplate: () => `${baseUrlSegment}`,
    };
};
