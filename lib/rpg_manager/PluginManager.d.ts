
interface PluginsStruct {
    name: string;
    status: boolean;
    description: string;
    parameters: Record<string, any>;
}
declare class PluginManager {

    private static _scripts: string[];
    private static _errorUrls: string[];
    private static _parameters: Record<string, any>;
    private static _commands: Record<string, any>;

    public static setup(plugins: PluginsStruct[]): void;
    public static parameters<T>(name: string): any; // per design we convert the parameters afterward?
    public static setParameters(name: string, parameters: string): void;
    public static loadScript(filename: string): void;
    public static onError(e: any): void;
    public static makeUrl(filename: string): string;
    public static checkErrors(): void;
    public static throwLoadError(url: string): void;
    public static registerCommand(pluginName: string, commandName: string, func: Function): void;
    public static callCommand(self: any, pluginName: string, commandName: string, args: string[]): void;
}

export {
    PluginManager,
    PluginsStruct
}

