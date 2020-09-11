declare function Scene_Menu(...args: any[]): void;
declare class Scene_Menu {
    constructor(...args: any[]);
    constructor: typeof Scene_Menu;
    initialize(): void;
    helpAreaHeight(): number;
    create(): void;
    start(): void;
    createCommandWindow(): void;
    _commandWindow: Window_MenuCommand;
    commandWindowRect(): Rectangle;
    createGoldWindow(): void;
    _goldWindow: Window_Gold;
    goldWindowRect(): Rectangle;
    createStatusWindow(): void;
    _statusWindow: Window_MenuStatus;
    statusWindowRect(): Rectangle;
    commandItem(): void;
    commandPersonal(): void;
    commandFormation(): void;
    commandOptions(): void;
    commandSave(): void;
    commandGameEnd(): void;
    onPersonalOk(): void;
    onPersonalCancel(): void;
    onFormationOk(): void;
    onFormationCancel(): void;
}
