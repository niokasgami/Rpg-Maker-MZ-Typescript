declare function Window_ItemCategory(...args: any[]): void;
declare class Window_ItemCategory {
    constructor(...args: any[]);
    constructor: typeof Window_ItemCategory;
    initialize(rect: any): void;
    maxCols(): number;
    update(): void;
    makeCommandList(): void;
    needsCommand(name: any): any;
    setItemWindow(itemWindow: any): void;
    _itemWindow: any;
    needsSelection(): boolean;
}
