/**
 * Declaration file for rpg maker MZ 
 * @name rmmz_API
 * @author nio kasgami 
 * @version 1.00 
 * @license https://github.com/niokasgami/Rpg-Maker-MZ-Typescript/blob/master/LICENSE
 * 
 */

import { Container, Application, Rectangle as Rectangle$1, BaseTexture, Point as Point$1, Sprite as Sprite$1, TilingSprite, Renderer } from 'pixi.js';
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

    public static maxDepth: number;
    
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

    public drawText(text: string | number,x: number,y: number, maxWidth: number, lineHeight:number, align: string): void;

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


    public resize(width: number, height: number)
}

type ColorTone = [number,number,number,number];

declare class ColorFilter extends Filter {

    constructor();

    public setBlendColor(color: string): void;

    public setBrightness(brightness: number): void;

    public setColorTone(tone: ColorTone): void;

    public setHue(hue: number);
=======


    public resize(width: number, height: number)
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


//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.
// @TODO : this class still need fix.
//mport { RPG } from "./RPG";


/**
 * @todo Fix the structure.
 */
declare interface SavefileInfo {
    title: string;
    characters : any[];
    faces: any;
    playtime: string;
    timestamp: number;
}
// @Todo Assign the variable type properly.
declare interface SavefileContent {
    system: any;
    screen: any;
    timer: any;
    switches: any;
    variables: any;
    selfSwitches: any;
    actors: any;
    party: any;
    map: any;
    player: any;
}
declare class DataManager {

    constructor();

    private static _globalInfo: any; // TODO : typing for this is unclear?
    private static _errors: {name: string, src: string, url: string}[];
    
    private static _databaseFiles: {name: string, src: string}[];

    public static loadGlobalInfo(): void;

    public static removeInvalidGlobalInfo(): void;

    public static saveGlobalInfo(): void;

    public static isGlobalInfoLoaded(): boolean;

    public static loadDatabase(): void;
    
    public static loadDataFile(name: string, src: string): void;

    public static onXhrLoad(xhr : { status: number, responseText: string }, name: string, src: string, url: string): void;

    public static onXhrError(name: string, src: string, url: string): void;

    public static isDatabaseLoaded(): boolean;

    public static loadMapData(mapId: number): void;

    public static makeEmptyMap(): void;

    public static isMapLoaded(): boolean

    public static onLoad(object: Record<string, any>): void;

    public static isMapObject(object: Record<string, any>): boolean;

    public static extractArrayMetadata(array: any[]): void;
    
    public static extractMetadata(data: Record<string,any>): void;

    public static checkError(): void;

    public static isBattleTest(): boolean;
    
    public static isEventTest(): boolean;

    public static isSkill(item: Record<string, any>): boolean;

    public static isItem(item: Record<string, any>): boolean;
    
    public static isWeapon(item: Record<string, any>): boolean;
    
    public static isArmor(item: Record<string, any>): boolean;

    public static createGameObjects(): void;

    public static setupNewGame(): void;

    public static setupBattleTest(): void;

    public static setupEventTest(): void;

    public static isAnySavefileExists(): boolean;

    public static latestSavefileId(): number;

    public static earliestSavefileId(): number;

    public static emptySavefileId(): number;

    public static loadAllSavefileImages(): void;

    public static loadSavefileImages(info: SavefileInfo): void;

    public static maxSavefiles(): number;

    public static savefileInfo(savefileId: number): SavefileInfo;

    public static savefileExists(savefileId: number): boolean;

    public static saveGame(savefileId: number): Promise<number>;

    public static loadGame(savefileId: number): Promise<number>;

    public static makeSavename(savefileId: number): string;

    public static makeSavefileForNewGame(): void;

    public static makeSavefileInfo(): SavefileInfo;

    public static makeSaveContents(): SavefileContent;

    public static extractSaveContents(contents: SavefileContent): void;

    public static correctDataErrors(): void;
}

declare interface TextState{
    public text: string;
    public index: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public startX: number;
    public startY: number;
    public rtl: boolean;
    public buffer: string;
    public drawing: boolean;
    public outputWidth: number;
    public outputHeight: number;
}

/**
 * Window_Base
 * The superclass of all windows within the game.
 */
declare class Window_Base extends Window{
    constructor(rect: Rectangle);

    public destroy(options?: {
        children?: boolean;
        texture?: boolean;
        baseTexture?: boolean;
    }): void;

