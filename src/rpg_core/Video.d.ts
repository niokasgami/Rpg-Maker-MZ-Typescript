
declare class Video {

    public static initialize(width: number, height: number): void;
    public static isPlaying(): boolean;
    public static play(): void;
    public static resize(width: number, height: number): void;
    public static setVolume(volume: number): void;
    
}
export {Video}