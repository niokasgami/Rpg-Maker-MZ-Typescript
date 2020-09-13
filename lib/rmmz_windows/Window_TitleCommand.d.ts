import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";

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

export { Window_TitleCommand }