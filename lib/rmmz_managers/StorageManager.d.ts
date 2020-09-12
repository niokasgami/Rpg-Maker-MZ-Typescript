import Pako from "pako";

declare namespace StorageManager {

    export function isLocalMode(): boolean;
    export function saveObject<T>(saveName: string, object: T): Promise<void>;
    export function loadObject<T>(saveName: string): T;

    export function objectToJson(object: unknown): Promise<string>;
    export function jsonToObject<T>(json: string): Promise<T>;

    export function jsonToZip(json: Pako.Data): Promise<string>
    export function zipToJson(zip: Pako.Inflate): Promise<string>;

    export function saveZip(saveName: string, zip: pako.Inflate): Promise<void>;
    export function loadZip(saveName: string): pako.Inflate;

    export function exists(saveName: string): boolean;
    export function remove(saveName: string): Promise<void> | void;

    export function saveToLocalFile(saveName: string, zip: string): Promise<void>;
    export function loadFromLocalFile(saveName: string): Promise<string>;
    export function localFileExists(saveName: string): boolean;
    export function removeLocalFile(saveName: string): void;

    export function saveToForage(saveName: string, zip: string): Promise<string>;
    export function loadFromForage(saveName: string): Promise<string>;
    export function forageExists(saveName: string): boolean;
    export function removeForage(saveName: string): Promise<void>;

    export function updateForageKeys(): Promise<number>;
    export function forageKeysUpdated(): boolean;

    export function fsMkdir(path: string): void;
    export function fsRename(oldPath: string, newPath: string): void;
    export function fsUnlink(path: string): void;
    export function fsReadFile(path: string): string;
    export function fsWriteFile(path: string, data: string): void;

    export function fileDirectoryPath(): string;
    export function filePath(saveName: string): string;

    export function forageKey(saveName: string): string;
    export function forageTestKey(): string;

}

export { StorageManager };
