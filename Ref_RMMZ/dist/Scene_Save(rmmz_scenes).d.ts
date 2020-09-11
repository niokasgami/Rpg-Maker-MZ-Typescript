declare function Scene_Save(...args: any[]): void;
declare class Scene_Save {
    constructor(...args: any[]);
    constructor: typeof Scene_Save;
    initialize(): void;
    mode(): string;
    helpWindowText(): any;
    firstSavefileId(): any;
    onSavefileOk(): void;
    executeSave(savefileId: any): void;
    onSaveSuccess(): void;
    onSaveFailure(): void;
}
