declare function Window_ShopCommand(...args: any[]): void;
declare class Window_ShopCommand {
    constructor(...args: any[]);
    constructor: typeof Window_ShopCommand;
    initialize(rect: any): void;
    setPurchaseOnly(purchaseOnly: any): void;
    _purchaseOnly: any;
    maxCols(): number;
    makeCommandList(): void;
}
