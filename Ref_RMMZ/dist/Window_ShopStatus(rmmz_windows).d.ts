declare function Window_ShopStatus(...args: any[]): void;
declare class Window_ShopStatus {
    constructor(...args: any[]);
    constructor: typeof Window_ShopStatus;
    initialize(rect: any): void;
    _item: any;
    _pageIndex: any;
    refresh(): void;
    setItem(item: any): void;
    isEquipItem(): any;
    drawPossession(x: any, y: any): void;
    drawEquipInfo(x: any, y: any): void;
    statusMembers(): any;
    pageSize(): number;
    maxPages(): number;
    drawActorEquipInfo(x: any, y: any, actor: any): void;
    drawActorParamChange(x: any, y: any, actor: any, item1: any): void;
    paramId(): 2 | 3;
    currentEquippedItem(actor: any, etypeId: any): any;
    update(): void;
    updatePage(): void;
    isPageChangeEnabled(): boolean;
    isPageChangeRequested(): boolean;
    changePage(): void;
}
