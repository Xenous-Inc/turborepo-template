type NullRequired<T> = {
    [P in keyof T]-?: T[P] extends infer R | null ? R : T[P];
};

export type { NullRequired };
