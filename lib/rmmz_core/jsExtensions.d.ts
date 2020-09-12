declare interface Array<T> {
    clone(): T[]; 
    equals(array: unknown[]): boolean;
    remove(element: T): T[];
}

declare interface Math {
    randomInt(max: number): number;
}

declare interface Number {
    clamp(min: number, max: number): number;
    mod(n: number): number;
    padZero(length: number): string;
}

declare interface String {
    padZero(length: number): string;
}

export {
    Array,
    Math,
    Number,
    String
};
