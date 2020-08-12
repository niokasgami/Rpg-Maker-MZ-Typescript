/**
 * Declaration file for rpg maker MZ 
 * @name rmmz_API
 * @author nio kasgami 
 * @version 1.00 
 * @license https://github.com/niokasgami/Rpg-Maker-MZ-Typescript/blob/master/LICENSE
 * 
 */

import { Container, Application, Rectangle as Rectangle$1, BaseTexture, Filter, Point as Point$1, Sprite as Sprite$1, TilingSprite, Renderer } from 'pixi.js';
import { EffekseerContext } from 'effekseer';

/**
 *The roo object of the display tree.
 *
 * @class Stage
 * @extends {PIXI.Container}
 */
declare class Stage extends Container {
    
    constructor();

    /**
     *Destroys the stage.
     *
     * @memberof Stage
     */
    public destroy(): void;
}

declare class Graphics {

    public static app: Application;
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

/**
 * The global namespace for interface.
 */
namespace RPG {
    export interface InputGamepad {
        0: "ok"; // A
        1: "cancel"; // B
        2: "shift"; // X
        3: "menu"; // Y
        4: "pageup"; // LB
        5: "pagedown"; // RB
        12: "up"; // D-pad up
        13: "down"; // D-pad down
        14: "left"; // D-pad left
        15: "right"; // D-pad right
    }
    export interface InputKey {
        9: "tab"; // tab
        13: "ok"; // enter
        16: "shift"; // shift
        17: "control"; // control
        18: "control"; // alt
        27: "escape"; // escape
        32: "ok"; // space
        33: "pageup"; // pageup
        34: "pagedown"; // pagedown
        37: "left"; // left arrow
        38: "up"; // up arrow
        39: "right"; // right arrow
        40: "down"; // down arrow
        45: "escape"; // insert
        81: "pageup"; // Q
        87: "pagedown"; // W
        88: "escape"; // X
        90: "ok"; // Z
        96: "escape"; // numpad 0
        98: "down"; // numpad 2
        100: "left"; // numpad 4
        102: "right"; // numpad 6
        104: "up"; // numpad 8
        120: "debug"; // F9
    }
}

declare class Input {

    public static readonly date: number;
    public static readonly dir4: number;
    public static readonly dir8: number;
    public static gamepadMapper: RPG.InputGamepad;
    public static keyMapper: RPG.InputKey;
    public static keyRepeatInterval: number;
    public static keyRepeatWait: number;

    public static clear(): void;
    public static initialize(): void;
    public static isLongPressed(keyname: string): boolean;
    public static isPressed(keyName: string): boolean;
    public static isRepeated(keyName: string): boolean;
    public static isTriggered(keyName: string): boolean;
    public static update(): void;

}

declare interface Array {
    clone<T>(): T[]; 
    equals(array: any[]): boolean;
    remove<T>(element: any): T[];
}

declare interface Math {
    randomInt(max: number): number;
}

declare interface Number {
    clamp(min: number,max: number): number;
    mod(n: number): number;
    padZero(lenght: number): string;
}

declare interface String {
    padZero(lenght: number): string;
    
}

declare class JsonEx {

    public static maxDepth: number = 100;
    
    public static makeDeepCopy<T>(object : Object): T;

    public static parse<T>(json: string): T;

    public static stringify(object: Object): string;

}

declare class TouchInput {

    public static readonly date: number;
    public static keyRepeatInterval: number;
    public static keyRepeatWait: number;
    public static moveThreshold: number;
    public static readonly wheelX: number;
    public static readonly wheelY: number;
    public static readonly inputX: number;
    public static readonly inputY: number;

    public static clear(): void;
    public static initialize(): void;
    public static isCancelled(): boolean;
    public static isClicked(): boolean;
    public static isHovered(): boolean;
    public static isLongPressed(): boolean;
    public static isMoved(): boolean;
    public static isPressed(): boolean;
    public static isReleased(): boolean;
    public static isRepeated(): boolean;
    public static isTriggered(): boolean;
    public static update(): void;
}

declare class Utils {

    public static readonly RPGMAKER_NAME: string;
    public static readonly RPGMAKER_VERSION: string;

