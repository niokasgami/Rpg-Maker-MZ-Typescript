
declare class Game_Temp {

    private _isPlaytest: boolean;
    private _destinationX: number;
    private _destinationY: number;
    private _touchTarget: unknown;
    private _touchState: string;
    private _needBattleRefresh: boolean;
    private _commonEventQueue: unknown[];
    private _animationQueue: unknown[];
    private _balloonQueue: unknown[];
    private _lastActionData: number[];

    constructor();

    public initialize(): void;
    public isPlayTest(): boolean;
    public setDestination(x: number,y: number): void;
    public clearDestination(): void;
    public isDestinationValid(): boolean;
    public destinationX(): number;
    public destinationY(): number;
    public setTouchState(target : unknown, state: string): void;
    public clearTouchState(): void;
    public touchTarget(): unknown;
    public touchState(): string;
    public requestBattleRefresh(): void;
    public clearBattleRefreshRequest(): void;
    public isBattleRefreshRequested(): boolean;
    public reserveCommonEvent(commonEventId: number): void;
    public retrieveCommonEvent(): RPG.DataCommonEvent;
    public isCommonEventReserved(): boolean;
    public requestAnimation(targets: unknown, animationId: number, mirror: boolean = false): void;
    public retrieveAnimation(): unknown;
    public requestBalloon(target: unknown, balloonId: number): void;
    public retrieveBalloon(): unknown;

    // TODO : finish Game_Temp?
}