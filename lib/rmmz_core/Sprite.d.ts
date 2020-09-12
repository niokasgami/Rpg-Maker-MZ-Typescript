import * as PIXI from "pixi.js";

import { Bitmap } from ".";

declare type RGBA = [number, number, number, number];

declare class Sprite extends PIXI.Sprite {

    bitmap: Bitmap;
    opacity: number;

    constructor(bitmap: Bitmap);

    getBlendColor(): RGBA
    getColorTone(): RGBA
    hide(): void;
    move(x: number, y: number): void;
    setBlendColor(color: RGBA): void
    setColorTone(tone: RGBA): void;
    setFrame(x: number, y: number, width: number, height: number): void;
    setHue(hue: number): void;
    show(): void;
    update(): void;
    updateVisibility(): void;

}

export {
    RGBA,
    Sprite
};
