declare function Game_Switches(...args: any[]): void;
declare class Game_Switches {
    constructor(...args: any[]);
    initialize(): void;
    clear(): void;
    _data: any[];
    value(switchId: any): boolean;
    setValue(switchId: any, value: any): void;
    onChange(): void;
}
