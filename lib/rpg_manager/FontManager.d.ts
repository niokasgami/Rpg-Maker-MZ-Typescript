
declare class FontManager {
    
    private static _urls : Record<string,string>;
    private static _states : Record<string,string>;

    public static load(family: string, filename: string): void;
    public static isReady(): boolean;
    public static startLoading(family: string, url: string): void;
    public static throwLoadError(familly: string): void;
    public static makeUrl(filename: string): string;

}
 
export {FontManager}