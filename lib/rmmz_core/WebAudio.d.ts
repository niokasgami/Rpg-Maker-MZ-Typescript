declare class WebAudio {

    public pan: number;
    public pitch: number;
    public volume: number;

    public readonly url: string

    constructor(url: string);

    public static initialize(): boolean;
    public static setMasterVolume(value: number): void;

    public addLoadListener(listener: () => void): void;
    public addStopListener(listener: () => void): void;

    public fadeIn(duration: number): void;
    public fadeOut(duration: number): void;

    public isError(): boolean;
    public isPlaying(): boolean;
    public isReady(): boolean;

    public play(loop: boolean, offset: number): void;
    public retry(): void;
    public seek(): void;
    public stop(): void;

    public clear(): void;
    public destroy(): void;

}

export { WebAudio };