    public checkRectObject(rect: Rectangle): void;
    public lineHeight(): number;
    public itemWidth(): number;
    public itemHeight(): number;
    public itemPadding(): number;
    public baseTextRect(): Rectangle;
    public loadWindowskin(): void;
    public updatePadding(): void;
    public updateBackOpacity(): void;
    public fittingHeight(numLines: number): number;
    public updateTone(): void;
    public createContents(): void;
    public destroyContents(): void;
    public contentsWidth(): number;
    public contentsHeight(): number;
    public resetFontSettings(): void;
    public resetTextColor(): void;
    public update(): void;
    public updateOpen(): void;
    public updateClose(): void;
    public open(): void;
    public close(): void;
    public isOpening(): boolean;
    public isClosing(): boolean;
    public show(): void;
    public hide(): void;
    public activate(): void;
    public deactivate(): void;

    /**
     * The returned string is a color in hexadecimal format.
     * 
     * @returns {string} Pixel color (hex format).
     */
    public systemColor(): string;
    public translucentOpacity(): number;

    /**
     * Changes the text color for this window.
     * 
     * @param {string} color The color of the text in CSS format.
     */
    public changeTextColor(color: string): void;

    /**
     * Changes the outline color for this window.
     * 
     * @param {string} color The color of the outline in CSS format.
     */
    public changeOutlineColor(color: string): void;

    public changePaintOpacity(enabled: boolean): void;
    public drawRect(x: number, y: number, width: number, height: number): void;
    public drawText(text: string | number, x: number, y: number, maxWidth: number, align: string): void;
    public textWidth(text: string): number;
    public drawTextEx(text: string, x: number, y: number, width: number): number;
    public textSizeEx(text: string): { width: number, height: number };
    public createTextState(text: string, x: number, y: number, width: number): TextState;
    public processAllText(textState: TextState): void;
    public flushTextState(textState: TextState): void;
    public createTextBuffer(rtl: boolean): string;
    public convertEscapeCharacters(text: string): string;
    public actorName(n: number): string;
    public partyMemberName(n: number): string;
    public processCharacter(textState: TextState): void;
    public processControlCharacter(textState: TextState, c: string): void;
    public processNewLine(textState: TextState): void;
    public obtainEscapeCode(textState: TextState): void;
    public obtainEscapeParam(textState: TextState): number | string;
    public processEscapeCharacter(code: string, textState: TextState): void;
    public processColorChange(colorIndex: number): void;
    public processDrawIcon(iconIndex: number, textState: TextState): void;
    public makeFontBigger(): void;
    public makeFontSmaller(): void;
    public calcTextHeight(textState: TextState): number;
    public maxFontSizeInLine(line: string): number;
    public drawIcon(iconIndex: number, x: number, y: number): void;
    public drawFace(faceName: string, faceIndex: number, x: number, y: number, width: number, height: number): void;
    public drawCharacter(characterName: string, characterIndex: number, x: number, y: number): void;
    // TODO can we be more specific about the 'item' type? It looks like it can be a consumable item, a piece of equipment or a skill...
    public drawItemName(item: { iconIndex: number; name: string; description: string; }, x: number, y: number, width: number): void;
    // TODO value seems like it should be number, but is passed directly to draw text which requires a string...
    public drawCurrencyValue(value: number | string, unit: string, x: number, y: number, width: number): void;
    public setBackgroundType(type: number): void;
    public showBackgroundDimmer(): void;
    public createDimmerSprite(): void;
    public hideBackgroundDimmer(): void;
    public updateBackgroundDimmer(): void;
    public refreshDimmerBitmap(): void;
    public playCursorSound(): void;
    public playOkSound(): void;
    public playBuzzerSound(): void;
}

/**
 * Window_Scrollable
 * 
 * The window class with scroll functions.
 */
declare class Window_Scrollable extends Window_Base{
    constructor(rect: Rectangle);

