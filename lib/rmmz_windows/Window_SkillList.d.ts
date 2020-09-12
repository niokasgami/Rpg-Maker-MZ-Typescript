import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core";
import { Game_Actor } from "../rmmz_objects";

/**
 * Window_SkillList
 * 
 * The window for selecting a skill on the skill screen.
 * This class is a bit misleading, as all of the 'items'
 * in it are actually skills.
 */
declare class Window_SkillList extends Window_Selectable {
    constructor(rect: Rectangle);

    public setActor(actor: Game_Actor): void;
    public setStypeId(stypeId: number): void;
    public maxCols(): number;
    public colSpacing(): number;
    public maxItems(): number;
    public item(): Record<string, any>;
    public itemAt(index: number): Record<string, any>;
    public isCurrentItemEnabled(): boolean;
    public includes(item: Record<string, any>): boolean;
    public isEnabled(item: Record<string, any>): boolean;
    public makeItemList(): void;
    public selectLast(): void;
    public drawItem(index: number): void;
    public costWidth(): number;
    public drawSkillCost(skill: Record<string, any>, x: number, y: number, width: number): void;
    public updateHelp(): void;
    public refresh(): void;
}

export { Window_SkillList }