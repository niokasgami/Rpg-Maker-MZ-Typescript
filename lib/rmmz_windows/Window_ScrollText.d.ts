import { Window_Base } from "./Window_Base";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_ScrollText
 * 
 * The window for displaying scrolling text. No frame is displayed, but it
 * is handled as a window for convenience.
 */
declare class Window_ScrollText extends Window_Base {
    constructor(rect: Rectangle);
    public update(): void;
    public startMessage(): void;
    public refresh(): void;
    public updatePlacement(): void;
    public contentsHeight(): number;
    public updateMessage(): void;
    public scrollSpeed(): number;
    public isFastForward(): boolean;
    public fastForwardRate(): number;
    public terminateMessage(): void;
}

export { Window_ScrollText }