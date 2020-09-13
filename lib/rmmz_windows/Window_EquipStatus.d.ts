import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";

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