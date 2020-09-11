declare function Window_SavefileList(...args: any[]): void;
declare class Window_SavefileList {
    constructor(...args: any[]);
    constructor: typeof Window_SavefileList;
    initialize(rect: any): void;
    _mode: any;
    _autosave: any;
    setMode(mode: any, autosave: any): void;
    maxItems(): number;
    numVisibleRows(): number;
    itemHeight(): number;
    drawItem(index: any): void;
    indexToSavefileId(index: any): any;
    savefileIdToIndex(savefileId: any): number;
    isEnabled(savefileId: any): boolean;
    savefileId(): any;
    selectSavefile(savefileId: any): void;
    drawTitle(savefileId: any, x: any, y: any): void;
    drawContents(info: any, rect: any): void;
    drawPartyCharacters(info: any, x: any, y: any): void;
    drawPlaytime(info: any, x: any, y: any, width: any): void;
    playOkSound(): void;
}
