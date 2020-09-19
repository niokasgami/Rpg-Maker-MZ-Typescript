import {Scene_ItemBase} from ".";
import {Window_ItemCategory, Window_ItemList} from "../rmmz_windows";
import {Rectangle} from "../rmmz_core";
import {Game_Actor} from "../rmmz_objects";

declare class Scene_Item extends  Scene_ItemBase {

    protected _categoryWindow: Window_ItemCategory<any>;
    protected _itemWindow: Window_ItemList;

    constructor();
    public initialize(): void;
    public create(): void;
    public createCategoryWindow(): void;
    public categoryWindowRect(): Rectangle;
    public createItemWindow(): void;
    public itemWindowRect(): Rectangle;
    public user(): Game_Actor[];
    public onCategoryOk(): void;
    public onItemOk(): void;
    public onItemCancel(): void;
    public playSeForItem(): void;
}
export {Scene_Item}