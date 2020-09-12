import * as PIXI from "pixi.js";

declare class Stage extends PIXI.Container {
    constructor();

    public destroy(): void;
}

export { Stage };
