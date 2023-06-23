export const useAuthApiUrls = () => {
    const baseUrlSegment = "users-module/auth";

    return {
        refresh: () => `${baseUrlSegment}`,
        login: () => `${baseUrlSegment}`,
    };
};
