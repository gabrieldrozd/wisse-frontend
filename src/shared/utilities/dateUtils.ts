export const getShortDate = (longDate: Date): string => {
    const date = new Date(longDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getFullYears = (longDate: Date): number => {
    const date = new Date(longDate);
    const today = new Date();
    return today.getFullYear() - date.getFullYear();
}