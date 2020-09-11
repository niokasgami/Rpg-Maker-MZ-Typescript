declare function Scene_Boot(...args: any[]): void;
declare class Scene_Boot {
    constructor(...args: any[]);
    constructor: typeof Scene_Boot;
    initialize(): void;
    _databaseLoaded: boolean;
    create(): void;
    isReady(): boolean;
    onDatabaseLoaded(): void;
    setEncryptionInfo(): void;
    loadSystemImages(): void;
    loadPlayerData(): void;
    loadGameFonts(): void;
    isPlayerDataLoaded(): boolean;
    start(): void;
    startNormalGame(): void;
    resizeScreen(): void;
    adjustBoxSize(): void;
    adjustWindow(): void;
    updateDocumentTitle(): void;
    checkPlayerLocation(): void;
}
