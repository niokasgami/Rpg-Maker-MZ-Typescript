import * as PIXI from "pixi.js";

import { EffekseerContext } from "effekseer";
import { Stage } from ".";

declare namespace Graphics {

    export const app: PIXI.Application;
    
    export let boxHeight: number;
    export let boxWidth: number;
    export let defaultScale: number;

    export const effekseer: EffekseerContext;

    export let frameCount: number;
    export let height: number;
    export let width: number;

    export function initialize(): boolean;

    export function endLoading(): boolean;

    export function eraseError(): void;
    export function hideScreen(): void;

    export function isInsideCanvas(x: number, y: number): boolean;

    export function pageToCanvasX(x: number): number;
    export function pageToCanvasY(y: number): number;

    export function printError(name: string, message: string, error: Error): void;

    export function resize(width: number, height: number): void;

    export function setStage(stage: Stage): void;

    export function setTickHandler(handler: (delta: number) => void): void;

    export function showRetryButton(retry: () => void): void;
    export function showScreen(): void;
    
    export function startGameLoop(): void;
    export function startLoading(): void;
    export function stopGameLoop(): void;

}

export { Graphics };