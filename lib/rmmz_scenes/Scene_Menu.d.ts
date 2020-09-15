import {Scene_MenuBase} from ".";
import {Window_Gold, Window_MenuCommand, Window_MenuStatus} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";


declare class Scene_Menu extends Scene_MenuBase {

    protected _commandWindow: Window_MenuCommand<any>; // TODO fix the typing?
    protected _goldWindow: Window_Gold;
    protected _statusWindow: Window_MenuStatus;

    constructor();

    public initialize(): void;

    public create(): void;

    public start(): void;

    public createCommandWindow(): void;

    public commandWindowRect(): Rectangle;

    public createGoldWindow(): void;

    public goldWindowRect(): Rectangle;

    public createStatusWindow(): void;

    public statusWindowRect(): Rectangle;

    public commandItem(): void;

    public commandPersonal(): void;

    public commandFormation(): void;
    public commandFormation(): void;

    public commandOptions(): void;

    public commandSave(): void;

    public commandGameEnd(): void;

    public onPersonalOk(): void;

    public onPersonalCancel(): void;

    public onFormationOk(): void;

    public onFormationCancel(): void;
}

export {Scene_Menu}