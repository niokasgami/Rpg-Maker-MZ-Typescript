import {Stage} from "../rmmz_core";
import {WindowLayer} from "../rmmz_core";
import {ColorFilter} from "../rmmz_core";
import {Window} from "../rmmz_core";
import {Sprite} from "../rmmz_core";

declare abstract class Scene_Base extends Stage {

    protected _started: boolean;
    protected _active: boolean;
    protected _fadeSign: number;
    protected _fadeDuration: number;
    protected _fadeWhite: number;
    protected _fadeOpacity: number;
    protected _windowLayer: WindowLayer;
    protected _colorFilter: ColorFilter;

    protected constructor();

    /**
     * the create method of the scene.
     */
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

    public addWindow(window: Window): void;

    /**
     *
     * @param {number} duration the duration
     * @param {boolean} white whether the fadein should be white or not.
     */
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

    public onAutosaveFailure(): void;
}

export {Scene_Base}

