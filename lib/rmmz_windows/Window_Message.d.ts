import { Window_Base, TextState } from "./Window_Base";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Window_Gold } from "./Window_Gold";
import { Window_NameBox } from "./Window_NameBox";
import { Window_ChoiceList } from "./Window_ChoiceList";
import { Window_NumberInput } from "./Window_NumberInput";
import { Window_EventItem } from "./Window_EventItem";

/**
 * Window_Message
 * 
 * The window for displaying text messages.
 */
declare class Window_Message extends Window_Base {
    constructor(rect: Rectangle);
    public initMembers(): void;
    public setGoldWindow(goldWindow: Window_Gold): void;
    public setNameBoxWindow(nameBoxWindow: Window_NameBox): void;
    public setChoiceListWindow(choiceListWindow: Window_ChoiceList): void;
    public setNumberInputWindow(numberInputWindow: Window_NumberInput): void;
    public setEventItemWindow(eventItemWindow: Window_EventItem): void;
    public clearFlags(): void;
    public update(): void;
    public checkToNotClose(): void;
    public synchronizeNameBox(): void;
    public canStart(): boolean;
    public startMessage(): void;
    public newLineX(textState: TextState): number;
    public updatePlacement(): void;
    public updateBackground(): void;
    public terminateMessage(): void;
    public updateWait(): boolean;
    public updateLoading(): boolean;
    public updateInput(): boolean;
    public isAnySubWindowActive(): boolean;
    public updateMessage(): boolean;
    public shouldBreakHere(textState: TextState): boolean;
    public canBreakHere(textState: TextState): boolean;
    public onEndOfText(): void;
    public startInput(): boolean;
    public isTriggered(): boolean;
    public doesContinue(): boolean;
    public areSettingsChanged(): boolean;
    public updateShowFast(): void;
    public newPage(textState: TextState): void;
    public updateSpeakerName(): void;
    public loadMessageFace(): void;
    public drawMessageFace(): void;
    public processControlCharacter(textState: TextState, c: string): void;
    public processNewLine(textState: TextState): void;
    public processNewPage(textState: TextState): void;
    public isEndOfText(textState: TextState): boolean;
    public needsNewPage(textState: TextState): boolean;
    public processEscapeCharacter(code: string, textState: TextState): void;
    public startWait(count: number): void;
    public startPause(): void;
}

export { Window_Message }