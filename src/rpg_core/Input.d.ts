import {RPG} from "./RPG";
declare class Input {

    public static readonly date: number;
    public static readonly dir4: number;
    public static readonly dir8: number;
    public static gamepadMapper: RPG.InputGamepad;
    public static keyMapper: RPG.InputKey;
    public static keyRepeatInterval: number;
    public static keyRepeatWait: number;

    public static clear(): void;
    public static initialize(): void;
    public static isLongPressed(keyname: string): boolean;
    public static isPressed(keyName: string): boolean;
    public static isRepeated(keyName: string): boolean;
    public static isTriggered(keyName: string): boolean;
    public static update(): void;

}

export {
    Input
}
