declare namespace Utils {

    export const RPGMAKER_NAME: string;
    export const RPGMAKER_VERSION: string;

    export function canPlayOgg(): boolean;
    export function canPlayWebm(): boolean;
    export function canUseCssFontLoading(): boolean;
    export function canUseIndexedDB(): boolean;
    export function canUseWebAudioAPI(): boolean;
    export function canUseWebGL(): boolean;

    export function checkRMVersion(version: string): boolean;
    export function containsArabic(): boolean;
    export function decryptArrayBuffer(source: ArrayBuffer): ArrayBuffer;
    export function encodeURI(str: string): string;
    export function escapeHtml(str: string): string;
    export function hasEncryptedAudio(): boolean;
    export function isAndroidChrome(): boolean;
    export function isAtsumaru(): boolean;
    export function isLocal(): boolean;
    export function isMobileDevice(): boolean;
    export function isMobileSafari(): boolean;
    export function isNwjs(): boolean;
    export function isOptionValid(name: string): boolean;
    export function setEncryptionInfo(hasImages: boolean,hasAudio: boolean, key: string): void;

}

export { Utils };