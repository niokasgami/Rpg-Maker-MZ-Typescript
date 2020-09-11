declare function Sprite_Name(...args: any[]): void;
declare class Sprite_Name {
    constructor(...args: any[]);
    constructor: typeof Sprite_Name;
    initialize(): void;
    initMembers(): void;
    _battler: any;
    _name: any;
    _textColor: any;
    destroy(options: any): void;
    createBitmap(): void;
    bitmap: Bitmap;
    bitmapWidth(): number;
    bitmapHeight(): number;
    fontFace(): any;
    fontSize(): any;
    setup(battler: any): void;
    update(): void;
    updateBitmap(): void;
    name(): any;
    textColor(): any;
    outlineColor(): string;
    outlineWidth(): number;
    redraw(): void;
    setupFont(): void;
}
