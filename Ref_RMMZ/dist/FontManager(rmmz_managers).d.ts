declare function FontManager(): void;
declare namespace FontManager {
    const _urls: {};
    const _states: {};
    function load(family: any, filename: any): void;
    function isReady(): boolean;
    function startLoading(family: any, url: any): void;
    function throwLoadError(family: any): never;
    function makeUrl(filename: any): string;
}
