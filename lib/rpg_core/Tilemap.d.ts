import * as PIXI from "pixi.js";
import { Point } from "./Point";
import { Bitmap } from "./Bitmap";

declare class Tilemap extends PIXI.Container {

    public animationCount: number;
    public flags : any[];
    public height: number;
    public horizontalWrap: boolean;
    public origin: Point;
    public verticalWrap: boolean;
    public width: number;

    constructor();

    public destroy(): void;
    public isReady(): boolean;
    public setBitmaps(bitmaps: Bitmap[]): void;
    public setData(width: number, height: number, data: any[]): void; // TODO : make sure the data is reflected?
    public update(): void;
    public updateTransform(): void;
}

export { Tilemap }