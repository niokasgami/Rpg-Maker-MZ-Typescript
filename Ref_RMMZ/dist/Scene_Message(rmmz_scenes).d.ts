declare function Scene_Message(...args: any[]): void;
declare class Scene_Message {
    constructor(...args: any[]);
    constructor: typeof Scene_Message;
    initialize(): void;
    isMessageWindowClosing(): any;
    createAllWindows(): void;
    createMessageWindow(): void;
    _messageWindow: Window_Message;
    messageWindowRect(): Rectangle;
    createScrollTextWindow(): void;
    _scrollTextWindow: Window_ScrollText;
    scrollTextWindowRect(): Rectangle;
    createGoldWindow(): void;
    _goldWindow: Window_Gold;
    goldWindowRect(): Rectangle;
    createNameBoxWindow(): void;
    _nameBoxWindow: Window_NameBox;
    createChoiceListWindow(): void;
    _choiceListWindow: Window_ChoiceList;
    createNumberInputWindow(): void;
    _numberInputWindow: Window_NumberInput;
    createEventItemWindow(): void;
    _eventItemWindow: Window_EventItem;
    eventItemWindowRect(): Rectangle;
    associateWindows(): void;
}
