declare function Window_TitleCommand(...args: any[]): void;
declare class Window_TitleCommand {
    constructor(...args: any[]);
    constructor: typeof Window_TitleCommand;
    initialize(rect: any): void;
    openness: number;
    makeCommandList(): void;
    isContinueEnabled(): any;
    processOk(): void;
    selectLast(): void;
}
declare namespace Window_TitleCommand {
    const _lastCommandSymbol: any;
    function initCommandPosition(): void;
}
