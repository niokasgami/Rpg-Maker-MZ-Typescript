import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_GameEnd
 * 
 * The window for selecting "Go to Title" on the game end screen.
 */
declare class Window_GameEnd<T> extends Window_Command<T> {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
}

export { Window_GameEnd }