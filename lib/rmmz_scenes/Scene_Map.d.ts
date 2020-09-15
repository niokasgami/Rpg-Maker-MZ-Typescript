import {Scene_Message} from ".";
import {Window_MapName} from "../rmmz_windows";
import {Sprite_Button} from "../rmmz_sprites";
import {Rectangle} from "../rmmz_core";


declare class Scene_Map extends Scene_Message {

    protected _waitCount: number;
    protected _encounterEffectDuration: number;
    protected _mapLoaded: boolean;
    protected _touchCount: number;
    protected _menuEnabled: boolean;
    protected _transfer: boolean;
    protected _lasMapWasNull: boolean;
    protected _spriteset: Spriteset_Map;
    protected _mapNameWindow: Window_MapName;
    protected _menuButton: Sprite_Button;

    public menuCalling: boolean;

    constructor(...arguments: never[]);

    public initialize(): void;

    public create(): void;

    public isReady(): boolean;

    public onMapLoaded(): void;

    public onTransfer(): void;

    public start(): void;

    public onTransferEnd(): void;

    public shouldAutosave(): boolean;

    public update(): void;

    public updateMainMultiply(): void;

    public updateMain(): void;

    public isPlayerActive(): boolean;

    public isFastForward(): boolean;

    public stop(): void;

    public isBusy(): boolean;

    public terminate(): void;

    public needsFadeIn(): boolean;

    public needsSlowFadeOut(): boolean;

    public updateWaitCount(): boolean;

    public updateDestination(): void;

    public updateMenuButton(): void;

    public hideMenuButton(): void;

    public updateMapNameWindow(): void;

    public isMenuEnabled(): boolean;

    public isMapTouchOk(): boolean;

    public processMapTouch(): void;

    public isAnyButtonPressed(): boolean;

    public onMapTouch(): void;

    public isSceneChangeOk(): boolean;

    public updateScene(): void;

    public createDisplayObjects(): void;

    public createSpriteset(): void;

    public createAllWindows(): void;

    public createMapNameWindow(): void;

    public mapNameWindowRect(): Rectangle;

    public createButtons(): void;

    public createMenuButton(): void;

    public updateTransferPlayer(): void;

    public updateEncounter(): void;

    public updateCallMenu(): void;

    public isMenuCalled(): boolean;

    public callMenu(): void;

    public updateCallDebug(): void;

    public isDebugCalled(): boolean;

    public fadeInForTransfer(): void;

    public fadeOutForTransfer(): void;

    public launchBattle(): void;

    public stopAudioOnBattleStart(): void;

    public startEncounterEffect(): void;

    public updateEncounterEffect(): void;

    public snapForBattleBackground(): void;

    public startFlashForEncounter(duration: number): void;

    public encounterEffectSpeed(): number;
}

export {Scene_Map}