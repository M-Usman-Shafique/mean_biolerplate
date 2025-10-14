export const setToStorage = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = <T = any>(key: string): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const clearStorage = (key: string): void => {
    localStorage.removeItem(key);
};
