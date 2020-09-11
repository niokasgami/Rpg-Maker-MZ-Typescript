declare function Window_MapName(...args: any[]): void;
declare class Window_MapName {
    constructor(...args: any[]);
    constructor: typeof Window_MapName;
    initialize(rect: any): void;
    opacity: number;
    contentsOpacity: number;
    _showCount: number;
    update(): void;
    updateFadeIn(): void;
    updateFadeOut(): void;
    open(): void;
    close(): void;
    refresh(): void;
    drawBackground(x: any, y: any, width: any, height: any): void;
}
