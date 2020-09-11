declare function Scene_Debug(...args: any[]): void;
declare class Scene_Debug {
    constructor(...args: any[]);
    constructor: typeof Scene_Debug;
    initialize(): void;
    create(): void;
    needsCancelButton(): boolean;
    createRangeWindow(): void;
    _rangeWindow: Window_DebugRange;
    rangeWindowRect(): Rectangle;
    createEditWindow(): void;
    _editWindow: Window_DebugEdit;
    editWindowRect(): Rectangle;
    createDebugHelpWindow(): void;
    _debugHelpWindow: Window_Base;
    debugHelpWindowRect(): Rectangle;
    onRangeOk(): void;
    onEditCancel(): void;
    refreshHelpWindow(): void;
    helpText(): string;
}
