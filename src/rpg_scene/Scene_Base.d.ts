import { Stage } from "../rpg_core/Stage";
import { WindowLayer } from "../rpg_core/WindowLayer";
import { ColorFilter } from "../rpg_core/ColorFilter";
import { Window } from "../rpg_core/Window";
import { Sprite } from "../rpg_core/Sprite";

export abstract class Scene_Base extends Stage {

    protected _started: boolean;
    protected _active: boolean;
    protected _fadeSign: number;
    protected _fadeDuration: number;
    protected _fadeWhite: number;
    protected _fadeOpacity: number;
    protected _windowLayer: WindowLayer;
    protected _colorFilter: ColorFilter;

    constructor(...arguments: IArguments);
    public abstract initialize(...arguments: IArguments): void;
    public abstract create(): void;
    public isActive(): boolean;
    public isReady(): boolean;
    public start(): void;
    public update(): void;
    public stop(): void;
    public isStarted(): boolean;
    public isBusy(): boolean;
    public isFading(): boolean;
    public terminate(): void;
    public createWindowLayer(): void;
    public addWindow(window: Window) : void;
    public startFadeIn(duration: number, white?: boolean): void;
    public startFadeOut(duration: number, white?: boolean): void;
    public createColorFilter(): void;
    public updateColorFilter(): void;
    public updateFade(): void;
    public updateChildren(): void;
    public popScene(): void;
    public checkGameover(): void;
    public fadeOutAll(): void;
    public fadeSpeed(): number;
    public slowFadeSpeed(): number;
    public scaleSprite(): void;
    public centerSprite(sprite: Sprite): void;
    public isBottomHelpMode(): boolean;
    public isBottomButtonMode(): boolean;
    public isRightInputMode(): boolean;
    public mainCommandWidth(): number;
    public buttonAreaTop(): number;
    public buttonAreaBottom(): number;
    public buttonAreaHeight(): number;
    public buttonY(): number;
    public calcWindowHeight(numLines: number, selectable: boolean): number;
    public requestAutosave(): void;
    public isAutosaveEnabled(): boolean;
    public executeAutosave(): void;
    public onAutosaveSucess(): void;
}
