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

declare class PluginManager {

    private static _scripts: string[];
    private static _errorUrls: string[];
    private static _parameters: Record<string, Record<string, string>>;
    private static _commands: Record<string, PluginCommand>;

    public static setup(plugins: PluginsStruct[]): void;

    public static parameters(name: string): PluginParameters;
    public static setParameters(name: string, parameters: string): void;

    public static loadScript(filename: string): void;
    public static onError(e: Event): void;

    public static makeUrl(filename: string): string;

    public static checkErrors(): void;
    public static throwLoadError(url: string): void;

    public static registerCommand(pluginName: string, commandName: string, func: PluginCommand): void;
    public static callCommand(self: unknown, pluginName: string, commandName: string, args: PluginParameters): void;

}

export {
    PluginManager,
    PluginParameters,
    PluginsStruct,
    PluginCommand
};
