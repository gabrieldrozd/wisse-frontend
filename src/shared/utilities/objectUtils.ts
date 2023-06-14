export const deepCopy = <T>(obj: any) => {
    return JSON.parse(JSON.stringify(obj)) as T;
};

export const isDefined = <T>(object: T | undefined): object is T => {
    return object !== null && object !== undefined && typeof object === "object";
};