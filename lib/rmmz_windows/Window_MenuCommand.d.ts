import { Window_Command } from "./Window_Command";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_MenuCommand
 * 
 * The window for selecting a command on the menu screen.
 */
declare class Window_MenuCommand<T> extends Window_Command<T>{
    constructor(rect: Rectangle);

    public static initCommandPosition(): void;

    public makeCommandList(): void;
    public addMainCommands(): void;
    public addFormationCommand(): void;
    public addOriginalCommands(): void;
    public addOptionsCommand(): void;
    public addSaveCommand(): void;
    public addGameEndCommand(): void;
    public needsCommand(name: string): boolean;
    public areMainCommandsEnabled(): boolean;
    public isFormationEnabled(): boolean;
    public isOptionsEnabled(): boolean;
    public isSaveEnabled(): boolean;
    public isGameEndEnabled(): boolean;
    public processOk(): void;
    public selectLast(): void;
}

export { Window_MenuCommand }