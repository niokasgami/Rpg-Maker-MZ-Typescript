/**
 * The static class that defines utility methods.
 *
 * @namespace
 */
declare function Utils(): void;
declare namespace Utils {
    const RPGMAKER_NAME: string;
    const RPGMAKER_VERSION: string;
    function checkRMVersion(version: string): boolean;
    function isOptionValid(name: string): boolean;
    function isNwjs(): boolean;
    function isMobileDevice(): boolean;
    function isMobileSafari(): boolean;
    function isAndroidChrome(): boolean;
    function isLocal(): boolean;
    function canUseWebGL(): boolean;
    function canUseWebAudioAPI(): boolean;
    function canUseCssFontLoading(): boolean;
    function canUseIndexedDB(): boolean;
    function canPlayOgg(): boolean;
    function canPlayWebm(): boolean;
    function encodeURI(str: string): string;
    function escapeHtml(str: string): string;
    function containsArabic(str: any): boolean;
    function setEncryptionInfo(hasImages: boolean, hasAudio: boolean, key: string): void;
    function hasEncryptedImages(): boolean;
    function hasEncryptedAudio(): boolean;
    function decryptArrayBuffer(source: ArrayBuffer): ArrayBuffer;
}
