import {Scene_File} from ".";


declare class Scene_Save extends Scene_File {

    constructor();
    public initialize(): void;
    public mode(): string;
    public helpWindowText(): string;
    public firstSavefileId(): number;
    public onSavefileOk(): void;
    public executeSave(savefileId: number): void;
    public onSaveSuccess(): void;
    public onSaveFailure(): void;

}
export {Scene_Save}