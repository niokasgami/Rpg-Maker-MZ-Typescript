declare function Window_StatusParams(...args: any[]): void;
declare class Window_StatusParams {
    constructor(...args: any[]);
    constructor: typeof Window_StatusParams;
    initialize(rect: any): void;
    _actor: any;
    setActor(actor: any): void;
    maxItems(): number;
    itemHeight(): any;
    drawItem(index: any): void;
    drawItemBackground(): void;
}
