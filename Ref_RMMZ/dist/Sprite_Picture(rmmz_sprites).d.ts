declare function Sprite_Picture(...args: any[]): void;
declare class Sprite_Picture {
    constructor(...args: any[]);
    constructor: typeof Sprite_Picture;
    initialize(pictureId: any): void;
    _pictureId: any;
    _pictureName: any;
    picture(): any;
    update(): void;
    updateBitmap(): void;
    visible: boolean;
    bitmap: any;
    updateOrigin(): void;
    updatePosition(): void;
    x: number;
    y: number;
    updateScale(): void;
    updateTone(): void;
    updateOther(): void;
    opacity: any;
    blendMode: any;
    rotation: number;
    loadBitmap(): void;
}
