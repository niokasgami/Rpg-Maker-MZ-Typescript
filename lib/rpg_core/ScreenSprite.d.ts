import * as PIXI from "pixi.js";

declare class ScreenSprite extends PIXI.Container {

    public opacity: number;

    constructor();

    public destroy(): void;
    
    public setBlack(): void;

    public setColor(r: number,g: number,b: number): void;

    public setWhite(): void;
}

export {ScreenSprite}