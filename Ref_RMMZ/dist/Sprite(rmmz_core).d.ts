/**
 * The basic object that is rendered to the game screen.
 *
 * @class
 * @extends PIXI.Sprite
 * @param {Bitmap} bitmap - The image for the sprite.
 */
declare function Sprite(...args: any[]): void;
declare class Sprite {
    /**
     * The basic object that is rendered to the game screen.
     *
     * @class
     * @extends PIXI.Sprite
     * @param {Bitmap} bitmap - The image for the sprite.
     */
    constructor(...args: any[]);
    constructor: typeof Sprite;
    initialize(bitmap: any): void;
    spriteId: number;
    _bitmap: any;
    _frame: Rectangle;
    _hue: number;
    _blendColor: any;
    _colorTone: any;
    _colorFilter: ColorFilter;
    _blendMode: any;
    _hidden: boolean;
    set bitmap(arg: any);
    get bitmap(): any;
    set width(arg: any);
    get width(): any;
    set height(arg: any);
    get height(): any;
    set opacity(arg: number);
    get opacity(): number;
    set blendMode(arg: any);
    get blendMode(): any;
    destroy(): void;
    update(): void;
    hide(): void;
    show(): void;
    updateVisibility(): void;
    visible: boolean;
    move(x: number, y: number): void;
    x: number;
    y: number;
    setFrame(x: number, y: number, width: number, height: number): void;
    _refreshFrame: boolean;
    setHue(hue: number): void;
    getBlendColor(): any[];
    setBlendColor(color: any[]): void;
    getColorTone(): any[];
    setColorTone(tone: any[]): void;
    _onBitmapChange(): void;
    _onBitmapLoad(bitmapLoaded: any): void;
    _refresh(): void;
    _createColorFilter(): void;
    filters: any[];
    _updateColorFilter(): void;
}
declare namespace Sprite {
    const _emptyBaseTexture: any;
    const _counter: number;
}