    public clearScrollStatus(): void;
    public scrollX(): number;
    public scrollY(): number;
    public scrollBaseX(): number;
    public scrollBaseY(): number;
    public scrollTo(x: number, y: number): void;
    public scrollBy(x: number, y: number): void;
    public smoothScrollTo(x: number, y: number): void;
    public smoothScrollBy(x: number, y: number): void;
    public setScrollAccel(x: number, y: number): void;
    public overallWidth(): number;
    public overallHeight(): number;
    public maxScrollX(): number;
    public maxScrollY(): number;
    public scrollBlockWidth(): number;
    public scrollBlockHeight(): number;
    public smoothScrollDown(n: number): void;
    public smoothScrollUp(n: number): void;
    public update(): void;
    public processWheelScroll(): void;
    public processTouchScroll(): void;
    public isWheelScrollEnabled(): boolean;
    public isTouchScrollEnabled(): boolean;
    public isScrollEnabled(): boolean;
    public isTouchedInsideFrame(): boolean;
    public onTouchScrollStart(): void;
    public onTouchScroll(): void;
    public onTouchScrollEnd(): void;
    public updateSmoothScroll(): void;
    public updateScrollAccel(): void;
    public updateArrows(): void;
    public updateOrigin(): void;
    public updateScrollBase(baseX: number, baseY: number): void;
    public paint(): void;
}

/**
 * Window_Help
 * 
 * The window for displaying the description of the selected item.
 */
declare class Window_Help extends Window_Base{
    constructor(rect: Rectangle);

    public setText(text: string): void;
    public clear(): void;
    
    //TODO Same type as Window_Base.drawItemName(item,...);
    public setItem(item: { iconIndex: number; name: string; description: string; }): void;
    public refresh (): void;
}

/**
 * Window_Selectable
 * 
 * The window class with cursor movement functions.
 */
declare class Window_Selectable extends Window_Scrollable{
    constructor(rect: Rectangle);

    public index(): number;
    public cursorFixed(): boolean;
    public setCursorFixed(cursorFixed: boolean): void;
    public cursorAll(): boolean;
    public setCursorAll(cursorAll: boolean): void;
    public maxCols(): number;
    public maxItems(): number;
    public colSpacing(): number;
    public rowSpacing(): number;
    public itemWidth(): number;
    public itemHeight(): number;
    public contentsHeight(): number;
    public maxRows(): number;
    public overallHeight(): number;
    public activate(): void;
    public deactivate(): void;
    public select(index: number): void;
    public forceSelect(index: number): void;
    public smoothSelect(index: number): void;
    public deselect(): void;
    public reselect(): void;
    public row(): number;
    public topRow(): number;
    public maxTopRow(): number;
    public setTopRow(row: number): void;
    public maxPageRows(): number;
    public maxPageItems(): number;
    public maxVisibleItems(): number;
    public isHorizontal(): boolean;
    public topIndex(): number;
    public itemRect(index: number): Rectangle;
    public itemRectWithPadding(index: number): Rectangle;
    public itemLineRect(index: number): Rectangle;
    public setHelpWindow(helpWindow: Window_Help): void;
    public showHelpWindow(): void;
    public hideHelpWindow(): void;
    public setHandler(symbol: string, method: Function): void;
    public isHandled(symbol: string): boolean;
    public callHandler(symbol: string): void;
    public isOpenAndActive(): boolean;
    public isCursorMovable(): boolean;
    public cursorDown(wrap: boolean): void;
    public cursorUp(wrap: boolean): void;
    public cursorRight(wrap: boolean): void;
    public cursorLeft(wrap: boolean): void;
    public cursorPagedown(): void;
    public cursorPageup(): void;
    public isScrollEnabled(): boolean;
    public update(): void;
    public processCursorMove(): void;

    // TODO This method returns the values returned by processOk, processCancel, processPagedown or processPageup.
    // All of those methods return nothing. Perhaps they're accounting for sub-classes that might override??
    public processHandling(): any;
    public processTouch(): void;
    public isHoverEnabled(): boolean;
    public onTouchSelect(trigger: boolean): void;
    public onTouchOk(): void;
    public onTouchCancel(): void;
    public hitIndex(): number;
    public hitTest(x: number, y: number): number;
    public isTouchOkEnabled(): boolean;
    public isOkEnabled(): boolean;
    public isCancelEnabled(): boolean;
    public isOkTriggered(): boolean;
    public isCancelTriggered(): boolean;
    public processOk(): void;
    public callOkHandler(): void;
    public processCancel(): void;
    public callCancelHandler(): void;
    public processPageup(): void;
    public processPagedown(): void;
    public updateInputData(): void;
    public ensureCursorVisible(smooth: boolean): void;
    public callUpdateHelp(): void;
    public updateHelp(): void;

