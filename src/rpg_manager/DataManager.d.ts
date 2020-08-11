//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.
// @TODO : this class still need fix.
//mport { RPG } from "./RPG";



// @todo make sure to declare those variables later
$gameTemp = null;
$gameSystem = null;
$gameScreen = null;
$gameTimer = null;
$gameMessage = null;
$gameSwitches = null;
$gameVariables = null;
$gameSelfSwitches = null;
$gameActors = null;
$gameParty = null;
$gameTroop = null;
$gameMap = null;
$gamePlayer = null;
$testEvent = null;


/**
 * @todo Fix the structure.
 */
declare interface SavefileInfo {
    title: string;
    characters : any[];
    faces: any;
    playtime: string;
    timestamp: number;
}
// @Todo Assign the variable type properly.
declare interface SavefileContent {
    system: any;
    screen: any;
    timer: any;
    switches: any;
    variables: any;
    selfSwitches: any;
    actors: any;
    party: any;
    map: any;
    player: any;
}
declare class DataManager {

    constructor();

    private static _globalInfo: any; // TODO : typing for this is unclear?
    private static _errors: {name: string, src: string, url: string}[];
    
    private static _databaseFiles: {name: string, src: string}[];

    public static loadGlobalInfo(): void;

    public static removeInvalidGlobalInfo(): void;

    public static saveGlobalInfo(): void;

    public static isGlobalInfoLoaded(): boolean;

    public static loadDatabase(): void;
    
    public static loadDataFile(name: string, src: string): void;

    public static onXhrLoad(xhr : { status: number, responseText: string }, name: string, src: string, url: string): void;

    public static onXhrError(name: string, src: string, url: string): void;

    public static isDatabaseLoaded(): boolean;

    public static loadMapData(mapId: number): void;

    public static makeEmptyMap(): void;

    public static isMapLoaded(): boolean

    public static onLoad(object: Record<string, any>): void;

    public static isMapObject(object: Record<string, any>): boolean;

    public static extractArrayMetadata(array: any[]): void;
    
    public static extractMetadata(data: Record<string,any>): void;

    public static checkError(): void;

    public static isBattleTest(): boolean;
    
    public static isEventTest(): boolean;

    public static isSkill(item: Record<string, any>): boolean;

    public static isItem(item: Record<string, any>): boolean;
    
    public static isWeapon(item: Record<string, any>): boolean;
    
    public static isArmor(item: Record<string, any>): boolean;

    public static createGameObjects(): void;

    public static setupNewGame(): void;

    public static setupBattleTest(): void;

    public static setupEventTest(): void;

    public static isAnySavefileExists(): boolean;

    public static latestSavefileId(): number;

    public static earliestSavefileId(): number;

    public static emptySavefileId(): number;

    public static loadAllSavefileImages(): void;

    public static loadSavefileImages(info: SavefileInfo): void;

    public static maxSavefiles(): number;

    public static savefileInfo(savefileId: number): SavefileInfo;

    public static savefileExists(savefileId: number): boolean;

    public static saveGame(savefileId: number): Promise<number>;

    public static loadGame(savefileId: number): Promise<number>;

    public static makeSavename(savefileId: number): string;

    public static makeSavefileForNewGame(): void;

    public static makeSavefileInfo(): SavefileInfo;

    public static makeSaveContents(): SavefileContent;

    public static extractSaveContents(contents: SavefileContent): void;

    public static correctDataErrors(): void;
}
export {
    DataManager,
    SavefileContent,
    SavefileInfo,
}




