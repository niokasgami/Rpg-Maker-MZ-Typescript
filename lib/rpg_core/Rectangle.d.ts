import * as PIXI from "pixi.js";

/**
 *The rectangle class
 *
 * @class Rectangle
 * @extends {PIXI.Rectangle}
 */
class Rectangle extends PIXI.Rectangle {

    /**
     * Creates an instance of Rectangle.
     * @param {number} x The x coordinate for the upper-left corner.
     * @param {number} y The y coordinate for the upper-left corner.
     * @param {number} width The width of the rectangle.
     * @param {number} height The height of the rectangle.
     * @memberof Rectangle
     */
    constructor(x: number, y: number, width: number, height: number);
}

export {Rectangle}