    //TODO Same type as Window_Base.drawItemName(item,...);
    public setHelpWindowItem(item: { iconIndex: number; name: string; description: string; }): void;
    public isCurrentItemEnabled(): boolean;
    public drawAllItems(): void;
    public drawItem(/*index*/): void;
    public clearItem(index: number): void;
    public drawItemBackground(index: number): void;
    public drawBackgroundRect(rect: Rectangle): void;
    public redrawItem(index: number): void;
    public redrawCurrentItem(): void;
    public refresh(): void;
    public paint(): void;
    public refreshCursor(): void;
    public refreshCursorForAll(): void;
}

/**
 * Window_ItemList
 * 
 * The window for selecting an item on the item screen.
 */
declare class Window_ItemList extends Window_Selectable {
    constructor(rect: Rectangle);

    public setCategory(category: string): void;
    public maxCols(): number;
    public colSpacing(): number;
    public maxItems(): number;
    public item(): Record<string, any>;
    public itemAt(index: number): Record<string, any>;
    public isCurrentItemEnabled(): boolean;
    public includes(item: Record<string, any>): boolean;
    public needsNumber(): boolean;
    public isEnabled(item: Record<string, any>): boolean;
    public makeItemList(): void;
    public selectLast(): void;
    public drawItem(index: number): void;
    public numberWidth(): number;
    public drawItemNumber(item: Record<string, any>, x: number, y: number, width: number): void;
    public updateHelp(): void;
    public refresh(): void;
}

/**
 * Window_BattleItem
 * 
 * The window for selecting an item to use on the battle screen.
 */
declare class Window_BattleItem extends Window_ItemList {
    constructor(rect: Rectangle);
    public includes(item: Record<string, any>): boolean;
    public show(): void;
    public hide(): void;
}

declare interface Command<T> {
    public name: string;
    public symbol: string;
    public enabled: boolean;
    public ext: T;
}

/**
 * Window_Command
 * 
 * The superclass of windows for selecting a command.
 */
declare class Window_Command<T> extends Window_Selectable {
    constructor(rect: Rectangle);

    public maxItems(): number;
    public clearCommandList(): void;
    public makeCommandList(): void;
    public addCommand(name: string, symbol: string, enabled = true, ext: T = null): void;
    public commandName(index: number): string;
    public commandSymbol(index: number): string;
    public isCommandEnabled(index: number): boolean;
    public currentData(): Command<T>;
    public isCurrentItemEnabled(): boolean;
    public currentSymbol(): string;
    public currentExt(): T;
    public findSymbol(symbol: string): number;
    public selectSymbol(symbol: string): void;
    public findExt(ext: T): number;
    public selectExt(ext: T): void;
    public drawItem(index: number): void;
    public itemTextAlign(): string;
    public isOkEnabled(): boolean;
    public callOkHandler(): void;
    public refresh(): void;
}

/**
 * Window_Gold
 * 
 * The window for displaying the party's gold.
 */
declare class Window_Gold extends Window_Selectable {
    constructor(rect: Rectangle);

