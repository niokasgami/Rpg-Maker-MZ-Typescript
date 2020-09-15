import {Scene_Base} from ".";
import {Game_Actor} from "../rmmz_objects";
import * as PIXI from "pixi.js";
import {Rectangle, Sprite} from "../rmmz_core";
import {Window_Help} from "../rmmz_windows";
import {Sprite_Button} from "../rmmz_sprites";

declare class Scene_MenuBase extends Scene_Base {

    protected _actor: Game_Actor;
    protected _backgroundFilter: PIXI.filters.BlurFilter;
    protected _backgroundSprite: Sprite;
    protected _helpWindow: Window_Help;
    protected _cancelButton: Sprite_Button;
    protected _pageupButton: Sprite_Button;
    protected _pagedownButton: Sprite_Button;

    constructor();

    public initialize(): void;

    public create(): void;

    public update(): void;

    public helpAreaTop(): number;

    public helpAreaBottom(): number;

    public helpAreaHeight(): number;

    public mainAreaTop(): number;

    public mainAreaBottom(): number;

    public mainAreaHeight(): number;

    public actor(): Game_Actor;

    public updateActor(): void;

    public createBackground(): void;

    public setBackgroundOpacity(opacity: number): void;

    public helpWindowRect(): Rectangle;

    public createButtons(): void;

    public needsCancelButton(): boolean;

    public createCancelButton(): void;

    public needsPageButtons(): boolean;

    public createPageButtons(): void;

    public updatePageButtons(): void;

    public arePageButtonsEnabled(): boolean;

    public nextActor(): void;

    public previousActor(): void;

    public onActorChange(): void;

}

export {Scene_MenuBase}