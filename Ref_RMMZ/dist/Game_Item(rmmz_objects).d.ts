declare function Game_Item(...args: any[]): void;
declare class Game_Item {
    constructor(...args: any[]);
    initialize(item: any): void;
    _dataClass: string;
    _itemId: any;
    isSkill(): boolean;
    isItem(): boolean;
    isUsableItem(): boolean;
    isWeapon(): boolean;
    isArmor(): boolean;
    isEquipItem(): boolean;
    isNull(): boolean;
    itemId(): any;
    object(): any;
    setObject(item: any): void;
    setEquip(isWeapon: any, itemId: any): void;
}
