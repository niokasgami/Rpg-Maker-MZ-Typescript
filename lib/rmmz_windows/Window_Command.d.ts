import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";

declare interface Command<T> {
    public name: string;
    public symbol: string;
    public enabled: boolean;
    public ext: T;
}

/**
 * Window_Command
 * 
 * The superclass of windows for selecting a command.
 */
declare class Window_Command<T> extends Window_Selectable {
    constructor(rect: Rectangle);

    public maxItems(): number;
    public clearCommandList(): void;
    public makeCommandList(): void;
    public addCommand(name: string, symbol: string, enabled = true, ext: T = null): void;
    public commandName(index: number): string;
    public commandSymbol(index: number): string;
    public isCommandEnabled(index: number): boolean;
    public currentData(): Command<T>;
    public isCurrentItemEnabled(): boolean;
    public currentSymbol(): string;
    public currentExt(): T;
    public findSymbol(symbol: string): number;
    public selectSymbol(symbol: string): void;
    public findExt(ext: T): number;
    public selectExt(ext: T): void;
    public drawItem(index: number): void;
    public itemTextAlign(): string;
    public isOkEnabled(): boolean;
    public callOkHandler(): void;
    public refresh(): void;
}

export {Command, Window_Command}