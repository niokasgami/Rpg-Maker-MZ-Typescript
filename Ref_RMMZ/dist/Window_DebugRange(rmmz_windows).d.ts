declare function Window_DebugRange(...args: any[]): void;
declare class Window_DebugRange {
    constructor(...args: any[]);
    constructor: typeof Window_DebugRange;
    initialize(rect: any): void;
    _maxSwitches: number;
    _maxVariables: number;
    maxItems(): number;
    update(): void;
    mode(index: any): "switch" | "variable";
    topId(index: any): number;
    isSwitchMode(index: any): boolean;
    drawItem(index: any): void;
    isCancelTriggered(): any;
    processCancel(): void;
    setEditWindow(editWindow: any): void;
    _editWindow: any;
}
declare namespace Window_DebugRange {
    const lastTopRow: number;
    const lastIndex: number;
}
