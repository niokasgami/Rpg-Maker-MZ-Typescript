import { Window_ItemList } from "./Window_ItemList";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_ShopSell
 * 
 * The window for selecting an item to sell on the shop screen.
 */
declare class Window_ShopSell extends Window_ItemList {
    constructor(rect: Rectangle);
    public isEnabled(item: Record<string, any>): boolean;
}

export { Window_ShopSell }