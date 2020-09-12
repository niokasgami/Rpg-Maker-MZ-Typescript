import * as PIXI from "pixi.js";

import { Bitmap, Rectangle, Point } from ".";

declare class Window extends PIXI.Container {

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

    public addChildToBack(child: PIXI.Container): PIXI.Container;
    public addInnerChild(child: PIXI.Container): PIXI.Container;

    public destroy(): void;
    public drawShape(): void;

    public isClose():boolean;
    public isOpen(): boolean;

    public move(x: number, y: number, width: number, height: number): void;
    public moveCursorBy(x: number, y: number): void;
    public moveInnerChildrenBy(x: number, y: number): void;

    public setCursorRect(x: number, y: number, width: number, height: number): void;
    public setTone(r: number, g: number, b: number): void;

    public update(): void;
    public updateTransform(): void;

}

export { Window };
