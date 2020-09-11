declare function Scene_Title(...args: any[]): void;
declare class Scene_Title {
    constructor(...args: any[]);
    constructor: typeof Scene_Title;
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    isBusy(): any;
    terminate(): void;
    createBackground(): void;
    _backSprite1: Sprite;
    _backSprite2: Sprite;
    createForeground(): void;
    _gameTitleSprite: Sprite;
    drawGameTitle(): void;
    adjustBackground(): void;
    createCommandWindow(): void;
    _commandWindow: Window_TitleCommand;
    commandWindowRect(): Rectangle;
    commandNewGame(): void;
    commandContinue(): void;
    commandOptions(): void;
    playTitleMusic(): void;
}
