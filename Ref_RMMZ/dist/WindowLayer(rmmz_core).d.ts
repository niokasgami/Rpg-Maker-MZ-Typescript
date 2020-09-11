/**
 * The layer which contains game windows.
 *
 * @class
 * @extends PIXI.Container
 */
declare function WindowLayer(...args: any[]): void;
declare class WindowLayer {
    /**
     * The layer which contains game windows.
     *
     * @class
     * @extends PIXI.Container
     */
    constructor(...args: any[]);
    constructor: typeof WindowLayer;
    initialize(): void;
    update(): void;
    render(renderer: any): void;
}
