import { Window_StatusBase } from ".";

import { Rectangle } from "rmmz_core";
import { Game_Actor } from "rmmz_objects";

/**
 * Window_EquipStatus
 * 
 * The window for displaying parameter changes on the equipment screen.
 */
declare class Window_EquipStatus extends Window_StatusBase {
    constructor(rect: Rectangle);

    public setActor(actor: Game_Actor): void;
    public colSpacing(): number;
    public refresh(): void;
    public setTempActor(tempActor: Game_Actor): void;
    public drawAllParams(): void;

    // Workaround to make TS accept bad OOP :s
    public drawItem(index: number): never;
    public drawItem(x: number, y: number, paramId: number): void;

    public drawParamName(x: number, y: number, paramId: number): void;
    public drawCurrentParam(x: number, y: number, paramId: number): void;
    public drawRightArrow(x: number, y: number): void;
    public drawNewParam(x: number, y: number, paramId: number): void;
    public rightArrowWidth(): number;
    public paramWidth(): number;
    public paramX(): number;
    public paramY(index: number): number;
}

export { Window_EquipStatus }