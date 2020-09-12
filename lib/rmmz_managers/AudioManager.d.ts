import { WebAudio } from "../rmmz_core/WebAudio";

declare interface CurrentAudio {
    name: string;
    volume: number;
    pitch: number;
    pan?: number;
    pos?: number;
}

declare class AudioManager {
    private static _bgmVolume: number;
    private static _bgsVolume: number;
    private static _meVolume: number;
    private static _seVolume: number;
    private static _currentBgm: CurrentAudio;
    private static _currentBgs: CurrentAudio;
    private static _bgmBuffer: WebAudio;
    private static _bgsBuffer: WebAudio;
    private static _meBuffer: WebAudio;
    private static _seBuffer: WebAudio;
    private static _staticBuffers: WebAudio[];
    private static _replayFadeTime: number;
    private static _path: string;

    public static get bgmVolume(): number;
    public static set bgmVolume(value: number);

    public static get bgsVolume(): number;
    public static set bgsVolume(value: number);

    public static get meVolume(): number;
    public static set meVolume(value: number);

    public static get seVolume(): number;
    public static set seVolume(value: number);

    public static playBgm(bgm: CurrentAudio, pos: number): void;
    public static replayBgm(bgm: CurrentAudio): void;
    public static isCurrentBgm(bgm: CurrentAudio): boolean;
    public static updateBgmParameters(bgm: CurrentAudio): void;
    public static updateCurrentBgm(bgm: CurrentAudio, pos: number): void;
    public static stopBgm(): void;
    public static fadeOutBgm(duration: number): void;
    public static fadeInBgm(duration: number): void;
    public static playBgs(bgs: CurrentAudio, pos: number): void;
    public static replayBgs(bgs: CurrentAudio): void;
    public static isCurrentBgs(bgs: CurrentAudio): boolean;
    public static updateBgsParameters(bgs: CurrentAudio): void;
    public static stopBgs(): void;
    public static fadeOutBgs(duration: number): void;
    public static fadeInBgs(duration: number): void;
    public static playMe(me: CurrentAudio): void;
    public static updateMeParameters(me: CurrentAudio): void;
    public static fadeOutMe(duration: number): void;
    public static stopMe(): void;
    public static playSe(se: CurrentAudio): void;
    public static updateSeParameters(buffer: WebAudio, se: CurrentAudio): void;
    public static cleanupSe(): void;
    public static stopSe(): void;
    public static playStaticSe(se: CurrentAudio): void;
    public static loadStaticSe(se: CurrentAudio): void;
    public static isStaticSe(se: CurrentAudio): boolean;
    public static stopAll(): void;
    public static saveBgm(): CurrentAudio;
    public static saveBgs(): CurrentAudio;
    public static makeEmptyAudioObject(): CurrentAudio;
    public static createBuffer(folder: string, name: string): WebAudio;
    public static updateufferParameters(buffer: WebAudio, configVolume: number, audio: CurrentAudio): void;
    public static audioFileExt(): string;
    public static checkErrors(): void;
    public static throwLoadError(webAudio: WebAudio): void;
}

export { AudioManager, CurrentAudio}