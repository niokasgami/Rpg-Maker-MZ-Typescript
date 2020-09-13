import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_ItemList
 * 
 * The window for selecting an item on the item screen.
 */
declare class Window_ItemList extends Window_Selectable {
    constructor(rect: Rectangle);

    public setCategory(category: string): void;
    public maxCols(): number;
    public colSpacing(): number;
    public maxItems(): number;
    public item(): Record<string, any>;
    public itemAt(index: number): Record<string, any>;
    public isCurrentItemEnabled(): boolean;
    public includes(item: Record<string, any>): boolean;
    public needsNumber(): boolean;
    public isEnabled(item: Record<string, any>): boolean;
    public makeItemList(): void;
    public selectLast(): void;
    public drawItem(index: number): void;
    public numberWidth(): number;
    public drawItemNumber(item: Record<string, any>, x: number, y: number, width: number): void;
    public updateHelp(): void;
    public refresh(): void;
}

export { Window_ItemList }