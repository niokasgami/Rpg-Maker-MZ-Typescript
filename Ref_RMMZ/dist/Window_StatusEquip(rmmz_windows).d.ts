declare function Window_StatusEquip(...args: any[]): void;
declare class Window_StatusEquip {
    constructor(...args: any[]);
    constructor: typeof Window_StatusEquip;
    initialize(rect: any): void;
    _actor: any;
    setActor(actor: any): void;
    maxItems(): any;
    itemHeight(): any;
    drawItem(index: any): void;
    drawItemBackground(): void;
}
