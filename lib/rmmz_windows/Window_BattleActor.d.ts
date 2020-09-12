import { Window_BattleStatus } from "./Window_BattleStatus";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_BattleActor
 * 
 * The window for selecting a target actor on the battle screen.
 */
declare class Window_BattleActor extends Window_BattleStatus {
    constructor(rect: Rectangle);

    public show(): void;
    public hide(): void;
    public select(index: number): void;
    public processTouch(): void;
}

export { Window_BattleActor }