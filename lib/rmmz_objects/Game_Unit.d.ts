/**
 * @author Brandt (Masked)
 */

import { Game_Battler } from '.';

declare class Game_Unit<T extends Game_Battler> {

    constructor();

    public inBattle(): boolean;

    public members(): T[];
    public aliveMembers(): T[];
    public deadMembers(): T[];
    public movableMembers(): T[];

    public clearActions(): void;

    public agility(): number;
    public tgrSum(): number;

    public randomTarget(): T;
    public randomDeadTarget(): T;
    public smoothTarget(): T;
    public smoothDeadTarget(): T;

    public clearResults(): void;

    public onBattleStart(advantageous: boolean): void;

    public onBattleEnd(): void;
    public makeActions(): void;

    public select(activeMember: T): void;

    public isAllDead(): boolean;

    public substituteBattler(): T;

    public tpbBaseSpeed(): number;
    public tpbReferenceTime(): number;

    public updateTpb(): void;

}

export { Game_Unit };