    public colSpacing(): number;
    public refresh(): void;
    public value(): number;
    public currencyUnit(): string;
    public open(): void;
}

/**
 * Window_NameBox
 * 
 * The window for displaying a speaker name above the message window.
 */
declare class Window_NameBox extends Window_Base {
    constructor();
    public setMessageWindow(messageWindow: Window_Message): void;
    public setName(name: string): void;
    public clear(): void;
    public start(): void;
    public updatePlacement(): void;
    public updateBackground(): void;
    public windowWidth(): number;
    public windowHeight(): number;
    public refresh(): void;
}

/**
 * Window_NumberInput
 * 
 * The window used for the event command [Input Number].
 */
declare class Window_NumberInput extends Window_Selectable {
    constructor();
    public setMessageWindow(messageWindow: Window_Message): void;
    public start(): void;
    public updatePlacement(): void;
    public windowWidth(): number;
    public windowHeight(): number;
    public maxCols(): number;
    public maxItems(): number;
    public itemWidth(): number;
    public itemRect(index: number): Rectangle;
    public isScrollEnabled(): boolean;
    public isHoverEnabled(): boolean;
    public createButtons(): void;
    public placeButtons(): void;
    public totalButtonWidth(): number;
    public buttonSpacing(): number;
    public buttonY(): number;
    public update(): void;
    public processDigitChange(): void;
    public changeDigit(up: boolean): void;
    public isTouchOkEnabled(): boolean;
    public isOkEnabled(): boolean;
    public isCancelEnabled(): boolean;
    public processOk(): void;
    public drawItem(index: number): void;
    public onButtonUp(): void;
    public onButtonDown(): void;
    public onButtonOk(): void;
}

/**
 * Window_EventItem
 * 
 * The window used for the event command [Select Item].
 */
declare class Window_EventItem extends Window_ItemList {
    constructor(rect: Rectangle);
    public setMessageWindow(messageWindow: Window_Message): void;
    public createCancelButton(): void;
    public start(): void;
    public update(): void;
    public updateCancelButton(): void;
    public updatePlacement(): void;
    public placeCancelButton(): void;
    public includes(item: Record<string, any>): boolean;
    public needsNumber(): boolean;
    public isEnabled(/*item*/): boolean;
    public onOk(): void;
    public onCancel(): void;
}

/**
 * Window_Message
 * 
 * The window for displaying text messages.
 */
declare class Window_Message extends Window_Base {
    constructor(rect: Rectangle);
    public initMembers(): void;
    public setGoldWindow(goldWindow: Window_Gold): void;
    public setNameBoxWindow(nameBoxWindow: Window_NameBox): void;
    public setChoiceListWindow(choiceListWindow: Window_ChoiceList): void;
    public setNumberInputWindow(numberInputWindow: Window_NumberInput): void;
    public setEventItemWindow(eventItemWindow: Window_EventItem): void;
    public clearFlags(): void;
    public update(): void;
    public checkToNotClose(): void;
    public synchronizeNameBox(): void;
    public canStart(): boolean;
    public startMessage(): void;
    public newLineX(textState: TextState): number;
    public updatePlacement(): void;
    public updateBackground(): void;
    public terminateMessage(): void;
    public updateWait(): boolean;
    public updateLoading(): boolean;
    public updateInput(): boolean;
    public isAnySubWindowActive(): boolean;
    public updateMessage(): boolean;
    public shouldBreakHere(textState: TextState): boolean;
    public canBreakHere(textState: TextState): boolean;
    public onEndOfText(): void;
    public startInput(): boolean;
    public isTriggered(): boolean;
    public doesContinue(): boolean;
    public areSettingsChanged(): boolean;
    public updateShowFast(): void;
    public newPage(textState: TextState): void;
    public updateSpeakerName(): void;
    public loadMessageFace(): void;
    public drawMessageFace(): void;
    public processControlCharacter(textState: TextState, c: string): void;
    public processNewLine(textState: TextState): void;
    public processNewPage(textState: TextState): void;
    public isEndOfText(textState: TextState): boolean;
    public needsNewPage(textState: TextState): boolean;
    public processEscapeCharacter(code: string, textState: TextState): void;
    public startWait(count: number): void;
    public startPause(): void;
}

/**
 * Window_ChoiceList
 * 
 * The window used for the event command [Show Choices].
 */
declare class Window_ChoiceList<T> extends Window_Command<T> {
    constructor();
    public setMessageWindow(messageWindow: Window_Message): void;
    public createCancelButton(): void;
    public start(): void;
    public update(): void;
    public updateCancelButton(): void;
    public selectDefault(): void;
    public updatePlacement(): void;
    public updateBackground(): void;
    public placeCancelButton(): void;
    public windowX(): number;
    public windowY(): number;
    public windowWidth(): number;
    public windowHeight(): number;
    public numVisibleRows(): number;
    public maxLines(): number;
    public maxChoiceWidth(): number;
    public makeCommandList(): void;
    public drawItem(index: number): void;
    public isCancelEnabled(): boolean;
    public needsCancelButton(): boolean;
    public callOkHandler(): void;
    public callCancelHandler(): void;
}

/**
 * Window_DebugEdit
 * 
 * The window for displaying switches and variables on the debug screen.
 */
declare class Window_DebugEdit extends Window_Selectable {
    constructor(rect: Rectangle);
    public maxItems(): number;
    public drawItem(index: number): void;
    public itemName(dataId: string): string;
    public itemStatus(dataId: string): string;
    public setMode(mode: string): void;
    public setTopId(id: number): void;
    public currentId(): number;
    public update(): void;
    public updateSwitch(): void;
    public updateVariable(): void;
    public deltaForVariable(): number;
}

/**
 * Window_DebugRange
 * 
 * The window for selecting a block of switches/variables on the debug screen.
 */
declare class Window_DebugRange extends Window_Selectable {
    constructor(rect: Rectangle);

