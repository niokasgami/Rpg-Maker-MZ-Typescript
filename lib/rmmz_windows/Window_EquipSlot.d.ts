import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";

/**
 * Window_EquipSlot
 * 
 * The window for selecting an equipment slot on the equipment screen.
 */
declare class Window_EquipSlot extends Window_StatusBase {
    constructor(rect: Rectangle);

    public setActor(actor: Game_Actor): void;
    public update(): void;
    public maxItems(): number;
    public item(): Record<string, any>;
    public itemAt(index: number): Record<string, any>;
    public drawItem(index: number): void;
    public slotNameWidth(): number;
    public isEnabled(index: number): boolean;
    public isCurrentItemEnabled(): boolean;
    public setStatusWindow(statusWindow: Window_EquipStatus): void;
    public setItemWindow(itemWindow: Window_EquipItem): void;
    public updateHelp(): void;
}

export { Window_EquipSlot }