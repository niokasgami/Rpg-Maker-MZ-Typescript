import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_DebugEdit
 * 
 * The window for displaying switches and variables on the debug screen.
 */
declare class Window_DebugEdit extends Window_Selectable {
    constructor(rect: Rectangle);
    public maxItems(): number;
    public drawItem(index: number): void;
    public itemName(dataId: string): string;
    public itemStatus(dataId: string): string;
    public setMode(mode: string): void;
    public setTopId(id: number): void;
    public currentId(): number;
    public update(): void;
    public updateSwitch(): void;
    public updateVariable(): void;
    public deltaForVariable(): number;
}

export { Window_DebugEdit }