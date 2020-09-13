declare namespace Video {

    export function initialize(width: number, height: number): void;
    export function isPlaying(): boolean;
    export function play(): void;
    export function resize(width: number, height: number): void;
    export function setVolume(volume: number): void;
    
}

export { Video };
