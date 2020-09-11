declare function Window_ScrollText(...args: any[]): void;
declare class Window_ScrollText {
    constructor(...args: any[]);
    constructor: typeof Window_ScrollText;
    initialize(rect: any): void;
    opacity: number;
    _reservedRect: any;
    _text: any;
    _allTextHeight: any;
    update(): void;
    startMessage(): void;
    refresh(): void;
    updatePlacement(): void;
    contentsHeight(): number;
    updateMessage(): void;
    scrollSpeed(): number;
    isFastForward(): boolean;
    fastForwardRate(): number;
    terminateMessage(): void;
}
