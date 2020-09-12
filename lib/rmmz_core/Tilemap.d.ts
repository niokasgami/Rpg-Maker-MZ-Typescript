import * as PIXI from "pixi.js";

import { Point, Bitmap } from ".";

declare class Tilemap extends PIXI.Container {

    public animationCount: number;
    public flags: number[];
    public height: number;
    public horizontalWrap: boolean;
    public origin: Point;
    public verticalWrap: boolean;
    public width: number;

    constructor();

    public destroy(): void;
    public isReady(): boolean;
    public setBitmaps(bitmaps: Bitmap[]): void;
    public setData(width: number, height: number, data: number[]): void;
    public update(): void;
    public updateTransform(): void;

}

export { Tilemap };
