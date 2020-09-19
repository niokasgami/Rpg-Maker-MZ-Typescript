import {Scene_MenuBase} from ".";
import {Window_Help, Window_SavefileList} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";


declare class Scene_File extends Scene_MenuBase {

    protected _helpWindow: Window_Help;
    protected _listWindow: Window_SavefileList;

    constructor();
    public initialize();
    public create(): void;
    public helpAreaHeight(): number;
    public start(): void;
    public savefileId(): number;
    public isSavefileEnabled(savefileId: number): boolean;
    public createHelpWindow(): void;
    public helpWindowRect(): Rectangle;
    public createListWindow(): void;
    public listWindowRect(): Rectangle;
    public mode(): string;
    public needsAutosave(): boolean;
    public activateListWindow(): void;
    public helpWindowText(): string;
    public firstSavefileId(): number;
    public onSavefileOk(): void;
}
export {Scene_File}