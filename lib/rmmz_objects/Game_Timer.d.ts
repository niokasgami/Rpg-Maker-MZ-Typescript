
declare class Game_Timer {

    private _frames: number;
    private _working: boolean;
    constructor();

    public initialize(): void;
    public update(sceneActive: boolean): void;
    public start(count: number): void;
    public stop(): void;
    public isWorking(): boolean;
    public seconds(): number;
    public onExpire(): void;

}

export {Game_Timer}