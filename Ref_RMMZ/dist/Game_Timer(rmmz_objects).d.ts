declare function Game_Timer(...args: any[]): void;
declare class Game_Timer {
    constructor(...args: any[]);
    initialize(): void;
    _frames: any;
    _working: boolean;
    update(sceneActive: any): void;
    start(count: any): void;
    stop(): void;
    isWorking(): boolean;
    seconds(): number;
    onExpire(): void;
}
