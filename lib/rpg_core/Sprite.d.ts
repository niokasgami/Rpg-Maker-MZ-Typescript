import * as PIXI from "pixi.js";
import { Bitmap } from "./Bitmap";


declare type RGBArray = [number,number,number,number];

declare class Sprite extends PIXI.Sprite {

    public bitmap: Bitmap;
    public blendMode: number;
    public height: number;
    public opacity: number;
    public width: number;

    constructor(bitmap: Bitmap);

    public destroy(): void;
    public getBlendColor(): RGBArray
    public getColorTone(): RGBArray
    public hide(): void;
    public move(x: number, y: number): void;
    public setBlendColor(color: RGBArray): void
    public setColorTone(tone: RGBArray): void;
    public setFrame(x: number, y: number, width: number, height: number): void;
    public setHue(hue: number): void;
    public show(): void;
    public update(): void;
    public updateVisibility(): void;
}

export {
    RGBArray,
    Sprite
}