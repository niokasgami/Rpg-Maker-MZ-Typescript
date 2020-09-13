
interface ConfigData {
    alwaysDash: boolean;
    commandRemember: boolean;
    touchUI: boolean;
    bgmVolume: number;
    bgsVolume: number;
    meVolume: number;
    seVolume: number;
}

declare namespace ConfigManager {

    export let alwaysDash: boolean;
    export let commandRemember: boolean;
    export let touchUI: boolean;
    export let bgmVolume: number;
    export let bgsVolume: number;
    export let meVolume: number;
    export let seVolume: number;

    export function load(): void;
    export function save(): void;
    export function isLoaded(): boolean;
    export function makeData(): ConfigData;
    export function applyData(config: ConfigData): void;
    export function readFlag(config: ConfigData, name: string, defaultValue: ConfigData): ConfigData;
    export function readVolume(config: ConfigData, name: string): number;

}

export {
    ConfigManager,
    ConfigData
}