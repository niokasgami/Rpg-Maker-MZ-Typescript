import Pako from "pako";
import LocalForage from "localforage";

declare class StorageManager {

    private static _forageKeys: string[];
    private static _forageKeysUpdated: boolean;

    constructor();

    public static isLocalMode(): boolean;
    public static saveObject(saveName: string, object: Record<string, any>): Promise<any>;
    public static loadObject(saveName: string): Record<string, any>;
    public static objectToJson(object: Record<string, any>): Promise<any>;
    public static jsonToObject(json: string): Promise<any>;
    public static jsonToZip(json: string): Promise<any>
    public static zipToJson(zip: Pako.Inflate): Promise<any>;
    public static saveZip(saveName: string, zip: pako.Inflate): any;
    public static loadZip(saveName: string): pako.Inflate;
    public static exists(saveName: string): boolean;
    public static remove(saveName): any;
    public static saveToLocalFile(saveName: string, zip: any): Promise<any>;
    public static loadFromLocalFile(saveName: string): Promise<any>;
    public static localFileExists(saveName: string): boolean;
    public static removeLocalFile(saveName: string): void;
    public static saveToForage(saveName: string, zip: any): any;
    public static loadFromForage(saveName: string): Promise<any>;
    public static forageExists(saveName: string): boolean;
    public static removeForage(saveName: string): Promise<any>;
    public static updateForageKeys(): Promise<number>;
    public static forageKeysUpdated(): boolean;
    public static fsMkdir(path: string): void;
    public static fsRename(oldPath: string, newPath: string): void;
    public static fsUnlink(path: string): void;
    public static fsReadFile(path: string): string;
    public static fsWriteFile(path: string, data: any): void;
    public static fileDirectoryPath(): string;
    public static filePath(saveName: string): string;
    public static forageKey(saveName: string): string;
    public static forageTestKey(): string;
}

export { StorageManager }
// TODO: check if we need pako.inflate? it's a Zip file no? There's a lots of unknown to fix.