
declare class Game_Picture {

    private _name: string;
    private _origin: number;
    private _x: number;
    private _y: number;
    private _scaleX: number;
    private _scaleY: number;
    private _opacity: number;
    private _blendMode: number;
    private _tone: number[];
    private _angle: number;
    private _targetScaleX: number;
    private _targetScaleY: number;
    private _targetOpacity: number; 
    private _wholeDuration: number;
    private _easingType: number;
    private _easingExponent: number;
    private _toneTarget: number[];
    private _toneDuration: number;
    private _rotationSpeed: number;

    constructor();

    public initialize(): void;
    public name(): string;
    public origin(): number;
    public x(): number;
    public y(): number;
    public scaleX(): number;
    public scaleY(): number;
    public opacity(): number;
    public blendMode(): number;
    public tone(): number;
    public angle(): number;
    public initBasic(): void;
    public initTarget(): void;
    public initTone(): void;
    public initRotation(): void;
    public show(name: string, origin: number, x: number,y: number, scaleX: number,scaleY: number, opacity: number, blendMode: number): void;
    public move(origin: number, x: number,y: number, scaleX: number,scaleY: number, opacity: number, blendMode: number, duration: number, easingType: number): void;
    public rotate(speed: number): void;
    public tint(tone: number[], duration: number): void;
    public update(): void;
    public updateMove(): void;
    public updateTone(): void;
    public updateRotation(): void;
    public applyEasing(current: number, target: number): void;
    public calcEasing(t: number): number;
    public easeIn(t: number, exponent: number): number;
    public easeOut(t: number, exponent: number): number;
    public easeOut(t: number,exponent: number): number;
    public easeInOut(t: number, exponent: number): number;
}

export {Game_Picture}