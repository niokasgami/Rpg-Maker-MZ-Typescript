type PluginParameters = Record<string, string>;

interface PluginsStruct {
    name: string;
    status: boolean;
    description: string;
    parameters: PluginParameters;
}

interface PluginCommand {
    (args: PluginParameters): void;
}

declare namespace PluginManager {

    export function setup(plugins: PluginsStruct[]): void;

    export function parameters(name: string): PluginParameters;
    export function setParameters(name: string, parameters: string): void;

    export function loadScript(filename: string): void;
    export function onError(e: Event): void;

    export function makeUrl(filename: string): string;

    export function checkErrors(): void;
    export function throwLoadError(url: string): void;

    export function registerCommand(pluginName: string, commandName: string, func: PluginCommand): void;
    export function callCommand(self: unknown, pluginName: string, commandName: string, args: PluginParameters): void;

}

export {
    PluginManager,
    PluginParameters,
    PluginsStruct,
    PluginCommand
};
