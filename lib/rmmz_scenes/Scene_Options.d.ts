import {Scene_MenuBase} from ".";
import {Window_Options} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";


declare class Scene_Options extends Scene_MenuBase {

    protected _optionsWindow: Window_Options<any>;

    constructor();

    public initialize(): void;

    public create(): void;

    public terminate(): void;

    public createOptionsWindow(): void;

    public optionsWindowRect(): Rectangle;

    public maxCommands(): number;

    public maxVisibleCommands(): number;
}
export {Scene_Options}