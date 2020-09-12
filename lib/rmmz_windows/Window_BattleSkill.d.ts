import { Window_SkillList } from "./Window_SkillList";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_BattleSkill
 * 
 * The window for selecting a skill to use on the battle screen.
 */
declare class Window_BattleSkill extends Window_SkillList {
    constructor(rect: Rectangle);
    public show(): void;
    public hide(): void;
}

export { Window_BattleSkill }