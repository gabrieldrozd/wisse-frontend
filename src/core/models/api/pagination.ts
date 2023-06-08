export interface IPaginationRequest {
    pageSize: number;
    pageIndex: number;
    isAscending: boolean;
}

export interface IPaginatedList<T> {
    pagination: IPaginationInfo;
    list: T[];
}

export const createPaginatedList = <T>(
    pagination: IPaginationInfo, list: T[]
): IPaginatedList<T> => {
    return {
        pagination: pagination,
        list: list
    };
};

export interface IPaginationInfo {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    count: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export const createPaginationInfo = (
    pageIndex: number,
    pageSize: number,
    totalItems: number,
    count: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
): IPaginationInfo => {
    return {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalItems: totalItems,
        count: count,
        hasPreviousPage: hasPreviousPage,
        hasNextPage: hasNextPage
    };
};

export const defaultPaginatedList = <T>(): IPaginatedList<T> => {
    return createPaginatedList(defaultPaginationInfo(), []);
};

export const defaultPaginationInfo = (): IPaginationInfo => {
    return createPaginationInfo(1, 10, 0, 0, false, false);
};
