declare function ConfigManager(): void;
declare namespace ConfigManager {
    const alwaysDash: boolean;
    const commandRemember: boolean;
    const touchUI: boolean;
    const _isLoaded: boolean;
    const bgmVolume: number;
    const bgsVolume: any;
    const meVolume: any;
    const seVolume: any;
    function load(): void;
    function save(): void;
    function isLoaded(): boolean;
    function makeData(): {
        alwaysDash: boolean;
        commandRemember: boolean;
        touchUI: boolean;
        bgmVolume: number;
        bgsVolume: any;
        meVolume: any;
        seVolume: any;
    };
    function applyData(config: any): void;
    function readFlag(config: any, name: any, defaultValue: any): any;
    function readVolume(config: any, name: any): any;
}
