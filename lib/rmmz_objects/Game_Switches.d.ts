
declare class Game_Switches {

    private _data: boolean[];
    
    constructor();

    public initialize(): void;

    public clear(): void;
    public value(switchId: number): boolean;
    public setValue(switchId: number, value: boolean): void;
    public onChange(): void;
}

export { Game_Switches }