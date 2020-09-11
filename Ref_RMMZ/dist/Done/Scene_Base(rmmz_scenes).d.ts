declare class Scene_Base {
    _started: boolean;
    _active: boolean;
    _fadeSign: number;
    _fadeDuration: any;
    _fadeWhite: any;
    _fadeOpacity: number;
    _windowLayer: WindowLayer;
    _colorFilter: ColorFilter;
    filters: ColorFilter[];

    constructor(...args: any[]);

    initialize(): void;

    create(): void;

    isActive(): boolean;

    isReady(): boolean;

    start(): void;

    update(): void;

    stop(): void;

    isStarted(): boolean;

    isBusy(): boolean;

    isFading(): boolean;

    terminate(): void;

    createWindowLayer(): void;

    addWindow(window: any): void;

    startFadeIn(duration: any, white: any): void;

    startFadeOut(duration: any, white: any): void;

    createColorFilter(): void;

    updateColorFilter(): void;
    updateFade(): void;
    updateChildren(): void;
    popScene(): void;
    checkGameover(): void;
    fadeOutAll(): void;
    fadeSpeed(): number;
    slowFadeSpeed(): number;
    scaleSprite(sprite: any): void;
    centerSprite(sprite: any): void;
    isBottomHelpMode(): boolean;
    isBottomButtonMode(): boolean;
    isRightInputMode(): boolean;
    mainCommandWidth(): number;
    buttonAreaTop(): number;
    buttonAreaBottom(): number;
    buttonAreaHeight(): number;
    buttonY(): number;
    calcWindowHeight(numLines: any, selectable: any): any;
    requestAutosave(): void;
    isAutosaveEnabled(): any;
    executeAutosave(): void;
    onAutosaveSuccess(): void;
    onAutosaveFailure(): void;
}
