export const useStudentApiUrls = () => {
    const baseUrlSegment = "/users-module/students";

    return {
        details: (id: string) => `${baseUrlSegment}/${id}`,
        browse: () => `${baseUrlSegment}/browse`,
    };
};
