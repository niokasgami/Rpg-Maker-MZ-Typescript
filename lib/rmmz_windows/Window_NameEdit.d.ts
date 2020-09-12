import { Window_StatusBase } from "./Window_StatusBase";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rpg_object/Game_Actor";

/**
 * Window_NameEdit
 * 
 * The window for editing an actor's name on the name input screen.
 */
declare class Window_NameEdit extends Window_StatusBase {
    constructor(rect: Rectangle);
    public setup(actor: Game_Actor, maxLength: number): void;
    public name(): string;
    public restoreDefault(): boolean;
    public add(ch: string): boolean;
    public back(): boolean;
    public faceWidth(): number;
    public charWidth(): number;
    public left(): number;
    public itemRect(index: number): Rectangle;
    public underlineRect(index: number): Rectangle;
    public underlineColor(): string;
    public drawUnderline(index: number): void;
    public drawChar(index: number): void;
    public refresh(): void;
}

export { Window_NameEdit }