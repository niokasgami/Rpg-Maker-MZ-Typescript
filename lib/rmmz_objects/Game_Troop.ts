/**
 * @author Brandt (Masked)
 */

import { RPG } from '../RPG';

import { Game_Unit, Game_Enemy } from '.';

declare class Game_Troop extends Game_Unit<Game_Enemy> {

    public static readonly LETTER_TABLE_HALF: string[];
    public static readonly LETTER_TABLE_FULL: string[];

    constructor();

    public isEventRunning(): boolean;
    public updateInterpreter(): void;

    public turnCount(): number;

    public clear(): void;

    public troop(): RPG.DataTroop;

    public setup(troopId: number): void;
    public makeUniqueNames(): void;
    public updatePluralFlags(): void;

    public letterTable(): string[];
    public enemyNames(): string[];

    public meetsConditions(page: RPG.Page): boolean;
    public setupBattleEvent(): void;

    public increaseTurn(): void;

    public expTotal(): number;
    public goldTotal(): number;
    public goldRate(): number;

    public makeDropItems(): RPG.DataItemBase[];
    public isTpbTurnEnd(): boolean;

}

export { Game_Troop };
