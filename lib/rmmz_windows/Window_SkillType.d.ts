import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";
import { Window_SkillList } from "./Window_SkillList";

/**
 * Window_SkillType
 * 
 * The window for selecting a skill type on the skill screen.
 */
declare class Window_SkillType extends Window_Command<number> {
    constructor(rect: Rectangle);

    public setActor(actor: Game_Actor): void;
    public makeCommandList(): void;
    public update(): void;
    public setSkillWindow(skillWindow: Window_SkillList): void;
    public selectLast(): void;
}

export { Window_SkillType }