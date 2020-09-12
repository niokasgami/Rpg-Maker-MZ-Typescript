import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";

/**
 * Window_StatusEquip
 * 
 * The window for displaying equipment items on the status screen.
 */
declare class Window_StatusEquip extends Window_StatusBase {
    constructor(rect: Rectangle);
    public setActor(actor: Game_Actor): void;
    public maxItems(): number;
    public itemHeight(): number;
    public drawItem(index: number): void;
    public drawItemBackground(/*index*/): void;
}

export { Window_StatusEquip }