import { Window_HorzCommand } from "./Window_HorzCommand";
import { Rectangle } from "../rpg_core/Rectangle";

/**
 * Window_EquipCommand
 * 
 * The window for selecting a command on the equipment screen.
 */
declare class Window_EquipCommand extends Window_HorzCommand {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public makeCommandList(): void;
}

export { Window_EquipCommand }