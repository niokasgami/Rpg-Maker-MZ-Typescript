
interface selfSwitches {
    "A": boolean,
    "B": boolean,
    "C": boolean,
    "D": boolean
}
declare class Game_SelfSwitches {

    private _data: selfSwitches;

    constructor();

    public initialize(): void;
    public clear(): void;
    public value(key: string): selfSwitches;
    public setValue(key: string, value: boolean): void;
    public onChange(): void;
}

export { Game_SelfSwitches }