import { Window_ItemList } from "./Window_ItemList";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_BattleItem
 * 
 * The window for selecting an item to use on the battle screen.
 */
declare class Window_BattleItem extends Window_ItemList {
    constructor(rect: Rectangle);
    public includes(item: Record<string, any>): boolean;
    public show(): void;
    public hide(): void;
}

export { Window_BattleItem }