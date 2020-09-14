import { Window_ItemList, Window_EquipStatus } from ".";

import { Rectangle } from "../rmmz_core";
import { Game_Actor } from "../rmmz_objects";

/**
 * Window_EquipItem
 * 
 * The window for selecting an equipment item on the equipment screen.
 */
declare class Window_EquipItem extends Window_ItemList {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public colSpacing(): number;
    public setActor(actor: Game_Actor): void;
    public setSlotId(slotId: number): void;
    public includes(item: Record<string, any>): boolean;
    public etypeId(): number;
    public isEnabled(/*item*/): boolean;
    public selectLast(): void;
    public setStatusWindow(statusWindow: Window_EquipStatus): void;
    public updateHelp(): void;
    public playOkSound(): void;
}

export { Window_EquipItem }