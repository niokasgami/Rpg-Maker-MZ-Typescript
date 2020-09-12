import { Window_HorzCommand } from "./Window_HorzCommand";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_ItemList } from "./Window_ItemList";

/**
 * Window_ItemCategory
 * 
 * The window for selecting a category of items on the item and shop screens.
 */
declare class Window_ItemCategory<T> extends Window_HorzCommand<T> {
    constructor(rect: Rectangle);

    public maxCols(): number;
    public update(): void;
    public makeCommandList(): void;
    public needsCommand(name): boolean;
    public setItemWindow(itemWindow: Window_ItemList): void;
    public needsSelection(): boolean;
}

export { Window_ItemCategory }