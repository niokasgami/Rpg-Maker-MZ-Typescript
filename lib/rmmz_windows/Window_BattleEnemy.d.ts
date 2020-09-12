import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";

/**
 * Window_BattleEnemy
 * 
 * The window for selecting a target enemy on the battle screen.
 */
declare class Window_BattleEnemy extends Window_Selectable {
    constructor(rect: Rectangle);
    public maxCols(): number;
    public maxItems(): number;
    public enemy(): Game_Actor;
    public enemyIndex(): number;
    public drawItem(index: number): void;
    public show(): void;
    public hide(): void;
    public refresh(): void;
    public select(index: number): void;
    public processTouch(): void;
}

export { Window_BattleEnemy }