declare function EffectManager(): void;
declare namespace EffectManager {
    const _cache: {};
    const _errorUrls: any[];
    function load(filename: any): any;
    function startLoading(url: any): any;
    function clear(): void;
    function onLoad(): void;
    function onError(url: any): void;
    function makeUrl(filename: any): string;
    function checkErrors(): void;
    function throwLoadError(url: any): never;
    function isReady(): boolean;
}
