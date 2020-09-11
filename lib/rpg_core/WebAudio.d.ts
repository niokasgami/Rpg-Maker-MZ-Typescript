
declare class WebAudio {

    public pan: number;
    public pitch: number;
    public volume: number;
    public readonly url: string
    constructor(url: string);

    public static initialize(): boolean;
    public static setMasterVolume(value: number): void;
    public addLoadListener(listner: Function): void;
    public addStopListener(listner: Function): void;

    public clear(): void;
    public destroy(): void;
    public fadeIn(duration: number): void;
    public fadeOut(duration: number): void;
    public isError(): boolean;
    public isPlaying(): boolean;
    public isReady(): boolean;
    public play(loop: boolean, offset: number): void;
    public retry(): void;
    public seek(): void;
    public stop(): void;
}

export { WebAudio }