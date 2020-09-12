import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rpg_object/Game_Actor";
import { Game_Item } from "../rpg_object/Game_Item";

/**
 * Window_ShopStatus
 * 
 * The window for displaying number of items in possession and the actor's
 * equipment on the shop screen.
 */
declare class Window_ShopStatus extends Window_StatusBase {
    constructor(rect: Rectangle);
    public refresh(): void;
    public setItem(item: Record<string, any>): void;
    public isEquipItem(): boolean;
    public drawPossession(x: number, y: number): void;
    public drawEquipInfo(x: number, y: number): void;
    public statusMembers(): Game_Actor[];
    public pageSize(): number;
    public maxPages(): number;
    public drawActorEquipInfo(x: number, y: number, actor: Game_Actor): void;
    public drawActorParamChange(x: number, y: number, actor: Game_Actor, item1: Game_Item): void;
    public paramId(): number;
    public currentEquippedItem(actor: Game_Actor, etypeId: number): Game_Item;
    public update(): void;
    public updatePage(): void;
    public isPageChangeEnabled(): boolean;
    public isPageChangeRequested(): boolean;
    public changePage(): void;
}

export { Window_ShopStatus }