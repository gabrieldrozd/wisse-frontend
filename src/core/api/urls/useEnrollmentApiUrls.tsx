export const useEnrollmentApiUrls = () => {
    const baseUrlSegment = "/enrollments-module";

    return {
        details: (id: string) => `${baseUrlSegment}/${id}`,
        browse: () => `${baseUrlSegment}/browse`,
        browseApproved: () => `${baseUrlSegment}/browse/approved`,
        browseRejected: () => `${baseUrlSegment}/browse/rejected`,
        submit: () => `${baseUrlSegment}`,
        approve: (id: string) => `${baseUrlSegment}/${id}/approve`,
        reject: (id: string) => `${baseUrlSegment}/${id}/reject`,
    };
};
