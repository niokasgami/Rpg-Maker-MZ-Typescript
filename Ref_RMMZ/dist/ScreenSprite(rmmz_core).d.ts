/**
 * The sprite which covers the entire game screen.
 *
 * @class
 * @extends PIXI.Container
 */
declare function ScreenSprite(...args: any[]): void;
declare class ScreenSprite {
    /**
     * The sprite which covers the entire game screen.
     *
     * @class
     * @extends PIXI.Container
     */
    constructor(...args: any[]);
    constructor: typeof ScreenSprite;
    initialize(): void;
    _graphics: any;
    opacity: number;
    _red: number;
    _green: number;
    _blue: number;
    destroy(): void;
    setBlack(): void;
    setWhite(): void;
    setColor(r: number, g: number, b: number): void;
}
