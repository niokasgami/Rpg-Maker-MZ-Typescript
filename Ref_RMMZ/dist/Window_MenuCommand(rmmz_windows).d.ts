declare function Window_MenuCommand(...args: any[]): void;
declare class Window_MenuCommand {
    constructor(...args: any[]);
    constructor: typeof Window_MenuCommand;
    initialize(rect: any): void;
    _canRepeat: boolean;
    makeCommandList(): void;
    addMainCommands(): void;
    addFormationCommand(): void;
    addOriginalCommands(): void;
    addOptionsCommand(): void;
    addSaveCommand(): void;
    addGameEndCommand(): void;
    needsCommand(name: any): any;
    areMainCommandsEnabled(): any;
    isFormationEnabled(): any;
    isOptionsEnabled(): boolean;
    isSaveEnabled(): any;
    isGameEndEnabled(): boolean;
    processOk(): void;
    selectLast(): void;
}
declare namespace Window_MenuCommand {
    const _lastCommandSymbol: any;
    function initCommandPosition(): void;
}
