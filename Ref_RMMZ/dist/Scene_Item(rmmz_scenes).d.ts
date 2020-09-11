declare function Scene_Item(...args: any[]): void;
declare class Scene_Item {
    constructor(...args: any[]);
    constructor: typeof Scene_Item;
    initialize(): void;
    create(): void;
    createCategoryWindow(): void;
    _categoryWindow: Window_ItemCategory;
    categoryWindowRect(): Rectangle;
    createItemWindow(): void;
    _itemWindow: Window_ItemList;
    itemWindowRect(): Rectangle;
    user(): any;
    onCategoryOk(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    useItem(): void;
}