    public static lastTopRow: number;
    public static lastIndex: number;

    public maxItems(): number;
    public update(): void;
    public mode(index: number): string;
    public topId(index: number): number;
    public isSwitchMode(index: number): boolean;
    public drawItem(index: number): void;
    public isCancelTriggered(): boolean;
    public processCancel(): void;
    public setEditWindow(editWindow: Window_DebugEdit): void;
}

/**
 * Window_HorzCommand
 * 
 * The command window for the horizontal selection format.
 */
declare class Window_HorzCommand<T> extends Window_Command<T> {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public itemTextAlign(): string;
}

/**
 * Window_EquipCommand
 * 
 * The window for selecting a command on the equipment screen.
 */
declare class Window_EquipCommand<T> extends Window_HorzCommand<T> {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public makeCommandList(): void;
}

/**
 * Window_GameEnd
 * 
 * The window for selecting "Go to Title" on the game end screen.
 */
declare class Window_GameEnd<T> extends Window_Command<T> {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
}

/**
 * Window_ItemCategory
 * 
 * The window for selecting a category of items on the item and shop screens.
 */
declare class Window_ItemCategory<T> extends Window_HorzCommand<T> {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public update(): void;
    public makeCommandList(): void;
    public needsCommand(name): boolean;
    public setItemWindow(itemWindow: Window_ItemList): void;
    public needsSelection(): boolean;
}

/**
 * Window_MapName
 * 
 * The window for displaying the map name on the map screen.
 */
declare class Window_MapName extends Window_Base {
    constructor(rect: Rectangle);
    public update(): void;
    public updateFadeIn(): void;
    public updateFadeOut(): void;
    public open(): void;
    public close(): void;
    public refresh(): void;
    public drawBackground(x: number, y: number, width: number, height: number): void;
}

/**
 * Window_MenuCommand
 * 
 * The window for selecting a command on the menu screen.
 */
declare class Window_MenuCommand<T> extends Window_Command<T>{
    constructor(rect: Rectangle);

    public static initCommandPosition(): void;

