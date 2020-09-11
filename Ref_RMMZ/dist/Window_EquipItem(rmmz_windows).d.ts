declare function Window_EquipItem(...args: any[]): void;
declare class Window_EquipItem {
    constructor(...args: any[]);
    constructor: typeof Window_EquipItem;
    initialize(rect: any): void;
    _actor: any;
    _slotId: any;
    maxCols(): number;
    colSpacing(): number;
    setActor(actor: any): void;
    setSlotId(slotId: any): void;
    includes(item: any): boolean;
    etypeId(): any;
    isEnabled(): boolean;
    selectLast(): void;
    setStatusWindow(statusWindow: any): void;
    _statusWindow: any;
    updateHelp(): void;
    playOkSound(): void;
}
