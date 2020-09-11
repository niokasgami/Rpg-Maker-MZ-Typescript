declare function Window_NameBox(...args: any[]): void;
declare class Window_NameBox {
    constructor(...args: any[]);
    constructor: typeof Window_NameBox;
    initialize(): void;
    openness: number;
    _name: any;
    setMessageWindow(messageWindow: any): void;
    _messageWindow: any;
    setName(name: any): void;
    clear(): void;
    start(): void;
    updatePlacement(): void;
    width: number;
    height: any;
    x: any;
    y: any;
    updateBackground(): void;
    windowWidth(): number;
    windowHeight(): any;
    refresh(): void;
}
