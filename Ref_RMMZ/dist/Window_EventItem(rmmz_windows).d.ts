declare function Window_EventItem(...args: any[]): void;
declare class Window_EventItem {
    constructor(...args: any[]);
    constructor: typeof Window_EventItem;
    initialize(rect: any): void;
    openness: number;
    setMessageWindow(messageWindow: any): void;
    _messageWindow: any;
    createCancelButton(): void;
    _cancelButton: Sprite_Button;
    start(): void;
    update(): void;
    updateCancelButton(): void;
    updatePlacement(): void;
    y: number;
    placeCancelButton(): void;
    includes(item: any): boolean;
    needsNumber(): any;
    isEnabled(): boolean;
    onOk(): void;
    onCancel(): void;
}
