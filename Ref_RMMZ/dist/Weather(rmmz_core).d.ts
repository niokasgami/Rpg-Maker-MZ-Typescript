/**
 * The weather effect which displays rain, storm, or snow.
 *
 * @class
 * @extends PIXI.Container
 */
declare function Weather(...args: any[]): void;
declare class Weather {
    /**
     * The weather effect which displays rain, storm, or snow.
     *
     * @class
     * @extends PIXI.Container
     */
    constructor(...args: any[]);
    constructor: typeof Weather;
    initialize(): void;
    _width: any;
    _height: any;
    _sprites: any[];
    /**
     * The type of the weather in ["none", "rain", "storm", "snow"].
     *
     * @type string
     */
    type: string;
    /**
     * The power of the weather in the range (0, 9).
     *
     * @type number
     */
    power: number;
    /**
     * The origin point of the weather for scrolling.
     *
     * @type Point
     */
    origin: Point;
    destroy(): void;
    update(): void;
    _createBitmaps(): void;
    _rainBitmap: Bitmap;
    _stormBitmap: Bitmap;
    _snowBitmap: Bitmap;
    _createDimmer(): void;
    _dimmerSprite: ScreenSprite;
    _updateDimmer(): void;
    _updateAllSprites(): void;
    _addSprite(): void;
    _removeSprite(): void;
    _updateSprite(sprite: any): void;
    _updateRainSprite(sprite: any): void;
    _updateStormSprite(sprite: any): void;
    _updateSnowSprite(sprite: any): void;
    _rebornSprite(sprite: any): void;
}
