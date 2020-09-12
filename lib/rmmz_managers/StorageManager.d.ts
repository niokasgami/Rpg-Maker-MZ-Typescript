import Pako from "pako";

declare class StorageManager {

    private static _forageKeys: string[];
    private static _forageKeysUpdated: boolean;

    constructor();

    public static isLocalMode(): boolean;
    public static saveObject<T>(saveName: string, object: T): Promise<void>;
    public static loadObject<T>(saveName: string): T;
    public static objectToJson(object: unknown): Promise<string>;
    public static jsonToObject<T>(json: string): Promise<T>;
    public static jsonToZip(json: Pako.Data): Promise<string>
    public static zipToJson(zip: Pako.Inflate): Promise<string>;
    public static saveZip(saveName: string, zip: pako.Inflate): Promise<void>;
    public static loadZip(saveName: string): pako.Inflate;
    public static exists(saveName: string): boolean;
    public static remove(saveName: string): Promise<void> | void;
    public static saveToLocalFile(saveName: string, zip: string): Promise<void>;
    public static loadFromLocalFile(saveName: string): Promise<string>;
    public static localFileExists(saveName: string): boolean;
    public static removeLocalFile(saveName: string): void;
    public static saveToForage(saveName: string, zip: string): Promise<string>;
    public static loadFromForage(saveName: string): Promise<string>;
    public static forageExists(saveName: string): boolean;
    public static removeForage(saveName: string): Promise<void>;
    public static updateForageKeys(): Promise<number>;
    public static forageKeysUpdated(): boolean;
    public static fsMkdir(path: string): void;
    public static fsRename(oldPath: string, newPath: string): void;
    public static fsUnlink(path: string): void;
    public static fsReadFile(path: string): string;
    public static fsWriteFile(path: string, data: string): void;
    public static fileDirectoryPath(): string;
    public static filePath(saveName: string): string;
    public static forageKey(saveName: string): string;
    public static forageTestKey(): string;
}

export { StorageManager }
