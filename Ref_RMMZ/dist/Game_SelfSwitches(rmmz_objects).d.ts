declare function Game_SelfSwitches(...args: any[]): void;
declare class Game_SelfSwitches {
    constructor(...args: any[]);
    initialize(): void;
    clear(): void;
    _data: {};
    value(key: any): boolean;
    setValue(key: any, value: any): void;
    onChange(): void;
}
