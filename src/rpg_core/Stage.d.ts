import * as PIXI from "pixi.js";

/**
 *The roo object of the display tree.
 *
 * @class Stage
 * @extends {PIXI.Container}
 */
declare class Stage extends PIXI.Container {
    
    constructor();

    /**
     *Destroys the stage.
     *
     * @memberof Stage
     */
    public destroy(): void;
}

export {Stage}