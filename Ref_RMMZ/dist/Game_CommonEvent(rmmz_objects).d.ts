declare function Game_CommonEvent(...args: any[]): void;
declare class Game_CommonEvent {
    constructor(...args: any[]);
    initialize(commonEventId: any): void;
    _commonEventId: any;
    event(): any;
    list(): any;
    refresh(): void;
    _interpreter: Game_Interpreter;
    isActive(): any;
    update(): void;
}
