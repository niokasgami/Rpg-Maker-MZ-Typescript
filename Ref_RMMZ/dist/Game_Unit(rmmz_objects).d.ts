declare function Game_Unit(...args: any[]): void;
declare class Game_Unit {
    constructor(...args: any[]);
    initialize(): void;
    _inBattle: boolean;
    inBattle(): boolean;
    members(): any[];
    aliveMembers(): any[];
    deadMembers(): any[];
    movableMembers(): any[];
    clearActions(): void;
    agility(): number;
    tgrSum(): any;
    randomTarget(): any;
    randomDeadTarget(): any;
    smoothTarget(index: any): any;
    smoothDeadTarget(index: any): any;
    clearResults(): void;
    onBattleStart(advantageous: any): void;
    onBattleEnd(): void;
    makeActions(): void;
    select(activeMember: any): void;
    isAllDead(): boolean;
    substituteBattler(): any;
    tpbBaseSpeed(): number;
    tpbReferenceTime(): 60 | 240;
    updateTpb(): void;
}
