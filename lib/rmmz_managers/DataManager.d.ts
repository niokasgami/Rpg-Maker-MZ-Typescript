//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.
// @TODO : this class still need fix.
//mport { RPG } from "./RPG";


/**
 * @todo Fix the structure.
 */
declare interface SavefileInfo {
    title: string;
    characters: [string, number][];
    faces: [string, number][];
    playtime: string;
    timestamp: number;
}

declare interface SavefileContent {
    system: Game_System;
    screen: Game_Screen;
    timer: Game_Timer;
    switches: Game_Switches;
    variables: Game_Variables;
    selfSwitches: Game_SelfSwitches;
    actors: Game_Actors;
    party: Game_Party;
    map: Game_Map;
    player: Game_Player;
}

declare class DataManager {

    constructor();

    private static _globalInfo: SavefileInfo[];
    private static _errors: {name: string, src: string, url: string}[];
    private static _databaseFiles: {name: string, src: string}[];

    public static loadGlobalInfo(): void;
    public static removeInvalidGlobalInfo(): void;
    public static saveGlobalInfo(): void;
    public static isGlobalInfoLoaded(): boolean;

    public static loadDatabase(): void;
    public static isDatabaseLoaded(): boolean;

    public static loadDataFile(name: string, src: string): void;

    public static onXhrLoad(xhr : { status: number, responseText: string }, name: string, src: string, url: string): void;
    public static onXhrError(name: string, src: string, url: string): void;
    public static onLoad(object: Record<string, unknown>): void;

    public static makeEmptyMap(): void;
    public static loadMapData(mapId: number): void;
    public static isMapLoaded(): boolean
    public static isMapObject(object: Record<string, unknown>): boolean;

    public static extractArrayMetadata(array: unknown[]): void;
    public static extractMetadata(data: Record<string, unknown>): void;

    public static checkError(): void;

    public static setupBattleTest(): void;
    public static isBattleTest(): boolean;

    public static setupEventTest(): void;
    public static isEventTest(): boolean;

    public static isSkill(item: Record<string, unknown>): boolean;
    public static isItem(item: Record<string, unknown>): boolean;
    public static isWeapon(item: Record<string, unknown>): boolean;
    public static isArmor(item: Record<string, unknown>): boolean;

    public static setupNewGame(): void;
    public static createGameObjects(): void;

    public static isAnySavefileExists(): boolean;
    public static savefileExists(savefileId: number): boolean;

    public static latestSavefileId(): number;
    public static earliestSavefileId(): number;
    public static emptySavefileId(): number;

    public static loadAllSavefileImages(): void;
    public static loadSavefileImages(info: SavefileInfo): void;

    public static maxSavefiles(): number;

    public static savefileInfo(savefileId: number): SavefileInfo;

    public static saveGame(savefileId: number): Promise<number>;
    public static makeSavename(savefileId: number): string;
    public static makeSavefileForNewGame(): void;
    public static makeSavefileInfo(): SavefileInfo;
    public static makeSaveContents(): SavefileContent;

    public static loadGame(savefileId: number): Promise<number>;
    public static extractSaveContents(contents: SavefileContent): void;

    public static correctDataErrors(): void;
}

export {
    DataManager,
    SavefileContent,
    SavefileInfo,
};
