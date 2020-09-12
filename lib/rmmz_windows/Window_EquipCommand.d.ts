import { Window_HorzCommand } from "./Window_HorzCommand";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_EquipCommand
 * 
 * The window for selecting a command on the equipment screen.
 */
declare class Window_EquipCommand<T> extends Window_HorzCommand<T> {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public makeCommandList(): void;
}

export { Window_EquipCommand }