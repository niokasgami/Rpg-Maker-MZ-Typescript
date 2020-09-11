declare function Scene_Options(...args: any[]): void;
declare class Scene_Options {
    constructor(...args: any[]);
    constructor: typeof Scene_Options;
    initialize(): void;
    create(): void;
    terminate(): void;
    createOptionsWindow(): void;
    _optionsWindow: Window_Options;
    optionsWindowRect(): Rectangle;
    maxCommands(): number;
    maxVisibleCommands(): number;
}
