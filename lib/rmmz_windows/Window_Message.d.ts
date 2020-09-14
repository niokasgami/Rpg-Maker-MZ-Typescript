import { Rectangle } from "../rmmz_core";

import {
    Window_Base,
    Window_Gold,
    Window_NameBox,
    Window_ChoiceList,
    Window_NumberInput,
    Window_EventItem
} from ".";

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
    public setChoiceListWindow<T>(choiceListWindow: Window_ChoiceList<T>): void;
    public setNumberInputWindow(numberInputWindow: Window_NumberInput): void;
    public setEventItemWindow(eventItemWindow: Window_EventItem): void;
    public clearFlags(): void;
    public update(): void;
    public checkToNotClose(): void;
    public synchronizeNameBox(): void;
    public canStart(): boolean;
    public startMessage(): void;
    public newLineX(textState: Window_Base.TextState): number;
    public updatePlacement(): void;
    public updateBackground(): void;
    public terminateMessage(): void;
    public updateWait(): boolean;
    public updateLoading(): boolean;
    public updateInput(): boolean;
    public isAnySubWindowActive(): boolean;
    public updateMessage(): boolean;
    public shouldBreakHere(textState: Window_Base.TextState): boolean;
    public canBreakHere(textState: Window_Base.TextState): boolean;
    public onEndOfText(): void;
    public startInput(): boolean;
    public isTriggered(): boolean;
    public doesContinue(): boolean;
    public areSettingsChanged(): boolean;
    public updateShowFast(): void;
    public newPage(textState: Window_Base.TextState): void;
    public updateSpeakerName(): void;
    public loadMessageFace(): void;
    public drawMessageFace(): void;
    public processControlCharacter(textState: Window_Base.TextState, c: string): void;
    public processNewLine(textState: Window_Base.TextState): void;
    public processNewPage(textState: Window_Base.TextState): void;
    public isEndOfText(textState: Window_Base.TextState): boolean;
    public needsNewPage(textState: Window_Base.TextState): boolean;
    public processEscapeCharacter(code: string, textState: Window_Base.TextState): void;
    public startWait(count: number): void;
    public startPause(): void;
}

export { Window_Message }