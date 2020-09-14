/**
 * @author Brandt (Masked)
 */

import { RPG } from "../RPG";

import { Game_Unit, Game_Enemy } from '.';

declare class Game_Troop extends Game_Unit<Game_Enemy> {

    static readonly LETTER_TABLE_HALF: string[];
    static readonly LETTER_TABLE_FULL: string[];

    constructor();

    isEventRunning(): boolean;
    updateInterpreter(): void;

    turnCount(): number;

    clear(): void;

    troop(): RPG.DataTroop;

    setup(troopId: number): void;
    makeUniqueNames(): void;
    updatePluralFlags(): void;

    letterTable(): string[];
    enemyNames(): string[];

    meetsConditions(page: RPG.Page): boolean;
    setupBattleEvent(): void;

    increaseTurn(): void;

    expTotal(): number;
    goldTotal(): number;
    goldRate(): number;

    makeDropItems(): RPG.DataItemBase[];
    isTpbTurnEnd(): boolean;

}

export { Game_Troop };
