declare function Window_MenuStatus(...args: any[]): void;
declare class Window_MenuStatus {
    constructor(...args: any[]);
    constructor: typeof Window_MenuStatus;
    initialize(rect: any): void;
    _formationMode: any;
    _pendingIndex: any;
    maxItems(): any;
    numVisibleRows(): number;
    itemHeight(): number;
    actor(index: any): any;
    drawItem(index: any): void;
    drawPendingItemBackground(index: any): void;
    drawItemImage(index: any): void;
    drawItemStatus(index: any): void;
    processOk(): void;
    isCurrentItemEnabled(): any;
    selectLast(): void;
    formationMode(): any;
    setFormationMode(formationMode: any): void;
    pendingIndex(): any;
    setPendingIndex(index: any): void;
}
