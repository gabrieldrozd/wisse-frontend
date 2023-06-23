export const useQuestionApiUrls = () => {
    const baseUrlSegment = "/education-module/questions";

    return {
        browse: () => `${baseUrlSegment}/browse`,
        browseByLevel: (languageLevel: string) => `${baseUrlSegment}/browse/${languageLevel}`,
    };
};
