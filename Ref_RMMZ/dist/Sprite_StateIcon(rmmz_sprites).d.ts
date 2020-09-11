declare function Sprite_StateIcon(...args: any[]): void;
declare class Sprite_StateIcon {
    constructor(...args: any[]);
    constructor: typeof Sprite_StateIcon;
    initialize(): void;
    initMembers(): void;
    _battler: any;
    _iconIndex: any;
    _animationCount: number;
    _animationIndex: number;
    loadBitmap(): void;
    bitmap: any;
    setup(battler: any): void;
    update(): void;
    animationWait(): number;
    updateIcon(): void;
    shouldDisplay(): any;
    updateFrame(): void;
}
