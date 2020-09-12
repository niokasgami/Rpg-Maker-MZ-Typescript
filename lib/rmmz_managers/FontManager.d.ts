
declare namespace FontManager {

    export function load(family: string, filename: string): void;
    export function isReady(): boolean;
    export function startLoading(family: string, url: string): void;
    export function throwLoadError(familly: string): void;
    export function makeUrl(filename: string): string;

}

export {FontManager}