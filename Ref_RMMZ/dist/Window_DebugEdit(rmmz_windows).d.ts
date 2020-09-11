declare function Window_DebugEdit(...args: any[]): void;
declare class Window_DebugEdit {
    constructor(...args: any[]);
    constructor: typeof Window_DebugEdit;
    initialize(rect: any): void;
    _mode: any;
    _topId: any;
    maxItems(): number;
    drawItem(index: any): void;
    itemName(dataId: any): any;
    itemStatus(dataId: any): string;
    setMode(mode: any): void;
    setTopId(id: any): void;
    currentId(): any;
    update(): void;
    updateSwitch(): void;
    updateVariable(): void;
    deltaForVariable(): 1 | 0 | -1 | 10 | -10;
}
