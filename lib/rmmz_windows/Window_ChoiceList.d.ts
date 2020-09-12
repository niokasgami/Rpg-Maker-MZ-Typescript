import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_Message } from "./Window_Message";

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

export { Window_ChoiceList }