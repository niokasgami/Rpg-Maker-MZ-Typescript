declare function Scene_Gameover(...args: any[]): void;
declare class Scene_Gameover {
    constructor(...args: any[]);
    constructor: typeof Scene_Gameover;
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    stop(): void;
    terminate(): void;
    playGameoverMusic(): void;
    createBackground(): void;
    _backSprite: Sprite;
    adjustBackground(): void;
    isTriggered(): boolean;
    gotoTitle(): void;
}
