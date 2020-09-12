import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_NameEdit } from "./Window_NameEdit";

/**
 * Window_NameInput
 * 
 * The window for selecting text characters on the name input screen.
 */
declare class Window_NameInput extends Window_Selectable {
    constructor(rect: Rectangle);

    public static LATIN1: string[];
    public static LATIN2: string[];
    public static RUSSIA: string[];
    public static JAPAN1: string[];
    public static JAPAN2: string[];
    public static JAPAN3: string[];

    public setEditWindow(editWindow: Window_NameEdit): void;
    public table(): string[];
    public maxCols(): number;
    public maxItems(): number;
    public itemWidth(): number;
    public groupSpacing(): number;
    public character(): string;
    public isPageChange(): boolean;
    public isOk(): boolean;
    public itemRect(index: number): Rectangle;
    public drawItem(index: number): void;
    public updateCursor(): void;
    public isCursorMovable(): boolean;
    public cursorDown(wrap: boolean): void;
    public cursorUp(wrap: boolean): void;
    public cursorRight(wrap: boolean): void;
    public cursorLeft(wrap: boolean): void;
    public cursorPagedown(): void;
    public cursorPageup(): void;
    public processCursorMove(): void;
    public processHandling(): void;
    public isCancelEnabled(): boolean;
    public processCancel(): void;
    public processJump(): void;
    public processBack(): void;
    public processOk(): void;
    public onNameAdd(): void;
    public onNameOk(): void;
}

export { Window_NameInput }