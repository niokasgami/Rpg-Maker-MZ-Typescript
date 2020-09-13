/* eslint-disable @typescript-eslint/ban-types */
import { Sprite_Clickable } from "./Sprite_Clickable";
import { Rectangle } from "../rmmz_core";

declare interface ButtonTable {
    cancel: { x: 0, w: 2 },
    pageup: { x: 2, w: 1 },
    pagedown: { x: 3, w: 1 },
    down: { x: 4, w: 1 },
    up: { x: 5, w: 1 },
    down2: { x: 6, w: 1 },
    up2: { x: 7, w: 1 },
    ok: { x: 8, w: 2 },
    menu: { x: 10, w: 1 }
}
declare class Sprite_Button extends Sprite_Clickable {

    private _buttonType: string;
    private _clickHandler: Function;
    private _coldFrame: Rectangle;
    private _hotFrame: Rectangle;

    constructor(buttonType: string);

    public initialize(buttonType: string): void;
    public setupFrame(): void;
    public blockWidth(): number;
    public blockHeight(): number;
    public loadButtomImage(): void;
    public buttonData(): ButtonTable;
    public update(): void;
    public checkBitmap(): void;
    public updateFrame(): void;
    public updateOpacity(): void;
    public setColdFrame(x: number,y: number, width: number, height: number): void;
    public setHotFrame(x: number,y: number,width: number,height: number): void;
    public setClickHandler(method: Function): void;
    public onClick(): void;

}

export { Sprite_Button, ButtonTable }