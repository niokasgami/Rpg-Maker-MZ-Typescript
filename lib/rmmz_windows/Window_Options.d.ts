import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_Options
 * 
 * The window for changing various settings on the options screen.
 */
declare class Window_Options<T> extends Window_Command<T> {
    constructor(rect: Rectangle);
    public makeCommandList(): void;
    public addGeneralOptions(): void;
    public addVolumeOptions(): void;
    public drawItem(index: number): void;
    public statusWidth(): number;
    public statusText(index: number): string;
    public isVolumeSymbol(symbol: string): boolean;
    public booleanStatusText(value: boolean): string;
    public volumeStatusText(value: number): string;
    public processOk(): void;
    public cursorRight(): void;
    public cursorLeft(): void;
    public changeVolume(symbol: string, forward: boolean, wrap: boolean): void;
    public volumeOffset(): number;
    public changeValue(symbol: string, value: unknown): void;
    public getConfigValue(symbol: string): unknown;
    public setConfigValue(symbol: string, volume: unknown): void;
}

export { Window_Options }