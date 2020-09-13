import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_HorzCommand
 * 
 * The command window for the horizontal selection format.
 */
declare class Window_HorzCommand<T> extends Window_Command<T> {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public itemTextAlign(): string;
}

export { Window_HorzCommand }