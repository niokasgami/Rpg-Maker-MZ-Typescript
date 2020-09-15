import {Scene_Base} from ".";
import {Window_TitleCommand} from "../rmmz_windows";
import {Rectangle, Sprite} from "../rmmz_core";


declare class Scene_Title extends Scene_Base {

    protected _commandWindow: Window_TitleCommand<any>
    protected _gameTitleSprite: Sprite;
    protected _backSprite1: Sprite;
    protected _backSprite2: Sprite;

    constructor(...arguments: any[]);

    public initialize(): void;

    public create(): void;

    public start(): void;

    public update(): void;

    public isBusy(): boolean;

    public createBackground(): void;

    public createForeground(): void;

    public drawGameTitle(): void;

    public adjustBackground(): void;

    public createCommandWindw(): void;

    public commandWindowRect(): Rectangle;

    public commandNewGame(): void;

    public commandContinue(): void;

    public commandOptions(): void;

    public playTitleMusic(): void;
}

export {Scene_Title}