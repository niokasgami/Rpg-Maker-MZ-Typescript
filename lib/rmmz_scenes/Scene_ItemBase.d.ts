import {Scene_MenuBase} from ".";
import {
    Window_BattleItem,
    Window_EquipItem,
    Window_ItemList,
    Window_MenuActor,
    Window_SkillList
} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";


type ItemWindowType = Window_ItemList | Window_SkillList | Window_EquipItem | Window_BattleItem;

declare class Scene_ItemBase extends Scene_MenuBase {

    protected _actorWindow: Window_MenuActor;
    protected _itemWindow: ItemWindowType;

    constructor(...arguments: never[]);

    public initialize(): void;

    public create(): void;

    public createActorWindow(): void;

    public actorWindowRect(): Rectangle;

    // TODO : fixe the typing to be more exact? (we can override based on the class.
    public item(): Record<string, any>;

    public user(): unknown[] | unknown;

    public isCursorLeft(): boolean;

    public showActorWindow(): void;

    public hideActorWindow(): void;

    public isActorWindowActive(): boolean;

    public onActorOk(): void;

    public onActorCancel(): void

    public determineItem(): void;

    public useItem(): void;

    public activateItemWindow(): void;

    public itemTargetActors(): any; // TODO : I am unsure how to type this section.
    public canUse(): boolean;

    public isItemEffectsValid(): boolean;

    public applyItem(): void;

    public checkCommonEvent(): void;
}

export {Scene_ItemBase}