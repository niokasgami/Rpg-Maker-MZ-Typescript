declare function Window_NameInput(...args: any[]): void;
declare class Window_NameInput {
    constructor(...args: any[]);
    constructor: typeof Window_NameInput;
    initialize(rect: any): void;
    _editWindow: any;
    _page: any;
    _index: any;
    setEditWindow(editWindow: any): void;
    table(): string[][];
    maxCols(): number;
    maxItems(): number;
    itemWidth(): number;
    groupSpacing(): number;
    character(): string;
    isPageChange(): boolean;
    isOk(): boolean;
    itemRect(index: any): Rectangle;
    drawItem(index: any): void;
    updateCursor(): void;
    isCursorMovable(): any;
    cursorDown(wrap: any): void;
    cursorUp(wrap: any): void;
    cursorRight(wrap: any): void;
    cursorLeft(wrap: any): void;
    cursorPagedown(): void;
    cursorPageup(): void;
    processCursorMove(): void;
    processHandling(): void;
    isCancelEnabled(): boolean;
    processCancel(): void;
    processJump(): void;
    processBack(): void;
    processOk(): void;
    onNameAdd(): void;
    onNameOk(): void;
}
declare namespace Window_NameInput {
    const LATIN1: string[];
    const LATIN2: string[];
    const RUSSIA: string[];
    const JAPAN1: string[];
    const JAPAN2: string[];
    const JAPAN3: string[];
}
