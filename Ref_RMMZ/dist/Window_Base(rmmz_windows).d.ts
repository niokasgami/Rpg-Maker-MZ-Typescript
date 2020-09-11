declare function Window_Base(...args: any[]): void;
declare class Window_Base {
    constructor(...args: any[]);
    constructor: typeof Window_Base;
    initialize(rect: any): void;
    _opening: boolean;
    _closing: boolean;
    _dimmerSprite: Sprite;
    destroy(options: any): void;
    checkRectObject(rect: any): void;
    lineHeight(): number;
    itemWidth(): any;
    itemHeight(): number;
    itemPadding(): number;
    baseTextRect(): Rectangle;
    loadWindowskin(): void;
    windowskin: any;
    updatePadding(): void;
    padding: any;
    updateBackOpacity(): void;
    backOpacity: number;
    fittingHeight(numLines: any): number;
    updateTone(): void;
    createContents(): void;
    contents: Bitmap;
    contentsBack: Bitmap;
    destroyContents(): void;
    contentsWidth(): any;
    contentsHeight(): any;
    resetFontSettings(): void;
    resetTextColor(): void;
    update(): void;
    updateOpen(): void;
    updateClose(): void;
    open(): void;
    close(): void;
    isOpening(): boolean;
    isClosing(): boolean;
    show(): void;
    visible: boolean;
    hide(): void;
    activate(): void;
    active: boolean;
    deactivate(): void;
    systemColor(): any;
    translucentOpacity(): number;
    changeTextColor(color: any): void;
    changeOutlineColor(color: any): void;
    changePaintOpacity(enabled: any): void;
    drawRect(x: any, y: any, width: any, height: any): void;
    drawText(text: any, x: any, y: any, maxWidth: any, align: any): void;
    textWidth(text: any): number;
    drawTextEx(text: any, x: any, y: any, width: any): number;
    textSizeEx(text: any): {
        width: number;
        height: number;
    };
    createTextState(text: any, x: any, y: any, width: any): {
        text: any;
        index: number;
        x: any;
        y: any;
        width: any;
        height: number;
        startX: any;
        startY: any;
        rtl: boolean;
        buffer: string;
        drawing: boolean;
        outputWidth: number;
        outputHeight: number;
    };
    processAllText(textState: any): void;
    flushTextState(textState: any): void;
    createTextBuffer(rtl: any): "" | "‫";
    convertEscapeCharacters(text: any): any;
    actorName(n: any): any;
    partyMemberName(n: any): any;
    processCharacter(textState: any): void;
    processControlCharacter(textState: any, c: any): void;
    processNewLine(textState: any): void;
    obtainEscapeCode(textState: any): string;
    obtainEscapeParam(textState: any): number | "";
    processEscapeCharacter(code: any, textState: any): void;
    processColorChange(colorIndex: any): void;
    processDrawIcon(iconIndex: any, textState: any): void;
    makeFontBigger(): void;
    makeFontSmaller(): void;
    calcTextHeight(textState: any): number;
    maxFontSizeInLine(line: any): number;
    drawIcon(iconIndex: any, x: any, y: any): void;
    drawFace(faceName: any, faceIndex: any, x: any, y: any, width: any, height: any): void;
    drawCharacter(characterName: any, characterIndex: any, x: any, y: any): void;
    drawItemName(item: any, x: any, y: any, width: any): void;
    drawCurrencyValue(value: any, unit: any, x: any, y: any, width: any): void;
    setBackgroundType(type: any): void;
    opacity: number;
    showBackgroundDimmer(): void;
    createDimmerSprite(): void;
    hideBackgroundDimmer(): void;
    updateBackgroundDimmer(): void;
    refreshDimmerBitmap(): void;
    playCursorSound(): void;
    playOkSound(): void;
    playBuzzerSound(): void;
}
