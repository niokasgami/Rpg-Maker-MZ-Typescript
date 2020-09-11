import * as PIXI from "pixi.js";
import { EffekseerContext } from "effekseer";
import { Stage } from "./Stage";

declare class Graphics {

    public static app: PIXI.Application;
    public static boxHeight: number;
    public static boxWidth: number;
    public static defaultScale: number;
    public static effekseer: EffekseerContext;
    public static frameCount: number;
    public static height: number;
    public static width: number;

    public static endLoading(): boolean;
    public static eraseError(): void;
    public static hideScreen(): void;
    public static initialize(): boolean;
    public static isInsideCanvas(x: number, y: number): boolean;
    public static pageToCanvasX(x: number): number;
    public static pageToCanvasY(y: number): number;
    public static printError(name: string, message: string, error: Error): void;
    public static resize(width: number, height: number): void;
    public static setStage(stage: Stage): void;
    public static setTickHandler(handler: Function): void;
    public static showRetryButton(retry: Function): void;
    public static showScreen(): void;
    public static startGameLoop(): void;
    public static startLoading(): void;
    public static stopGameLoop(): void;
}
export {
    Graphics
}