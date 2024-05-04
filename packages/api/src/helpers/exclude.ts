export const exclude = <T extends object, Key extends keyof T>(model: T, keys: Key[]) => {
    return Object.fromEntries(Object.entries(model).filter(([key]) => !keys.includes(key as Key))) as Omit<T, Key>;
};
