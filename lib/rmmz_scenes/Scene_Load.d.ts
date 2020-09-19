import {Scene_File} from ".";


declare class Scene_Load extends Scene_File {

    protected _loadSuccess: boolean;

    constructor();
    public initialize(): void;
    public terminate(): void;
    public mode(): string;
    public helpWindowText(): string;
    public firstSavefileId(): number;
    public onSavefileOk(): void;
    public executeLoad(savefileId: number): void;
    public onLoadSuccess(): void;
    public onLoadFailure(): void;
    public reloadMapIfUpdated(): void;
}
export {Scene_Load}