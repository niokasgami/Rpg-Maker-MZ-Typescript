import { Window_Scrollable } from "./Window_Scrollable";
import { Window_Help } from "./Window_Help";

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

export {Window_Selectable}