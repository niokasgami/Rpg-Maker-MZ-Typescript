import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_ShopStatus } from "./Window_ShopStatus";

/**
 * Window_ShopBuy
 * 
 * The window for selecting an item to buy on the shop screen.
 */
declare class Window_ShopBuy extends Window_Selectable {
    constructor(rect: Rectangle);
    public setupGoods(shopGoods: number[][]): void;
    public maxItems(): number;
    public item(): Record<string, any>;
    public itemAt(index: number): Record<string, any>;
    public setMoney(money: number): void;
    public isCurrentItemEnabled(): boolean;
    public price(item: Record<string, any>): number;
    public isEnabled(item: Record<string, any>): boolean;
    public refresh(): void;
    public makeItemList(): void;
    public goodsToItem(goods: number[]): Record<string, any>;
    public drawItem(index: number): void;
    public priceWidth(): void;
    public setStatusWindow(statusWindow: Window_ShopStatus): void;
    public updateHelp(): void;
}

export { Window_ShopBuy }