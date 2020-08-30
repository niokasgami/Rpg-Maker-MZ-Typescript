import { Window_Base } from "./Window_Base";
import { Window_Message } from "./Window_Message";

/**
 * Window_NameBox
 * 
 * The window for displaying a speaker name above the message window.
 */
declare class Window_NameBox extends Window_Base {
    constructor();
    public setMessageWindow(messageWindow: Window_Message): void;
    public setName(name: string): void;
    public clear(): void;
    public start(): void;
    public updatePlacement(): void;
    public updateBackground(): void;
    public windowWidth(): number;
    public windowHeight(): number;
    public refresh(): void;
}

export { Window_NameBox }