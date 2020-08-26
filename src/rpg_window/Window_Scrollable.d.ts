import { Window_Base } from "./Window_Base";
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

export {Window_Scrollable}