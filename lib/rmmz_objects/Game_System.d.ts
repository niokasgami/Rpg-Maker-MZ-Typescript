import { AudioManager } from "rmmz_managers";

declare class Game_System {

    private _saveEnabled: boolean;
    private _menuEnabled: boolean;
    private _encounterEnabled: boolean;
    private _formationEnabled: boolean;
    private _battleCount: number;
    private _winCount: number;
    private _escapeCount: number;
    private _saveCount: number;
    private _versionId: number;
    private _savefileId: number;
    private _framesOnSave: number;
    private _bgmOnSave: AudioManager.CurrentAudio;
    private _bgsOnSave: AudioManager.CurrentAudio;
    private _windowTone: number[];
    private _battleBgm: AudioManager.CurrentAudio;
    private _victoryMe: AudioManager.CurrentAudio;
    private _defeatMe: AudioManager.CurrentAudio;
    private _savedBgm: AudioManager.CurrentAudio;
    private _walkingBgm: AudioManager.CurrentAudio;

    constructor();
    public initialize(): void;
    public isJapanese(): boolean;
    public isChinese(): boolean;
    public isKorean(): boolean;
    public isCJK(): boolean;
    public isRussian(): boolean;
    public isSideView(): boolean;
    public isAutosaveEnabled(): boolean;
    public isSaveEnabled(): boolean;
    public disableSave(): void;
    public enableSave(): void;
    public isMenuEnabled(): boolean;
    public disableMenu(): void;
    public enableMenu(): void;
    public isEncounterEnabled(): boolean;
    public disableEncounter(): void;
    public enableEncounter(): void;
    public isFormationEnabled(): boolean;
    public disableFormation(): void;
    public enableFormation(): void;
    public battleCount(): number;
    public winCount(): number;
    public escapeCount(): number;
    public saveCount(): number;
    public versionId(): number;
    public savefileId(): number;
    public setSavefileId(savefileId: number): void;
    public windowTone(): number[];
    public setWindowTone(value: number[]): void;
    public battleBgm(): AudioManager.CurrentAudio;
    public setBattleBgm(value: AudioManager.CurrentAudio): void;
    public victoryMe(): AudioManager.CurrentAudio;
    public setVictoryMe(value: AudioManager.CurrentAudio): void;
    public defeatMe(): AudioManager.CurrentAudio;
    public setDefeatMe(value: AudioManager.CurrentAudio): void;
    public onBattleStart(): void;
    public onBattleWin(): void;
    public onBattleEscape(): void;
    public onBeforeSave(): void;
    public onAfterLoad(): void;
    public playTime(): number;
    public playTimeText(): string;
    public saveBgm(): void;
    public replayBgm(): void;
    public saveWalkingBgm(): void;
    public replayWalkingBgm(): void;
    public saveWalkingBgm2(): void;
    public mainFontFace(): string;
    public numberFontFace(): string;
    public mainFontSize(): number;
    public windowPadding(): number

}

export { Game_System };
