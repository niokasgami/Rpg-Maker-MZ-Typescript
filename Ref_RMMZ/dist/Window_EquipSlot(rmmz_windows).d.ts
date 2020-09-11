declare function Window_EquipSlot(...args: any[]): void;
declare class Window_EquipSlot {
    constructor(...args: any[]);
    constructor: typeof Window_EquipSlot;
    initialize(rect: any): void;
    _actor: any;
    setActor(actor: any): void;
    update(): void;
    maxItems(): any;
    item(): any;
    itemAt(index: any): any;
    drawItem(index: any): void;
    slotNameWidth(): number;
    isEnabled(index: any): any;
    isCurrentItemEnabled(): any;
    setStatusWindow(statusWindow: any): void;
    _statusWindow: any;
    setItemWindow(itemWindow: any): void;
    _itemWindow: any;
    updateHelp(): void;
}
