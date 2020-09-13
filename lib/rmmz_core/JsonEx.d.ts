declare namespace JsonEx {
    export let maxDepth: number;
    
    export function makeDeepCopy<T>(object: T): T;

    export function parse<T>(json: string): T;
    export function stringify(object: unknown): string;
}

export { JsonEx };
