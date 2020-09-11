declare function Window_Command(...args: any[]): void;
declare class Window_Command {
    constructor(...args: any[]);
    constructor: typeof Window_Command;
    initialize(rect: any): void;
    maxItems(): number;
    clearCommandList(): void;
    _list: any[];
    makeCommandList(): void;
    addCommand(name: any, symbol: any, enabled?: boolean, ext?: any): void;
    commandName(index: any): any;
    commandSymbol(index: any): any;
    isCommandEnabled(index: any): any;
    currentData(): any;
    isCurrentItemEnabled(): any;
    currentSymbol(): any;
    currentExt(): any;
    findSymbol(symbol: any): number;
    selectSymbol(symbol: any): void;
    findExt(ext: any): number;
    selectExt(ext: any): void;
    drawItem(index: any): void;
    itemTextAlign(): string;
    isOkEnabled(): boolean;
    callOkHandler(): void;
    refresh(): void;
}
