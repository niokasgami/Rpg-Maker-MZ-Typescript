/**
 * The window in the game.
 *
 * @class
 * @extends PIXI.Container
 */
declare function Window(...args: any[]): void;
declare class Window {
    /**
     * The window in the game.
     *
     * @class
     * @extends PIXI.Container
     */
    constructor(...args: any[]);
    constructor: {
        new (): Window;
        prototype: Window;
    };
    initialize(): void;
    _isWindow: boolean;
    _windowskin: any;
    _width: any;
    _height: number;
    _cursorRect: Rectangle;
    _openness: number;
    _animationCount: number;
    _padding: number;
    _margin: number;
    _colorTone: any;
    _innerChildren: any[];
    _container: any;
    _backSprite: Sprite;
    _frameSprite: Sprite;
    _contentsBackSprite: Sprite;
    _cursorSprite: Sprite;
    _contentsSprite: Sprite;
    _downArrowSprite: Sprite;
    _upArrowSprite: Sprite;
    _pauseSignSprite: Sprite;
    /**
     * The origin point of the window for scrolling.
     *
     * @type Point
     */
    origin: Point;
    /**
     * The active state for the window.
     *
     * @type boolean
     */
    active: boolean;
    /**
     * The visibility of the frame.
     *
     * @type boolean
     */
    frameVisible: boolean;
    /**
     * The visibility of the cursor.
     *
     * @type boolean
     */
    cursorVisible: boolean;
    /**
     * The visibility of the down scroll arrow.
     *
     * @type boolean
     */
    downArrowVisible: boolean;
    /**
     * The visibility of the up scroll arrow.
     *
     * @type boolean
     */
    upArrowVisible: boolean;
    /**
     * The visibility of the pause sign.
     *
     * @type boolean
     */
    pause: boolean;
    set windowskin(arg: any);
    get windowskin(): any;
    set contents(arg: any);
    get contents(): any;
    set contentsBack(arg: any);
    get contentsBack(): any;
    set width(arg: any);
    get width(): any;
    set height(arg: any);
    get height(): any;
    set padding(arg: any);
    get padding(): any;
    set margin(arg: any);
    get margin(): any;
    set opacity(arg: number);
    get opacity(): number;
    set backOpacity(arg: number);
    get backOpacity(): number;
    set contentsOpacity(arg: number);
    get contentsOpacity(): number;
    set openness(arg: any);
    get openness(): any;
    get innerWidth(): number;
    get innerHeight(): number;
    get innerRect(): Rectangle;
    destroy(): void;
    update(): void;
    move(x: number, y: number, width: number, height: number): void;
    x: number;
    y: number;
    isOpen(): boolean;
    isClosed(): boolean;
    setCursorRect(x: number, y: number, width: number, height: number): void;
    moveCursorBy(x: number, y: number): void;
    moveInnerChildrenBy(x: number, y: number): void;
    setTone(r: number, g: number, b: number): void;
    addChildToBack(child: object): object;
    addInnerChild(child: object): object;
    updateTransform(): void;
    drawShape(graphics: any): void;
    _createAllParts(): void;
    _createContainer(): void;
    _createBackSprite(): void;
    _createFrameSprite(): void;
    _createClientArea(): void;
    _clientArea: Sprite;
    _createContentsBackSprite(): void;
    _createCursorSprite(): void;
    _createContentsSprite(): void;
    _createArrowSprites(): void;
    _createPauseSignSprites(): void;
    _onWindowskinLoad(): void;
    _refreshAllParts(): void;
    _refreshBack(): void;
    _refreshFrame(): void;
    _refreshCursor(): void;
    _setRectPartsGeometry(sprite: any, srect: any, drect: any, m: any): void;
    _refreshArrows(): void;
    _refreshPauseSign(): void;
    _updateClientArea(): void;
    _updateFrame(): void;
    _updateContentsBack(): void;
    _updateCursor(): void;
    _makeCursorAlpha(): number;
    _updateContents(): void;
    _updateArrows(): void;
    _updatePauseSign(): void;
    _updateFilterArea(): void;
}
