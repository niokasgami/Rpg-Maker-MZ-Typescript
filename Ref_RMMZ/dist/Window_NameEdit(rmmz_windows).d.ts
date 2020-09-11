declare function Window_NameEdit(...args: any[]): void;
declare class Window_NameEdit {
    constructor(...args: any[]);
    constructor: typeof Window_NameEdit;
    initialize(rect: any): void;
    _actor: any;
    _maxLength: any;
    _name: any;
    _index: any;
    _defaultName: any;
    setup(actor: any, maxLength: any): void;
    name(): any;
    restoreDefault(): boolean;
    add(ch: any): boolean;
    back(): boolean;
    faceWidth(): number;
    charWidth(): any;
    left(): number;
    itemRect(index: any): Rectangle;
    underlineRect(index: any): Rectangle;
    underlineColor(): any;
    drawUnderline(index: any): void;
    drawChar(index: any): void;
    refresh(): void;
}
