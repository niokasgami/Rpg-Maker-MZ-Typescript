declare function Window_Help(...args: any[]): void;
declare class Window_Help {
    constructor(...args: any[]);
    constructor: typeof Window_Help;
    initialize(rect: any): void;
    _text: any;
    setText(text: any): void;
    clear(): void;
    setItem(item: any): void;
    refresh(): void;
}
