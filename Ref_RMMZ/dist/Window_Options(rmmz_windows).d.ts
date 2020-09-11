declare function Window_Options(...args: any[]): void;
declare class Window_Options {
    constructor(...args: any[]);
    constructor: typeof Window_Options;
    initialize(rect: any): void;
    makeCommandList(): void;
    addGeneralOptions(): void;
    addVolumeOptions(): void;
    drawItem(index: any): void;
    statusWidth(): number;
    statusText(index: any): string;
    isVolumeSymbol(symbol: any): any;
    booleanStatusText(value: any): "ON" | "OFF";
    volumeStatusText(value: any): string;
    processOk(): void;
    cursorRight(): void;
    cursorLeft(): void;
    changeVolume(symbol: any, forward: any, wrap: any): void;
    volumeOffset(): number;
    changeValue(symbol: any, value: any): void;
    getConfigValue(symbol: any): any;
    setConfigValue(symbol: any, volume: any): void;
}
