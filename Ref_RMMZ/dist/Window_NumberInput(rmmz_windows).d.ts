declare function Window_NumberInput(...args: any[]): void;
declare class Window_NumberInput {
    constructor(...args: any[]);
    constructor: typeof Window_NumberInput;
    initialize(): void;
    _number: any;
    _maxDigits: any;
    openness: number;
    _canRepeat: boolean;
    setMessageWindow(messageWindow: any): void;
    _messageWindow: any;
    start(): void;
    updatePlacement(): void;
    width: number;
    height: any;
    x: number;
    y: any;
    windowWidth(): number;
    windowHeight(): any;
    maxCols(): any;
    maxItems(): any;
    itemWidth(): number;
    itemRect(index: any): any;
    isScrollEnabled(): boolean;
    isHoverEnabled(): boolean;
    createButtons(): void;
    _buttons: any[];
    placeButtons(): void;
    totalButtonWidth(): any;
    buttonSpacing(): number;
    buttonY(): any;
    update(): void;
    processDigitChange(): void;
    changeDigit(up: any): void;
    isTouchOkEnabled(): boolean;
    isOkEnabled(): boolean;
    isCancelEnabled(): boolean;
    processOk(): void;
    drawItem(index: any): void;
    onButtonUp(): void;
    onButtonDown(): void;
    onButtonOk(): void;
}
