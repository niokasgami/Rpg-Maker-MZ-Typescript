import {Scene_ItemBase} from ".";
import {Window_SkillList, Window_SkillStatus, Window_SkillType} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";
import {Game_Actor} from "../rmmz_objects";

declare class Scene_Skill extends Scene_ItemBase {

    protected _skillTypeWindow: Window_SkillType;
    protected _statusWindow: Window_SkillStatus;
    protected _itemWindow: Window_SkillList;

    constructor();
    public initialize(): void;
    public create(): void;
    public start(): void;
    public createSkillTypeWindow(): void;
    public skillTypeWindowRect(): Rectangle;
    public createStatusWindow(): void;
    public statusWindowRect(): Rectangle;
    public createItemWindow(): void;
    public itemWindowRect(): Rectangle;
    public needsPageButtons(): boolean;
    public arePageButtonsEnabled(): boolean;
    public refreshActor(): void;
    public user(): Game_Actor;
    public commandSkill(): void;
    public onItemOk(): void;
    public onItemCancel(): void;
    public playSeForItem(): void;
    public useItem(): void;
    public onActorChange(): void;

}
export {Scene_Skill}