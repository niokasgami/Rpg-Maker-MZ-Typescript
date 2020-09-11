declare function Scene_File(...args: any[]): void;
declare class Scene_File {
    constructor(...args: any[]);
    constructor: typeof Scene_File;
    initialize(): void;
    create(): void;
    helpAreaHeight(): number;
    start(): void;
    savefileId(): any;
    isSavefileEnabled(savefileId: any): boolean;
    createHelpWindow(): void;
    _helpWindow: Window_Help;
    helpWindowRect(): Rectangle;
    createListWindow(): void;
    _listWindow: Window_SavefileList;
    listWindowRect(): Rectangle;
    mode(): any;
    needsAutosave(): any;
    activateListWindow(): void;
    helpWindowText(): string;
    firstSavefileId(): number;
    onSavefileOk(): void;
}
