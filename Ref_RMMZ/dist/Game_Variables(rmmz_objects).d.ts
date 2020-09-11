declare function Game_Variables(...args: any[]): void;
declare class Game_Variables {
    constructor(...args: any[]);
    initialize(): void;
    clear(): void;
    _data: any[];
    value(variableId: any): any;
    setValue(variableId: any, value: any): void;
    onChange(): void;
}
