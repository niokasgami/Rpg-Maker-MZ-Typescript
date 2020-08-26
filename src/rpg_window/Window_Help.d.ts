import { Window_Base } from "./Window_Base";

/**
 * Window_Help
 * 
 * The window for displaying the description of the selected item.
 */
declare class Window_Help extends Window_Base{
    constructor(rect: Rectangle);

    public setText(text: string): void;
    public clear(): void;
    
    //TODO Same type as Window_Base.drawItemName(item,...);
    public setItem(item: { iconIndex: number; name: string; description: string; }): void;
    public refresh (): void;
}

export {Window_Help}