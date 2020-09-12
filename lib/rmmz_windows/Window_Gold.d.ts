import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_Gold
 * 
 * The window for displaying the party's gold.
 */
declare class Window_Gold extends Window_Selectable {
    constructor(rect: Rectangle);

    public colSpacing(): number;
    public refresh(): void;
    public value(): number;
    public currencyUnit(): string;
    public open(): void;
}

export { Window_Gold }