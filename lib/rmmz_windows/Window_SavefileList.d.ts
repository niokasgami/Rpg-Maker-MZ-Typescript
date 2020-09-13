import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { SavefileInfo } from "../rpg_manager/DataManager";

/**
 * Window_SavefileList
 * 
 * The window for selecting a save file on the save and load screens.
 */
declare class Window_SavefileList extends Window_Selectable {
    constructor(rect: Rectangle);
    public setMode(mode: string, autosave: boolean): void;
    public maxItems(): number;
    public numVisibleRows(): number;
    public itemHeight(): number;
    public drawItem(index: number): void;
    public indexToSavefileId(index: number): number;
    public savefileIdToIndex(savefileId: number): number;
    public isEnabled(savefileId: number): boolean;
    public savefileId(): number;
    public selectSavefile(savefileId: number): void;
    public drawTitle(savefileId: number, x: number, y: number): void;
    public drawContents(info: SavefileInfo, rect: Rectangle): void;
    public drawPartyCharacters(info: SavefileInfo, x: number, y: number): void;
    public drawPlaytime(info: SavefileInfo, x: number, y: number, width: number): void;
    public playOkSound(): void;
}

export { Window_SavefileList }