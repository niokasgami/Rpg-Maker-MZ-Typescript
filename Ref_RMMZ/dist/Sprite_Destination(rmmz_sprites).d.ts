declare function Sprite_Destination(...args: any[]): void;
declare class Sprite_Destination {
    constructor(...args: any[]);
    constructor: typeof Sprite_Destination;
    initialize(): void;
    _frameCount: number;
    destroy(options: any): void;
    update(): void;
    visible: boolean;
    createBitmap(): void;
    bitmap: Bitmap;
    blendMode: number;
    updatePosition(): void;
    x: number;
    y: number;
    updateAnimation(): void;
    opacity: number;
}