    public static canPlayOgg(): boolean;
    public static canPlayWebm(): boolean;
    public static canUseCssFontLoading(): boolean;
    public static canUseIndexedDB(): boolean;
    public static canUseWebAudioAPI(): boolean;
    public static canUseWebGL(): boolean;
    public static checkRMVersion(version: string): boolean;
    public static containsArabic(): boolean;
    public static decryptArrayBuffer(source: ArrayBuffer): ArrayBuffer;
    public static encodeURI(str: string): string;
    public static escapeHtml(str: string): string;
    public static hasEncryptedAudio(): boolean;
    public static isAndroidChrome(): boolean;
    public static isAtsumaru(): boolean;
    public static isLocal(): boolean;
    public static isMobileDevice(): boolean;
    public static isMobileSafari(): boolean;
    public static isNwjs(): boolean;
    public static isOptionValid(name: string): boolean;
    public static setEncryptionInfo(hasImages: boolean,hasAudio: boolean, key: string): void;

}

declare class Video {

    public static initialize(width: number, height: number): void;
    public static isPlaying(): boolean;
    public static play(): void;
    public static resize(width: number, height: number): void;
    public static setVolume(volume: number): void;
    
}

/**
 *The rectangle class
 *
 * @class Rectangle
 * @extends {PIXI.Rectangle}
 */
class Rectangle extends Rectangle$1 {

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

// TODO : document the class?

/**
 * The basic object that rpresents an image.
 *
 * @class Bitmap
 */
declare class Bitmap {

    /**
     * The base texture that holds the image.
     *
     * @type {PIXI.BaseTexture}
     * @memberof Bitmap
     */


    public readonly baseTexture : BaseTexture;

    /**
     * The bitmap canvas.
     *
     * @type {HTMLCanvasElement}
     * @memberof Bitmap
     */
    public readonly canvas: HTMLCanvasElement;

    /**
     * The 2d context of the bitmap canvas.
     *
     * @type {CanvasRenderingContext2D}
     * @memberof Bitmap
     */
    public readonly context: CanvasRenderingContext2D;

    public fontBold: boolean;

    public fontFace: string;

    public fontItalic: boolean;

    public fontSize: number;

    public readonly image: HTMLImageElement;

    public outlineColor: string;

    public outlineWidth: number;

    public paintOpacity: number;

    public readonly rect: Rectangle

    public smooth: boolean;
    
    public textColor: string;

    public readonly url: string;

    public readonly width: number;

    public readonly height: number;

    /**
     * Creates an instance of Bitmap.
     * @param {number} width The width of the bitmap.
     * @param {number} height The height of the bitmap.
     * @memberof Bitmap
     */
    constructor(width: number, height: number);

    public static load(url: string): Bitmap;

    public static snap(stage: Stage): Bitmap;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public addLoadListener(listner: Function): void;

    public blt(source: Bitmap,sx: number,sy: number,sw: number,sh: number, dx: number,dy: number, dw: number, dh: number): void;

    public clear(): void;

    public clearRect(x: number, y: number, width: number, height: number): void;

    public destroy(): void;

    public drawCircle(x: number, y: number, radius: number, color: number): void;

    public drawText(text: string,x: number,y: number, maxWidth: number, lineHeight:number, align: string): void;

    public fillAll(color: string): void;

    public fillRect(x: number,y:number,width: number, height: number, color: string): void;
    
    public getAlphaPixel(x:number, y: number): string;

    public getPixel(x: number, y: number): string;

    public gradientFillRect(x: number, y: number, width: number, height: number, color1: string, color2: string, vertical: boolean): void;

    public isError(): boolean;

    public isReady(): boolean;

    public measureTextwidth(text: string): number;

    public retry(): void;

    public strokeRect(x: number, y: number, width: number, height: number, color: string): void;
}

type ColorTone = [number,number,number,number];

declare class ColorFilter extends Filter {

    constructor();

    public setBlendColor(color: string): void;

    public setBrightness(brightness: number): void;

    public setColorTone(tone: ColorTone): void;

    public setHue(hue: number);

}

declare class Point extends Point$1 {

    constructor(x: number, y: number);
}

declare class ScreenSprite extends Container {

