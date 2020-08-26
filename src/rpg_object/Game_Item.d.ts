type GameType = RPG.DataSkill | RPG.DataItem | RPG.DataWeapon | RPG.DataArmor;
declare class Game_Item {

    private _dataClass: string;
    private _itemId: number;

    constructor();

    public initialize(item: Record<string, any>): void;
    public isSkill(): string;
    public isItem(): string;
    public isUsableItem(): boolean;
    public isWeapon(): string;
    public isArmor(): string;
    public isEquipItem(): boolean;
    public isNull(): string;
    public itemId(): number;
    public object(): GameType;
    public setObject(item: Record<string, any>): void;
    public setEquip(isWeapon: boolean, itemId: number): void;

}

export { Game_Item, GameType }