import { Stage } from "../rpg_core/Stage";
import { Bitmap } from "../rpg_core/Bitmap";

declare type SceneConstructor = new () => Stage;

declare class SceneManager {

    private static _scene: Stage;
    private static _nextScene: SceneConstructor;
    private static _stack: SceneConstructor[];
    private static _exiting: boolean;
    private static _previousScene: SceneConstructor;
    private static _previousClass: SceneConstructor;
    private static _backgroundBitmap: Bitmap;
    private static _smoothDeltaTime: number;
    private static _elapsedTime: number;

    public static run(sceneClass: SceneConstructor): void;
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
    public static onError(event: ErrorEvent): void;
    public static onReject(event: PromiseRejectionEvent): void;
    public static onUnload(): void;
    public static onKeyDown(event: KeyboardEvent): void;
    public static reloadGame(): void;
    public static showDevTools(): void;
    public static catchException(e: Error): void;
    public static catchNormalError(e: Error): void;
    public static catchLoadError(e: ['LoadError', string, () => void]): void;
    public static catchUnknownError(e: unknown): void;
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
    public static isNextScene(sceneClass: SceneConstructor): boolean;
    public static isPreviousScene(sceneClass: SceneConstructor): boolean;
    public static goto(sceneClass: SceneConstructor): void;
    public static push(sceneClass: SceneConstructor): void;
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
