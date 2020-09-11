declare function Window_ShopBuy(...args: any[]): void;
declare class Window_ShopBuy {
    constructor(...args: any[]);
    constructor: typeof Window_ShopBuy;
    initialize(rect: any): void;
    _money: any;
    setupGoods(shopGoods: any): void;
    _shopGoods: any;
    maxItems(): number;
    item(): any;
    itemAt(index: any): any;
    setMoney(money: any): void;
    isCurrentItemEnabled(): boolean;
    price(item: any): any;
    isEnabled(item: any): boolean;
    refresh(): void;
    makeItemList(): void;
    _data: any[];
    _price: any[];
    goodsToItem(goods: any): any;
    drawItem(index: any): void;
    priceWidth(): number;
    setStatusWindow(statusWindow: any): void;
    _statusWindow: any;
    updateHelp(): void;
}
