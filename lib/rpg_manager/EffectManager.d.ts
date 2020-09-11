import { EffekseerEffect } from "effekseer";

declare class EffectManager {

    private static _cache: Record<string, EffekseerEffect>;
    private static _errorUrls: string[];

    public static load(filename: string): EffekseerEffect;
    public static startLoading(url: string): EffekseerEffect;
    public static clear(): void;
    public static onLoad(): void;
    public static onError(url: string): void;
    public static makeUrl(filename: string): string;
    public static checkErrors(): void;
    public static throwLoadError(url: string): void;
    public static isReady(): boolean;

}

export { EffectManager }