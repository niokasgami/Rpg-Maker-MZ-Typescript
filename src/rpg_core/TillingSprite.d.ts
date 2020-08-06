import * as PIXI from "pixi.js";
import { Bitmap } from "./Bitmap";
import { Point } from "./Point";

declare class TillingSprite extends PIXI.TilingSprite {
    
    public bitmap: Bitmap;
    public opacity: number;
    public origin: Point;
    constructor();
    public destroy(): void;
    public move(x: number, y: number, width: number, height: number): void;
    public setFrame(x:number,y:number,width: number, height: number): void;
    public update(): void;
    public updateTransform(): void;

}
export {TillingSprite}