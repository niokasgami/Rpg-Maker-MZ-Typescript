declare function PluginManager(): void;
declare namespace PluginManager {
    const _scripts: any[];
    const _errorUrls: any[];
    const _parameters: {};
    const _commands: {};
    function setup(plugins: any): void;
    function parameters(name: any): any;
    function setParameters(name: any, parameters: any): void;
    function loadScript(filename: any): void;
    function onError(e: any): void;
    function makeUrl(filename: any): string;
    function checkErrors(): void;
    function throwLoadError(url: any): never;
    function registerCommand(pluginName: any, commandName: any, func: any): void;
    function callCommand(self: any, pluginName: any, commandName: any, args: any): void;
}
