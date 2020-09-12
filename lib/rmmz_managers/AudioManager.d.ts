import { WebAudio } from "../rmmz_core";

declare interface CurrentAudio {
    name: string;
    volume: number;
    pitch: number;
    pan?: number;
    pos?: number;
}

declare namespace AudioManager {

    export let bgmVolume: number;
    export let bgsVolume: number;
    export let meVolume: number;
    export let seVolume: number;

    export function playBgm(bgm: CurrentAudio, pos: number): void;
    export function replayBgm(bgm: CurrentAudio): void;

    export function isCurrentBgm(bgm: CurrentAudio): boolean;

    export function updateBgmParameters(bgm: CurrentAudio): void;
    export function updateCurrentBgm(bgm: CurrentAudio, pos: number): void;

    export function stopBgm(): void;

    export function fadeOutBgm(duration: number): void;
    export function fadeInBgm(duration: number): void;

    export function playBgs(bgs: CurrentAudio, pos: number): void;
    export function replayBgs(bgs: CurrentAudio): void;

    export function isCurrentBgs(bgs: CurrentAudio): boolean;

    export function updateBgsParameters(bgs: CurrentAudio): void;

    export function stopBgs(): void;

    export function fadeOutBgs(duration: number): void;
    export function fadeInBgs(duration: number): void;

    export function playMe(me: CurrentAudio): void;

    export function updateMeParameters(me: CurrentAudio): void;

    export function fadeOutMe(duration: number): void;

    export function stopMe(): void;

    export function playSe(se: CurrentAudio): void;

    export function updateSeParameters(buffer: WebAudio, se: CurrentAudio): void;

    export function cleanupSe(): void;

    export function stopSe(): void;

    export function playStaticSe(se: CurrentAudio): void;
    export function loadStaticSe(se: CurrentAudio): void;

    export function isStaticSe(se: CurrentAudio): boolean;

    export function stopAll(): void;

    export function saveBgm(): CurrentAudio;
    export function saveBgs(): CurrentAudio;

    export function makeEmptyAudioObject(): CurrentAudio;

    export function createBuffer(folder: string, name: string): WebAudio;
    export function updateBufferParameters(buffer: WebAudio, configVolume: number, audio: CurrentAudio): void;

    export function audioFileExt(): string;

    export function checkErrors(): void;
    export function throwLoadError(webAudio: WebAudio): void;

}

export { AudioManager, CurrentAudio };
