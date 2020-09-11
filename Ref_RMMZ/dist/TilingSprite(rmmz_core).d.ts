/**
 * The sprite object for a tiling image.
 *
 * @class
 * @extends PIXI.TilingSprite
 * @param {Bitmap} bitmap - The image for the tiling sprite.
 */
declare function TilingSprite(...args: any[]): void;
declare class TilingSprite {
    /**
     * The sprite object for a tiling image.
     *
     * @class
     * @extends PIXI.TilingSprite
     * @param {Bitmap} bitmap - The image for the tiling sprite.
     */
    constructor(...args: any[]);
    constructor: typeof TilingSprite;
    initialize(bitmap: any): void;
    _bitmap: any;
    _width: number;
    _height: number;
    _frame: Rectangle;
    /**
     * The origin point of the tiling sprite for scrolling.
     *
     * @type Point
     */
    origin: Point;
    set bitmap(arg: any);
    get bitmap(): any;
    set opacity(arg: number);
    get opacity(): number;
    destroy(): void;
    update(): void;
    move(x: number, y: number, width: number, height: number): void;
    x: number;
    y: number;
    setFrame(x: number, y: number, width: number, height: number): void;
    updateTransform(): void;
    _onBitmapChange(): void;
    _onBitmapLoad(): void;
    _refresh(): void;
}
declare namespace TilingSprite {
    const _emptyBaseTexture: any;
}
