import { Window_ItemList } from "./Window_ItemList";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_Message } from "./Window_Message";

/**
 * Window_EventItem
 * 
 * The window used for the event command [Select Item].
 */
declare class Window_EventItem extends Window_ItemList {
    constructor(rect: Rectangle);
    public setMessageWindow(messageWindow: Window_Message): void;
    public createCancelButton(): void;
    public start(): void;
    public update(): void;
    public updateCancelButton(): void;
    public updatePlacement(): void;
    public placeCancelButton(): void;
    public includes(item: Record<string, any>): boolean;
    public needsNumber(): boolean;
    public isEnabled(/*item*/): boolean;
    public onOk(): void;
    public onCancel(): void;
}

export { Window_EventItem }