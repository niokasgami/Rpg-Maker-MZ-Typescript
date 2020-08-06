
declare class JsonEx {

    public static maxDepth: number = 100;
    
    public static makeDeepCopy<T>(object : Object): T;

    public static parse<T>(json: string): T;

    public static stringify(object: Object): string;

}

export {
    JsonEx
}