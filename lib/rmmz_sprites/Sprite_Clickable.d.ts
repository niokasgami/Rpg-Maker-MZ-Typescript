import { Sprite, Rectangle } from "../rmmz_core";


declare abstract class Sprite_Clickable extends Sprite {

    private _pressed: boolean;
    private _hovered: boolean;

    constructor();

    public initialize(): void;

    public update(): void;
    public processTouch(): void;
    public isPressed(): boolean;
    public isClickEnabled(): boolean;
    public isBeingTouched(): boolean;
    public hitTest(x: number, y: number): Rectangle;
    public abstract onMouseEnter(): void;
    public abstract onMouseExit(): void;
    public abstract onPress(): void;
    public abstract onClick(): void;
}
export { Sprite_Clickable }