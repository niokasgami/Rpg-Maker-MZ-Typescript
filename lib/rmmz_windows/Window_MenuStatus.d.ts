import { Window_StatusBase } from ".";

import { Rectangle } from "rmmz_core";
import { Game_Actor } from "rmmz_objects";

/**
 * Window_MenuStatus
 * 
 * The window for displaying party member status on the menu screen.
 */
declare class Window_MenuStatus extends Window_StatusBase {
    constructor(rect: Rectangle);

    public maxItems(): number;
    public numVisibleRows(): number;
    public itemHeight(): number;
    public actor(index: number): Game_Actor;
    public drawItem(index: number): void;
    public drawPendingItemBackground(index: number): void;
    public drawItemImage(index: number): void;
    public drawItemStatus(index: number): void;
    public processOk(): void;
    public isCurrentItemEnabled(): boolean;
    public selectLast(): void;
    public formationMode(): boolean;
    public setFormationMode(formationMode: boolean): void;
    public pendingIndex(): number;
    public setPendingIndex(index: number): void;
}

export { Window_MenuStatus }