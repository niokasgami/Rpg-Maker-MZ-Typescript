
import * as PIXI from "pixi.js";
import { Point } from "./Point";

declare class Weather extends PIXI.Container {

    public origin: Point;
    public power: number;
    public type: string;

    constructor();

    public destroy(): void;
    public update(): void;
}

export {Weather};