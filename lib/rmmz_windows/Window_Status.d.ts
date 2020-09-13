import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";

/**
 * Window_Status
 * 
 * The window for displaying full status on the status screen.
 */
declare class Window_Status extends Window_StatusBase {
    constructor(rect: Rectangle);

    public setActor(actor: Game_Actor): void;
    public refresh(): void;
    public drawBlock1(): void;
    public block1Y(): number;
    public drawBlock2(): void;
    public block2Y(): number;
    public drawBasicInfo(x: number, y: number): void;
    public drawExpInfo(x: number, y: number): void;
    /**
     * Only returns a string if the actor set through setActor
     * is at max level, otherwise return experience points as a number.
     */
    public expTotalValue(): number | string;
    /**
     * Only returns a string if the actor set through setActor
     * is at max level, otherwise return experience points as a number.
     */
    public expNextValue(): number | string;
}

export { Window_Status }