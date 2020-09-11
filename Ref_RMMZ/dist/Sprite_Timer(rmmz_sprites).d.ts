declare function Sprite_Timer(...args: any[]): void;
declare class Sprite_Timer {
    constructor(...args: any[]);
    constructor: typeof Sprite_Timer;
    initialize(): void;
    _seconds: any;
    destroy(options: any): void;
    createBitmap(): void;
    bitmap: Bitmap;
    fontFace(): any;
    fontSize(): any;
    update(): void;
    updateBitmap(): void;
    redraw(): void;
    timerText(): string;
    updatePosition(): void;
    x: number;
    y: number;
    updateVisibility(): void;
    visible: any;
}
