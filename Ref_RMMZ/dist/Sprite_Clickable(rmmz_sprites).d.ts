declare function Sprite_Clickable(...args: any[]): void;
declare class Sprite_Clickable {
    constructor(...args: any[]);
    constructor: typeof Sprite_Clickable;
    initialize(): void;
    _pressed: boolean;
    _hovered: boolean;
    update(): void;
    processTouch(): void;
    isPressed(): boolean;
    isClickEnabled(): any;
    isBeingTouched(): any;
    hitTest(x: any, y: any): any;
    onMouseEnter(): void;
    onMouseExit(): void;
    onPress(): void;
    onClick(): void;
}
