import { CurrentAudio } from "../rpg_manager/AudioManager";

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
    private _bgmOnSave: CurrentAudio;
    private _bgsOnSave: CurrentAudio;
    private _windowTone: number[];
    private _battleBgm: CurrentAudio;
    private _victoryMe: CurrentAudio;
    private _defeatMe: CurrentAudio;
    private _savedBgm: CurrentAudio;
    private _walkingBgm: CurrentAudio;

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
    public battleBgm(): CurrentAudio;
    public setBattleBgm(value: CurrentAudio): void;
    public victoryMe(): CurrentAudio;
    public setVictoryMe(value: CurrentAudio): void;
    public defeatMe(): CurrentAudio;
    public setDefeatMe(value: CurrentAudio): void;
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

export { Game_System }