    public makeCommandList(): void;
    public addMainCommands(): void;
    public addFormationCommand(): void;
    public addOriginalCommands(): void;
    public addOptionsCommand(): void;
    public addSaveCommand(): void;
    public addGameEndCommand(): void;
    public needsCommand(name: string): boolean;
    public areMainCommandsEnabled(): boolean;
    public isFormationEnabled(): boolean;
    public isOptionsEnabled(): boolean;
    public isSaveEnabled(): boolean;
    public isGameEndEnabled(): boolean;
    public processOk(): void;
    public selectLast(): void;
}

/**
 * Window_Options
 * 
 * The window for changing various settings on the options screen.
 */
declare class Window_Options<T> extends Window_Command<T> {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
    public addGeneralOptions(): void;
    public addVolumeOptions(): void;
    public drawItem(index: number): void;
    public statusWidth(): number;
    public statusText(index: number): string;
    public isVolumeSymbol(symbol: string): boolean;
    public booleanStatusText(value: boolean): string;
    public volumeStatusText(value: number): string;
    public processOk(): void;
    public cursorRight(): void;
    public cursorLeft(): void;
    public changeVolume(symbol: string, forward: boolean, wrap: boolean): void;
    public volumeOffset(): number;
    public changeValue(symbol: string, value: unknown): void;
    public getConfigValue(symbol: string): unknown;
    public setConfigValue(symbol: string, volume: unknown): void;
}

/**
 * Window_PartyCommand
 * 
 * The window for selecting whether to fight or escape on the battle screen.
 */
declare class Window_PartyCommand<T> extends Window_Command<T> {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
    public setup(): void;
}

/**
 * Window_SavefileList
 * 
 * The window for selecting a save file on the save and load screens.
 */
declare class Window_SavefileList extends Window_Selectable {
    constructor(rect: Rectangle);
    public setMode(mode: string, autosave: boolean): void;
    public maxItems(): number;
    public numVisibleRows(): number;
    public itemHeight(): number;
    public drawItem(index: number): void;
    public indexToSavefileId(index: number): number;
    public savefileIdToIndex(savefileId: number): number;
    public isEnabled(savefileId: number): boolean;
    public savefileId(): number;
    public selectSavefile(savefileId: number): void;
    public drawTitle(savefileId: number, x: number, y: number): void;
    public drawContents(info: SavefileInfo, rect: Rectangle): void;
    public drawPartyCharacters(info: SavefileInfo, x: number, y: number): void;
    public drawPlaytime(info: SavefileInfo, x: number, y: number, width: number): void;
    public playOkSound(): void;
}

/**
 * Window_ScrollText
 * 
 * The window for displaying scrolling text. No frame is displayed, but it
 * is handled as a window for convenience.
 */
declare class Window_ScrollText extends Window_Base {
    constructor(rect: Rectangle);
    public update(): void;
    public startMessage(): void;
    public refresh(): void;
    public updatePlacement(): void;
    public contentsHeight(): number;
    public updateMessage(): void;
    public scrollSpeed(): number;
    public isFastForward(): boolean;
    public fastForwardRate(): number;
    public terminateMessage(): void;
}

/**
 * Window_ShopCommand
 * 
 * The window for selecting buy/sell on the shop screen.
 */
declare class Window_ShopCommand<T> extends Window_HorzCommand<T> {
    constructor(rect: Rectangle);
    public setPurchaseOnly(purchaseOnly: boolean): void;
    public maxCols(): number;
    public makeCommandList(): void;
}

/**
 * Window_ShopNumber
 * 
 * The window for inputting quantity of items to buy or sell on the shop
 * screen.
 */
declare class Window_ShopNumber extends Window_Selectable {
    constructor(rect: Rectangle);
    public isScrollEnabled(): boolean;
    public number(): number;
    public setup(item: Record<string, any>, max: number, price: number): void;
    public setCurrencyUnit(currencyUnit: string): void;
    public createButtons(): void;
    public placeButtons(): void;
    public totalButtonWidth(): number;
    public buttonSpacing(): number;
    public refresh(): void;
    public drawCurrentItemName(): void;
    public drawMultiplicationSign(): void;
    public multiplicationSign(): string;
    public multiplicationSignX(): number;
    public drawNumber(): void;
    public drawHorzLine(): void;
    public drawTotalPrice(): void;
    public itemNameY(): number;
    public totalPriceY(): number;
    public buttonY(): number;
    public cursorWidth(): number;
    public cursorX(): number;
    public maxDigits(): number;
    public update(): void;
    public playOkSound(): void;
    public processNumberChange(): void;
    public changeNumber(amount: number): void;
    public itemRect(): Rectangle;
    public isTouchOkEnabled(): boolean;
    public onButtonUp(): void;
    public onButtonUp2(): void;
    public onButtonDown(): void;
    public onButtonDown2(): void;
    public onButtonOk(): void;
}

/**
 * Window_ShopSell
 * 
 * The window for selecting an item to sell on the shop screen.
 */
declare class Window_ShopSell extends Window_ItemList {
    constructor(rect: Rectangle);
    public isEnabled(item: Record<string, any>): boolean;
}

/**
 * Window_TitleCommand
 * 
 * The window for selecting New Game/Continue on the title screen.
 */
declare class Window_TitleCommand<T> extends Window_Command<T> {
    constructor(rect: Rectangle);
    public static initCommandPosition(): void;
    public makeCommandList(): void;
    public isContinueEnabled(): boolean;
    public processOk(): void;
    public selectLast(): void;
}

export { Array, Bitmap, ColorFilter, Command, DataManager, Graphics, Input, JsonEx, Math, Number, Point, RPG, Rectangle, SavefileContent, SavefileInfo, ScreenSprite, Sprite, Stage, String, TextState, Tilemap, TillingSprite, TouchInput, Utils, Video, Weather, WebAudio, Window, WindowLayer, Window_Base, Window_BattleItem, Window_ChoiceList, Window_Command, Window_DebugEdit, Window_DebugRange, Window_EquipCommand, Window_EventItem, Window_GameEnd, Window_Gold, Window_Help, Window_HorzCommand, Window_ItemCategory, Window_ItemList, Window_MapName, Window_MenuCommand, Window_Message, Window_NameBox, Window_NumberInput, Window_Options, Window_PartyCommand, Window_SavefileList, Window_ScrollText, Window_Scrollable, Window_Selectable, Window_ShopCommand, Window_ShopNumber, Window_ShopSell, Window_TitleCommand };

export { Array, Bitmap, Graphics, Input, JsonEx, Math, Number, Point, RPG, Rectangle, ScreenSprite, Sprite, Stage, String, Tilemap, TillingSprite, TouchInput, Utils, Video, Weather, WebAudio, Window, WindowLayer };

