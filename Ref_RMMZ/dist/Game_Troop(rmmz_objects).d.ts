declare function Game_Troop(...args: any[]): void;
declare class Game_Troop {
    constructor(...args: any[]);
    constructor: typeof Game_Troop;
    initialize(): void;
    _interpreter: Game_Interpreter;
    isEventRunning(): boolean;
    updateInterpreter(): void;
    turnCount(): number;
    members(): any[];
    clear(): void;
    _troopId: any;
    _eventFlags: {};
    _enemies: any[];
    _turnCount: number;
    _namesCount: {};
    troop(): any;
    setup(troopId: any): void;
    makeUniqueNames(): void;
    updatePluralFlags(): void;
    letterTable(): string[];
    enemyNames(): any[];
    meetsConditions(page: any): boolean;
    setupBattleEvent(): void;
    increaseTurn(): void;
    expTotal(): any;
    goldTotal(): number;
    goldRate(): 1 | 2;
    makeDropItems(): any;
    isTpbTurnEnd(): boolean;
}
declare namespace Game_Troop {
    const LETTER_TABLE_HALF: string[];
    const LETTER_TABLE_FULL: string[];
}
