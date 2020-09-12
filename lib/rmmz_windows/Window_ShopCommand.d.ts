import { Window_HorzCommand } from "./Window_HorzCommand";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_ShopCommand
 * 
 * The window for selecting buy/sell on the shop screen.
 */
declare class Window_ShopCommand<T> extends Window_HorzCommand<T> {
    constructor(rect: Rectangle);
    public setPurchaseOnly(purchaseOnly: boolean): void;
    public maxCols(): number;
    public makeCommandList(): void;
}

export { Window_ShopCommand }