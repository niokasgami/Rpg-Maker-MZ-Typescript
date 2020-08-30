import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rpg_core/Rectangle";

/**
 * Window_PartyCommand
 * 
 * The window for selecting whether to fight or escape on the battle screen.
 */
declare class Window_PartyCommand extends Window_Command {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
    public setup(): void;
}

export { Window_PartyCommand }