/**
 * The basic object that represents an image.
 *
 * @class
 * @param {number} width - The width of the bitmap.
 * @param {number} height - The height of the bitmap.
 */
declare function Bitmap(...args: any[]): void;
declare class Bitmap {
    /**
     * The basic object that represents an image.
     *
     * @class
     * @param {number} width - The width of the bitmap.
     * @param {number} height - The height of the bitmap.
     */
    constructor(...args: any[]);
    initialize(width: any, height: any): void;
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;
    _baseTexture: any;
    _image: HTMLImageElement;
    _url: string;
    _paintOpacity: number;
    _smooth: boolean;
    _loadListeners: any[];
    _loadingState: string;
    /**
     * The face name of the font.
     *
     * @type string
     */
    fontFace: string;
    /**
     * The size of the font in pixels.
     *
     * @type number
     */
    fontSize: number;
    /**
     * Whether the font is bold.
     *
     * @type boolean
     */
    fontBold: boolean;
    /**
     * Whether the font is italic.
     *
     * @type boolean
     */
    fontItalic: boolean;
    /**
     * The color of the text in CSS format.
     *
     * @type string
     */
    textColor: string;
    /**
     * The color of the outline of the text in CSS format.
     *
     * @type string
     */
    outlineColor: string;
    /**
     * The width of the outline of the text.
     *
     * @type number
     */
    outlineWidth: number;
    isReady(): boolean;
    isError(): boolean;
    get url(): string;
    get baseTexture(): any;
    get image(): HTMLImageElement;
    get canvas(): HTMLCanvasElement;
    get context(): CanvasRenderingContext2D;
    get width(): number;
    get height(): number;
    get rect(): Rectangle;
    set smooth(arg: boolean);
    get smooth(): boolean;
    set paintOpacity(arg: number);
    get paintOpacity(): number;
    destroy(): void;
    resize(width: number, height: number): void;
    blt(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw?: number, dh?: number): void;
    getPixel(x: number, y: number): string;
    getAlphaPixel(x: number, y: number): string;
    clearRect(x: number, y: number, width: number, height: number): void;
    clear(): void;
    fillRect(x: number, y: number, width: number, height: number, color: string): void;
    fillAll(color: string): void;
    strokeRect(x: number, y: number, width: number, height: number, color: string): void;
    gradientFillRect(x: number, y: number, width: number, height: number, color1: string, color2: string, vertical: boolean): void;
    drawCircle(x: number, y: number, radius: number, color: string): void;
    drawText(text: string, x: number, y: number, maxWidth: number, lineHeight: number, align: string): void;
    measureTextWidth(text: string): number;
    addLoadListener(listner: Function): void;
    retry(): void;
    _makeFontNameText(): string;
    _drawTextOutline(text: any, tx: any, ty: any, maxWidth: any): void;
    _drawTextBody(text: any, tx: any, ty: any, maxWidth: any): void;
    _createCanvas(width: any, height: any): void;
    _ensureCanvas(): void;
    _destroyCanvas(): void;
    _createBaseTexture(source: any): void;
    _updateScaleMode(): void;
    _startLoading(): void;
    _startDecrypting(): void;
    _onXhrLoad(xhr: any): void;
    _onLoad(): void;
    _callLoadListeners(): void;
    _onError(): void;
}
declare namespace Bitmap {
    function load(url: string): Bitmap;
    function snap(stage: Stage): Bitmap;
}
