import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rpg_core/Rectangle";

/**
 * Window_GameEnd
 * 
 * The window for selecting "Go to Title" on the game end screen.
 */
declare class Window_GameEnd extends Window_Command {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
}

export { Window_GameEnd }