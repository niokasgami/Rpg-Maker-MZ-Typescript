import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rpg_object/Game_Actor";

/**
 * Window_ActorCommand
 * 
 * The window for selecting an actor's action on the battle screen.
 */
declare class Window_ActorCommand extends Window_Command<number> {
    constructor(rect: Rectangle);

    public makeCommandList(): void;
    public addAttackCommand(): void;
    public addSkillCommands(): void;
    public addGuardCommand(): void;
    public addItemCommand(): void;
    public setup(actor: Game_Actor): void;
    public actor(): Game_Actor;
    public processOk(): void;
    public selectLast(): void;
}

export { Window_ActorCommand }