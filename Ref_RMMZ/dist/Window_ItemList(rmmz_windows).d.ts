declare function Window_ItemList(...args: any[]): void;
declare class Window_ItemList {
    constructor(...args: any[]);
    constructor: typeof Window_ItemList;
    initialize(rect: any): void;
    _category: any;
    _data: any;
    setCategory(category: any): void;
    maxCols(): number;
    colSpacing(): number;
    maxItems(): any;
    item(): any;
    itemAt(index: any): any;
    isCurrentItemEnabled(): any;
    includes(item: any): any;
    needsNumber(): any;
    isEnabled(item: any): any;
    makeItemList(): void;
    selectLast(): void;
    drawItem(index: any): void;
    numberWidth(): any;
    drawItemNumber(item: any, x: any, y: any, width: any): void;
    updateHelp(): void;
    refresh(): void;
}
