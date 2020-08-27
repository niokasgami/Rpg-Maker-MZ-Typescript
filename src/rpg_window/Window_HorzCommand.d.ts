import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rpg_core/Rectangle";

/**
 * Window_HorzCommand
 * 
 * The command window for the horizontal selection format.
 */
declare class Window_HorzCommand extends Window_Command {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public itemTextAlign(): string;
}

export { Window_HorzCommand }