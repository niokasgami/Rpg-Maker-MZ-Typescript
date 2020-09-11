declare function Scene_GameEnd(...args: any[]): void;
declare class Scene_GameEnd {
    constructor(...args: any[]);
    constructor: typeof Scene_GameEnd;
    initialize(): void;
    create(): void;
    stop(): void;
    createBackground(): void;
    createCommandWindow(): void;
    _commandWindow: Window_GameEnd;
    commandWindowRect(): Rectangle;
    commandToTitle(): void;
}
