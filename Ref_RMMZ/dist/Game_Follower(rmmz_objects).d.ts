declare function Game_Follower(...args: any[]): void;
declare class Game_Follower {
    constructor(...args: any[]);
    constructor: typeof Game_Follower;
    initialize(memberIndex: any): void;
    _memberIndex: any;
    refresh(): void;
    actor(): any;
    isVisible(): any;
    isGathered(): any;
    update(): void;
    chaseCharacter(character: any): void;
}
