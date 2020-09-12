
interface configData {
    alwaysDash: boolean;
    commandRemember: boolean;
    touchUI: boolean;
    bgmVolume: number;
    bgsVolume: number;
    meVolume: number;
    seVolume: number;
}

declare class ConfigManager {

    public static alwaysDash: boolean;
    public static commandRemember: boolean;
    public static touchUI: boolean;
    private static _isLoaded: boolean;

    private static _bgmVolume: number;
    private static _bgsVolume: number;
    private static _meVolume: number;
    private static _seVolume: number;

    constructor();

    public static get bgmVolume(): number;
    public static set bgmVolume(value: number);

    public static get bgsVolume(): number;
    public static set bgsVolume(value: number);

    public static get meVolume(): number;
    public static set meVolume(value: number);
    
    public static get seVolume(): number;
    public static set seVolume(value: number);

    public static load(): void;
    public static save(): void;
    public static isLoaded(): boolean;
    public static makeData(): configData;
    public static applyData(config: configData): void;
    public static readFlag(config: configData, name: string, defaultValue: configData): configData;
    public static readVolume(config: configData, name: string): number;

}

export {
    ConfigManager,
    configData
}