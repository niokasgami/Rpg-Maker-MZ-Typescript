import * as PIXI from "pixi.js";

type ColorTone = [number, number, number, number];

declare class ColorFilter extends PIXI.Filter {

    constructor();

    public setBlendColor(color: string): void;

    public setBrightness(brightness: number): void;

    public setColorTone(tone: ColorTone): void;

    public setHue(hue: number): void;

}

export {
    ColorFilter,
    ColorTone
};
