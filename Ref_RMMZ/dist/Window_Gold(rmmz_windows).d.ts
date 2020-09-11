declare function Window_Gold(...args: any[]): void;
declare class Window_Gold {
    constructor(...args: any[]);
    constructor: typeof Window_Gold;
    initialize(rect: any): void;
    colSpacing(): number;
    refresh(): void;
    value(): any;
    currencyUnit(): any;
    open(): void;
}
