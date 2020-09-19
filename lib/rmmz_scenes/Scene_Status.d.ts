import {Scene_MenuBase} from ".";
import {Window_Help, Window_Status, Window_StatusParams} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";


declare class Scene_Status extends Scene_MenuBase {

    protected _profileWindow: Window_Help;
    protected _statusWindow: Window_Status;
    protected _statusParamsWindow: Window_StatusParams;
    protected _statusEquipWindow: Window_StatusParams;

    constructor();
    public initialize(): void;
    public create(): void;
    public helpAreaHeight(): number;
    public createProfileWindow(): void;
    public profileWindowRect(): Rectangle;
    public createStatusWindow(): void;
    public statusWindowRect(): Rectangle;
    public createStatusParamsWindow(): void;
    public statusParamsWindowRect(): Rectangle;
    public createStatusEquipWindow(): void;
    public statusEquipWindowRect(): Rectangle;
    public statusParamsWidth(): number;
    public statusParamsHeight(): number;
    public profileHeight(): number;
    public start(): void;
    public needsPageButtons(): boolean;
    public refreshActor(): void;
    public onActorChange(): void;
}
export {Scene_Status}