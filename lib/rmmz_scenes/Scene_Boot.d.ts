import {Scene_Base} from ".";


declare class Scene_Boot extends Scene_Base {

    protected _databaseLoaded: boolean;

    constructor(...arguments: never[]);

    public initialize(): void;

    public create(): void;

    public isReady(): boolean;

    public onDatabaseLoaded(): void;

    public setEncryptionInfo(): void;

    public loadSystemImages(): void;

    public loadPlayerData(): void;

    public loadGameFonts(): void;

    public isPlayerDataLoaded(): void;

    public start(): void;

    public startNormalGame(): void;

    public resizeScreen(): void;

    public adjustBoxSize(): void;

    public adjustWindow(): void;

    public updateDocumentTitle(): void;

    public checkPlayerLocation(): void;
}

export {Scene_Boot}
