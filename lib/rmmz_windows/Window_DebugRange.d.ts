import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_DebugEdit } from "./Window_DebugEdit";

/**
 * Window_DebugRange
 * 
 * The window for selecting a block of switches/variables on the debug screen.
 */
declare class Window_DebugRange extends Window_Selectable {
    constructor(rect: Rectangle);

    public static lastTopRow: number;
    public static lastIndex: number;

    public maxItems(): number;
    public update(): void;
    public mode(index: number): string;
    public topId(index: number): number;
    public isSwitchMode(index: number): boolean;
    public drawItem(index: number): void;
    public isCancelTriggered(): boolean;
    public processCancel(): void;
    public setEditWindow(editWindow: Window_DebugEdit): void;
}

export { Window_DebugRange }