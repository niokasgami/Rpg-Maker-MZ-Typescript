declare function Sprite_StateOverlay(...args: any[]): void;
declare class Sprite_StateOverlay {
    constructor(...args: any[]);
    constructor: typeof Sprite_StateOverlay;
    initialize(): void;
    initMembers(): void;
    _battler: any;
    _overlayIndex: any;
    _animationCount: number;
    _pattern: number;
    loadBitmap(): void;
    bitmap: any;
    setup(battler: any): void;
    update(): void;
    animationWait(): number;
    updatePattern(): void;
    updateFrame(): void;
}
