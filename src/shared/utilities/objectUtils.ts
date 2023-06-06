export const deepCopy = <T>(obj: any) => {
    return JSON.parse(JSON.stringify(obj)) as T;
}