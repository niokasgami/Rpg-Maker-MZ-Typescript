import {Scene_MenuBase} from ".";
import {Window_EquipCommand, Window_EquipItem, Window_EquipSlot, Window_EquipStatus} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";



declare class Scene_Equip extends Scene_MenuBase {

    protected _statusWindow: Window_EquipStatus;
    protected _commandWindow: Window_EquipCommand<any>;
    protected _slotWindow: Window_EquipSlot;
    protected _itemWindow: Window_EquipItem;
    
    constructor();
    public initialize(): void;
    public create(): void;
    public createStatusWindow(): void;
    public statusWindowRect(): Rectangle;
    public createCommandWindow(): void;
    public commandWindowRect(): Rectangle;
    public createSlotWindow(): void;
    public slotWindowRect(): Rectangle;
    public createItemWindow(): void;
    public itemWindowRect(): Rectangle;
    public statusWidth(): number;
    public needsPageButtons(): boolean;
    public arePageButtonsEnabled(): boolean;
    public refreshActor(): void;
    public commandEquip(): void;
    public commandOptimize(): void;
    public commandClear(): void;
    public onSlotOk(): void ;
    public onSlotCancel(): void;
    public onItemOk(): void ;
    public executeEquipChange(): void;
    public onItemCancel(): void;
    public onActorChange(): void;
    public hideItemWindow(): void;
}
export {Scene_Equip}
