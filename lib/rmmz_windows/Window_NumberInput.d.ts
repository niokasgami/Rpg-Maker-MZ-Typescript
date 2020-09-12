import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_Message } from "./Window_Message";

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

export { Window_NumberInput }