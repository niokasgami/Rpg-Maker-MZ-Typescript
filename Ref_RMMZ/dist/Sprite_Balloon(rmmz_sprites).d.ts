declare function Sprite_Balloon(...args: any[]): void;
declare class Sprite_Balloon {
    constructor(...args: any[]);
    constructor: typeof Sprite_Balloon;
    initialize(): void;
    initMembers(): void;
    _target: any;
    _balloonId: any;
    _duration: number;
    z: number;
    loadBitmap(): void;
    bitmap: any;
    setup(targetSprite: any, balloonId: any): void;
    update(): void;
    updatePosition(): void;
    x: any;
    y: number;
    updateFrame(): void;
    speed(): number;
    waitTime(): number;
    frameIndex(): number;
    isPlaying(): boolean;
}
