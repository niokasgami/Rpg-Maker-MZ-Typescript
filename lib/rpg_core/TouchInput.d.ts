
declare class TouchInput {

    public static readonly date: number;
    public static keyRepeatInterval: number;
    public static keyRepeatWait: number;
    public static moveThreshold: number;
    public static readonly wheelX: number;
    public static readonly wheelY: number;
    public static readonly inputX: number;
    public static readonly inputY: number;

    public static clear(): void;
    public static initialize(): void;
    public static isCancelled(): boolean;
    public static isClicked(): boolean;
    public static isHovered(): boolean;
    public static isLongPressed(): boolean;
    public static isMoved(): boolean;
    public static isPressed(): boolean;
    public static isReleased(): boolean;
    public static isRepeated(): boolean;
    public static isTriggered(): boolean;
    public static update(): void;
}

export {
    TouchInput
}