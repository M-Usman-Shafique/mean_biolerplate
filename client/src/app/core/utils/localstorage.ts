export const setData = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getData = <T = any>(key: string): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const clearData = (key: string): void => {
    localStorage.removeItem(key);
};
