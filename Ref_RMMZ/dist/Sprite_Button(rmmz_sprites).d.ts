declare function Sprite_Button(...args: any[]): void;
declare class Sprite_Button {
    constructor(...args: any[]);
    constructor: typeof Sprite_Button;
    initialize(buttonType: any): void;
    _buttonType: any;
    _clickHandler: any;
    _coldFrame: Rectangle;
    _hotFrame: Rectangle;
    setupFrames(): void;
    blockWidth(): number;
    blockHeight(): number;
    loadButtonImage(): void;
    bitmap: any;
    buttonData(): any;
    update(): void;
    checkBitmap(): void;
    updateFrame(): void;
    updateOpacity(): void;
    opacity: number;
    setColdFrame(x: any, y: any, width: any, height: any): void;
    setHotFrame(x: any, y: any, width: any, height: any): void;
    setClickHandler(method: any): void;
    onClick(): void;
}
