declare function Scene_Load(...args: any[]): void;
declare class Scene_Load {
    constructor(...args: any[]);
    constructor: typeof Scene_Load;
    initialize(): void;
    _loadSuccess: boolean;
    terminate(): void;
    mode(): string;
    helpWindowText(): any;
    firstSavefileId(): any;
    onSavefileOk(): void;
    executeLoad(savefileId: any): void;
    onLoadSuccess(): void;
    onLoadFailure(): void;
    reloadMapIfUpdated(): void;
}
