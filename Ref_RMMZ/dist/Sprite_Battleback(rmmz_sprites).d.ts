declare function Sprite_Battleback(...args: any[]): void;
declare class Sprite_Battleback {
    constructor(...args: any[]);
    constructor: typeof Sprite_Battleback;
    initialize(type: any): void;
    bitmap: any;
    adjustPosition(): void;
    width: number;
    height: number;
    x: number;
    y: number;
    battleback1Bitmap(): any;
    battleback2Bitmap(): any;
    battleback1Name(): any;
    battleback2Name(): any;
    overworldBattleback1Name(): string;
    overworldBattleback2Name(): string;
    normalBattleback1Name(): string;
    normalBattleback2Name(): string;
    terrainBattleback1Name(type: any): "Wasteland" | "DirtField" | "Desert" | "Lava1" | "Lava2" | "Snowfield" | "Clouds" | "PoisonSwamp";
    terrainBattleback2Name(type: any): "Wasteland" | "Desert" | "Snowfield" | "Clouds" | "PoisonSwamp" | "Forest" | "Cliff" | "Lava";
    defaultBattleback1Name(): string;
    defaultBattleback2Name(): string;
    shipBattleback1Name(): string;
    shipBattleback2Name(): string;
    autotileType(z: any): any;
}
