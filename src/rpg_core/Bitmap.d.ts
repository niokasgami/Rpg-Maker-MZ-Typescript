import * as PIXI from "pixi.js";
import { Rectangle } from "./Rectangle";
import { Stage } from "./Stage";


// TODO : document the class?

/**
 * The basic object that rpresents an image.
 *
 * @class Bitmap
 */
declare class Bitmap {

    /**
     * The base texture that holds the image.
     *
     * @type {PIXI.BaseTexture}
     * @memberof Bitmap
     */


    public readonly baseTexture : PIXI.BaseTexture;

    /**
     * The bitmap canvas.
     *
     * @type {HTMLCanvasElement}
     * @memberof Bitmap
     */
    public readonly canvas: HTMLCanvasElement;

    /**
     * The 2d context of the bitmap canvas.
     *
     * @type {CanvasRenderingContext2D}
     * @memberof Bitmap
     */
    public readonly context: CanvasRenderingContext2D;

    public fontBold: boolean;

    public fontFace: string;

    public fontItalic: boolean;

    public fontSize: number;

    public readonly image: HTMLImageElement;

    public outlineColor: string;

    public outlineWidth: number;

    public paintOpacity: number;

    public readonly rect: Rectangle

    public smooth: boolean;
    
    public textColor: string;

    public readonly url: string;

    public readonly width: number;

    public readonly height: number;

    /**
     * Creates an instance of Bitmap.
     * @param {number} width The width of the bitmap.
     * @param {number} height The height of the bitmap.
     * @memberof Bitmap
     */
    constructor(width: number, height: number);

    public static load(url: string): Bitmap;

    public static snap(stage: Stage): Bitmap;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public addLoadListener(listner: Function): void;

    public blt(source: Bitmap,sx: number,sy: number,sw: number,sh: number, dx: number,dy: number, dw: number, dh: number): void;

    public clear(): void;

    public clearRect(x: number, y: number, width: number, height: number): void;

    public destroy(): void;

    public drawCircle(x: number, y: number, radius: number, color: number): void;

    public drawText(text: string,x: number,y: number, maxWidth: number, lineHeight:number, align: string): void;

    public fillAll(color: string): void;

    public fillRect(x: number,y:number,width: number, height: number, color: string): void;
    
    public getAlphaPixel(x:number, y: number): string;

    public getPixel(x: number, y: number): string;

    public gradientFillRect(x: number, y: number, width: number, height: number, color1: string, color2: string, vertical: boolean): void;

    public isError(): boolean;

    public isReady(): boolean;

    public measureTextwidth(text: string): number;

    public retry(): void;

    public strokeRect(x: number, y: number, width: number, height: number, color: string): void;

    public resize(width: number, height: number)
}

export {Bitmap}