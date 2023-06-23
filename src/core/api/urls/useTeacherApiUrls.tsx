export const useTeacherApiUrls = () => {
    const baseUrlSegment = "/users-module/teachers";

    return {
        details: (id: string) => `${baseUrlSegment}/${id}`,
        browse: () => `${baseUrlSegment}/browse`,
    };
};
