declare function Window_BattleActor(...args: any[]): void;
declare class Window_BattleActor {
    constructor(...args: any[]);
    constructor: typeof Window_BattleActor;
    initialize(rect: any): void;
    openness: number;
    show(): void;
    hide(): void;
    select(index: any): void;
    processTouch(): void;
}
