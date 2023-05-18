export interface PaginationRequest {
    pageSize: number;
    pageIndex: number;
    isAscending: boolean;
}

export interface PaginatedList<T> {
    pagination: PaginationInfo;
    list: T[];
}

export class PaginatedList<T> implements PaginatedList<T> {
    pagination: PaginationInfo;
    list: T[];

    constructor(pagination: PaginationInfo, list: T[]) {
        this.pagination = pagination;
        this.list = list;
    }

    static default<T>(): PaginatedList<T> {
        return new PaginatedList<T>(PaginationInfo.default(), []);
    }
}

export interface PaginationInfo {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    count: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export class PaginationInfo implements PaginationInfo {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    count: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;

    constructor(pageIndex: number, pageSize: number, totalItems: number, count: number, hasPreviousPage: boolean, hasNextPage: boolean) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
        this.count = count;
        this.hasPreviousPage = hasPreviousPage;
        this.hasNextPage = hasNextPage;
    }

    static default(): PaginationInfo {
        return new PaginationInfo(1, 10, 0, 0, false, false);
    }
}