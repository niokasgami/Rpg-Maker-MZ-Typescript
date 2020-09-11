

declare class Utils {

    public static readonly RPGMAKER_NAME: string;
    public static readonly RPGMAKER_VERSION: string;

    public static canPlayOgg(): boolean;
    public static canPlayWebm(): boolean;
    public static canUseCssFontLoading(): boolean;
    public static canUseIndexedDB(): boolean;
    public static canUseWebAudioAPI(): boolean;
    public static canUseWebGL(): boolean;
    public static checkRMVersion(version: string): boolean;
    public static containsArabic(): boolean;
    public static decryptArrayBuffer(source: ArrayBuffer): ArrayBuffer;
    public static encodeURI(str: string): string;
    public static escapeHtml(str: string): string;
    public static hasEncryptedAudio(): boolean;
    public static isAndroidChrome(): boolean;
    public static isAtsumaru(): boolean;
    public static isLocal(): boolean;
    public static isMobileDevice(): boolean;
    public static isMobileSafari(): boolean;
    public static isNwjs(): boolean;
    public static isOptionValid(name: string): boolean;
    public static setEncryptionInfo(hasImages: boolean,hasAudio: boolean, key: string): void;

}

export {
    Utils
}