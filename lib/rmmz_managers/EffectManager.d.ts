import { EffekseerEffect } from "effekseer";

declare namespace EffectManager {

    export function load(filename: string): EffekseerEffect;
    export function startLoading(url: string): EffekseerEffect;
    export function clear(): void;
    export function onLoad(): void;
    export function onError(url: string): void;
    export function makeUrl(filename: string): string;
    export function checkErrors(): void;
    export function throwLoadError(url: string): void;
    export function isReady(): boolean;

}

export { EffectManager }