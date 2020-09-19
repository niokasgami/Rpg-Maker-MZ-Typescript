import {Scene_MenuBase} from ".";
import {Window_GameEnd} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";


declare class Scene_GameEnd extends Scene_MenuBase {

    protected _commandWindow: Window_GameEnd<any>;

    constructor();

    public initialize(): void;
    public create(): void;
    public stop(): void;
    public createBackground(): void;
    public createCommandWindow(): void;
    public commandWindowRect(): Rectangle;
    public commandToTitle(): void;
}
export {Scene_GameEnd}