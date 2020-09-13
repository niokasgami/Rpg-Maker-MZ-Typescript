import { RPG } from "../RPG";

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

declare namespace DataManager {

    export function loadGlobalInfo(): void;
    export function removeInvalidGlobalInfo(): void;
    export function saveGlobalInfo(): void;
    export function isGlobalInfoLoaded(): boolean;

    export function loadDatabase(): void;
    export function isDatabaseLoaded(): boolean;

    export function loadDataFile(name: string, src: string): void;

    export function onXhrLoad(xhr : { status: number, responseText: string }, name: string, src: string, url: string): void;
    export function onXhrError(name: string, src: string, url: string): void;
    export function onLoad(object: Record<string, unknown>): void;

    export function makeEmptyMap(): void;
    export function loadMapData(mapId: number): void;
    export function isMapLoaded(): boolean
    export function isMapObject(object: Record<string, unknown>): boolean;

    export function extractArrayMetadata(array: unknown[]): void;
    export function extractMetadata(data: Record<string, unknown>): void;

    export function checkError(): void;

    export function setupBattleTest(): void;
    export function isBattleTest(): boolean;

    export function setupEventTest(): void;
    export function isEventTest(): boolean;

    export function isSkill(item: unknown): item is RPG.DataSkill;
    export function isItem(item: unknown): item is RPG.DataItem;
    export function isWeapon(item: unknown): item is RPG.DataWeapon;
    export function isArmor(item: unknown): item is RPG.DataArmor;

    export function setupNewGame(): void;
    export function createGameObjects(): void;

    export function isAnySavefileExists(): boolean;
    export function savefileExists(savefileId: number): boolean;

    export function latestSavefileId(): number;
    export function earliestSavefileId(): number;
    export function emptySavefileId(): number;

    export function loadAllSavefileImages(): void;
    export function loadSavefileImages(info: SavefileInfo): void;

    export function maxSavefiles(): number;

    export function savefileInfo(savefileId: number): SavefileInfo;

    export function saveGame(savefileId: number): Promise<number>;
    export function makeSavename(savefileId: number): string;
    export function makeSavefileForNewGame(): void;
    export function makeSavefileInfo(): SavefileInfo;
    export function makeSaveContents(): SavefileContent;

    export function loadGame(savefileId: number): Promise<number>;
    export function extractSaveContents(contents: SavefileContent): void;

    export function correctDataErrors(): void;

}

export {
    DataManager,
    SavefileContent,
    SavefileInfo,
};
