import { Window_Base } from "./Window_Base";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_MapName
 * 
 * The window for displaying the map name on the map screen.
 */
declare class Window_MapName extends Window_Base {
    constructor(rect: Rectangle);
    public update(): void;
    public updateFadeIn(): void;
    public updateFadeOut(): void;
    public open(): void;
    public close(): void;
    public refresh(): void;
    public drawBackground(x: number, y: number, width: number, height: number): void;
}

export { Window_MapName }