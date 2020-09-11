import { Stage } from "../rpg_core/Stage";
import { Bitmap } from "../rpg_core/Bitmap";



declare class SceneManager {

    private static _scene: Stage;
    private static _nextScene: Stage;
    private static _stack: Stage[];
    private static _exiting: boolean;
    private static _previousScene: Stage;
    private static _previousClass: Function;
    private static _backgroundBitmap: Bitmap;
    private static _smoothDeltaTime: number;
    private static _elapsedTime: number;

    public static run(sceneClass: Stage): void;
    public static initialize(): void;
    public static checkBrowser(): void;
    public static checkPluginErrors(): void;
    public static initGraphics(): void;
    public static initAudio(): void;
    public static initVideo(): void;
    public static initInput(): void;
    public static setupEventHandlers(): void;

    public static update(): void;
    public static determineRepeatNumber(deltaTime: number): number;
    public static terminate(): void;
    public static onError(event: { message: string, lineno: number, filename: string }): void;
    public static onReject(event: { message: string, reason: string }): void;
    public static onUnload(): void;
    public static onKeyDown(event: any): void;
    public static reloadGame(): void;
    public static showDevTools(): void;
    public static catchException(e: any): void;
    public static catchNormalError(e: any): void;
    public static catchLoadError(e: any): void;
    public static catchUnknownError(e: any): void;
    public static updateMain(): void;
    public static updateInputData(): void;
    public static updateEffekseer(): void;
    public static changeScene(): void;
    public static updateScene(): void;
    public static isGameActive(): boolean;
    public static onSceneTerminate(): void;
    public static onSceneCreate(): void;
    public static onBeforeSceneStart(): void;
    public static onSceneStart(): void;
    public static isSceneChanging(): boolean;
    public static isCurrenSceneBusy(): boolean;
    public static isNextScene(sceneClass: Function): boolean;
    public static isPreviousScene(sceneClass: Function): boolean;
    public static goto(sceneClass: Stage): void;
    public static push(sceneClass: Stage): void;
    public static pop(): void;
    public static exit(): void;
    public static clearStack(): void;
    public static stop(): void;
    public static prepareNextScene(): void;
    public static snap(): void;
    public static snapForBackground(): void;
    public static backgroundBitmap(): Bitmap;
    public static resume(): void;

}

export { SceneManager }