    public opacity: number;

    constructor();

    public destroy(): void;
    
    public setBlack(): void;

    public setColor(r: number,g: number,b: number): void;

    public setWhite(): void;
}

declare type RGBArray = [number,number,number,number];

declare class Sprite extends Sprite$1 {

    public bitmap: Bitmap;
    public blendMode: number;
    public height: number;
    public opacity: number;
    public width: number;

    constructor(bitmap: Bitmap);

    public destroy(): void;
    public getBlendColor(): RGBArray
    public getColorTone(): RGBArray
    public hide(): void;
    public move(x: number, y: number): void;
    public setBlendColor(color: RGBArray): void
    public setColorTone(tone: RGBArray): void;
    public setFrame(x: number, y: number, width: number, height: number): void;
    public setHue(hue: number): void;
    public show(): void;
    public update(): void;
    public updateVisibility(): void;
}

declare class Tilemap extends Container {

    public animationCount: number;
    public flags : any[];
    public height: number;
    public horizontalWrap: boolean;
    public origin: Point;
    public verticalWrap: boolean;
    public width: number;

    constructor();

    public destroy(): void;
    public isReady(): boolean;
    public setBitmaps(bitmaps: Bitmap[]): void;
    public setData(width: number, height: number, data: any[]): void; // TODO : make sure the data is reflected?
    public update(): void;
    public updateTransform(): void;
}

declare class TillingSprite extends TilingSprite {
    
    public bitmap: Bitmap;
    public opacity: number;
    public origin: Point;
    constructor();
    public destroy(): void;
    public move(x: number, y: number, width: number, height: number): void;
    public setFrame(x:number,y:number,width: number, height: number): void;
    public update(): void;
    public updateTransform(): void;

}

declare class Weather extends Container {

    public origin: Point;
    public power: number;
    public type: string;

    constructor();

    public destroy(): void;
    public update(): void;
}

declare class WebAudio {

    public pan: number;
    public pitch: number;
    public volume: number;
    public readonly url: string
    constructor(url: string);

    public static initialize(): boolean;
    public static setMasterVolume(value: number): void;
    public addLoadListener(listner: Function): void;
    public addStopListener(listner: Function): void;

    public clear(): void;
    public destroy(): void;
    public fadeIn(duration: number): void;
    public fadeOut(duration: number): void;
    public isError(): boolean;
    public isPlaying(): boolean;
    public isReady(): boolean;
    public play(loop: boolean, offset: number): void;
    public retry(): void;
    public seek(): void;
    public stop(): void;
}

declare class Window extends Container {

    public active: boolean;
    public backOpacity: number;
    public contents: Bitmap;
    public contentsBack: Bitmap;
    public contentsOpacity: number;
    public cursorVisible: boolean;
    public downArrowVisible: boolean;
    public frameVisible: boolean;
    public height: number;
    public readonly innerHeight: number;
    public readonly innerRect: Rectangle;
    public readonly innerWidth: number;
    public margin: number;
    public opacity: number;
    public openness: number;
    public origin: Point;
    public padding: number;
    public pause: boolean;
    public upArrowVisible: boolean;
    public width: number;
    public windowskin: Bitmap;

    constructor();

    public addChildToBack(child: Container): Container;
    public addInnerChild(child: Container): Container;

    public destroy(): void;
    public drawShape(): void;
    public isClose():boolean;
    public isOpen(): boolean;
    public move(x: number,y: number, width: number, height: number): void;
    public moveCursorBy(x: number,y: number): void;
    public moveInnerChildrenBy(x: number,y: number): void;
    public setCursorRect(x: number,y: number, width: number, height: number): void;
    public setTone(r: number,g: number,b: number): void;
    public update(): void;
    public updateTransform(): void;
}

declare class WindowLayer extends Container {

    constructor();
    
    public render(renderer: Renderer): void;
    public update(): void;
}

export { Array, Bitmap, ColorFilter, Graphics, Input, JsonEx, Math, Number, Point, RPG, Rectangle, ScreenSprite, Sprite, Stage, String, Tilemap, TillingSprite, TouchInput, Utils, Video, Weather, WebAudio, Window, WindowLayer };
