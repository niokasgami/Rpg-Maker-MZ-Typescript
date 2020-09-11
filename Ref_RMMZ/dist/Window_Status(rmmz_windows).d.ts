declare function Window_Status(...args: any[]): void;
declare class Window_Status {
    constructor(...args: any[]);
    constructor: typeof Window_Status;
    initialize(rect: any): void;
    _actor: any;
    setActor(actor: any): void;
    refresh(): void;
    drawBlock1(): void;
    block1Y(): number;
    drawBlock2(): void;
    block2Y(): number;
    drawBasicInfo(x: any, y: any): void;
    drawExpInfo(x: any, y: any): void;
    expTotalValue(): any;
    expNextValue(): any;
}
