import { Window_MenuStatus } from "./Window_MenuStatus";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_MenuActor
 * 
 * The window for selecting a target actor on the item and skill screens.
 */
declare class Window_MenuActor extends Window_MenuStatus {
    constructor(rect: Rectangle);

    public processOk(): void;
    public selectLast(): void;
    public selectForItem(item: Record<string, any>): void;
}

export { Window_MenuActor }