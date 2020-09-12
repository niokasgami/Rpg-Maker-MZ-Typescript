/**
 * @author Brandt (Masked)
 */

import { Game_Battler } from '.';

declare class Game_Unit<T extends Game_Battler> {

    constructor();

    inBattle(): boolean;

    members(): T[];
    aliveMembers(): T[];
    deadMembers(): T[];
    movableMembers(): T[];

    clearActions(): void;

    agility(): number;
    tgrSum(): number;

    randomTarget(): T;
    randomDeadTarget(): T;
    smoothTarget(): T;
    smoothDeadTarget(): T;

    clearResults(): void;

    onBattleStart(advantageous: boolean): void;

    onBattleEnd(): void;
    makeActions(): void;

    select(activeMember: T): void;

    isAllDead(): boolean;

    substituteBattler(): T;

    tpbBaseSpeed(): number;
    tpbReferenceTime(): number;

    updateTpb(): void;

}

export { Game_Unit };
