import * as PIXI from "pixi.js";

import { Rectangle, Stage } from ".";

declare class Bitmap {

    constructor(width: number, height: number);

    public readonly url: string;
    public readonly baseTexture : PIXI.BaseTexture;
    public readonly image: HTMLImageElement;
    public readonly canvas: HTMLCanvasElement;
    public readonly context: CanvasRenderingContext2D;

    public readonly width: number;
    public readonly height: number;
    public readonly rect: Rectangle

    public smooth: boolean;

    public paintOpacity: number;

    public fontFace: string;
    public fontSize: number;
    public fontBold: boolean;
    public fontItalic: boolean;

    public textColor: string;

    public outlineColor: string;
    public outlineWidth: number;

    public static load(url: string): Bitmap;
    public static snap(stage: Stage): Bitmap;

    public isError(): boolean;
    public isReady(): boolean;

    public retry(): void;

    public addLoadListener(listener: (self: Bitmap) => void): void;

    public blt(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number,dy: number, dw: number, dh: number): void;

    public clear(): void;
    public clearRect(x: number, y: number, width: number, height: number): void;

    public destroy(): void;

    public drawCircle(x: number, y: number, radius: number, color: number): void;
    public drawText(text: string | number, x: number, y: number, maxWidth: number, lineHeight:number, align: string): void;

    public fillAll(color: string): void;
    public fillRect(x: number, y:number, width: number, height: number, color: string): void;
    public gradientFillRect(x: number, y: number, width: number, height: number, color1: string, color2: string, vertical: boolean): void;

    public getAlphaPixel(x:number, y: number): string;
    public getPixel(x: number, y: number): string;

    public measureTextWidth(text: string): number;

    public strokeRect(x: number, y: number, width: number, height: number, color: string): void;

    public resize(width: number, height: number): void;

}

export { Bitmap };
