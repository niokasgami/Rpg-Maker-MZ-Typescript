import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rpg_object/Game_Actor";

/**
 * Window_BattleStatus
 * 
 * The window for displaying the status of party members on the battle screen.
 */
declare class Window_BattleStatus extends Window_StatusBase {
    constructor(rect: Rectangle);
    public extraHeight(): number;
    public maxCols(): number;
    public itemHeight(): number;
    public maxItems(): number;
    public rowSpacing(): number;
    public updatePadding(): void;
    public actor(index: number): Game_Actor;
    public selectActor(actor: Game_Actor): void;
    public update(): void;
    public preparePartyRefresh(): void;
    public performPartyRefresh(): void;
    public drawItem(index: number): void;
    public drawItemImage(index: number): void;
    public drawItemStatus(index: number): void;
    public faceRect(index: number): Rectangle;
    public nameX(rect: Rectangle): number;
    public nameY(rect: Rectangle): number;
    public stateIconX(rect: Rectangle): number;
    public stateIconY(rect: Rectangle): number;
    public basicGaugesX(rect: Rectangle): number;
    public basicGaugesY(rect: Rectangle): number;
}

export { Window_BattleStatus }