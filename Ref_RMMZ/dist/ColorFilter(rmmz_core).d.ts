/**
 * The color filter for WebGL.
 *
 * @class
 * @extends PIXI.Filter
 */
declare function ColorFilter(...args: any[]): void;
declare class ColorFilter {
    /**
     * The color filter for WebGL.
     *
     * @class
     * @extends PIXI.Filter
     */
    constructor(...args: any[]);
    constructor: typeof ColorFilter;
    initialize(): void;
    setHue(hue: number): void;
    setColorTone(tone: any[]): void;
    setBlendColor(color: any[]): void;
    setBrightness(brightness: number): void;
    _fragmentSrc(): string;
}
