import { Bitmap, Stage } from "../rmmz_core";

declare type SceneConstructor = new () => Stage;

declare namespace SceneManager {

    export function run(sceneClass: SceneConstructor): void;
    export function initialize(): void;
    export function checkBrowser(): void;
    export function checkPluginErrors(): void;
    export function initGraphics(): void;
    export function initAudio(): void;
    export function initVideo(): void;
    export function initInput(): void;
    export function setupEventHandlers(): void;

    export function update(): void;
    export function determineRepeatNumber(deltaTime: number): number;
    export function terminate(): void;
    export function onError(event: ErrorEvent): void;
    export function onReject(event: PromiseRejectionEvent): void;
    export function onUnload(): void;
    export function onKeyDown(event: KeyboardEvent): void;
    export function reloadGame(): void;
    export function showDevTools(): void;
    export function catchException(e: Error): void;
    export function catchNormalError(e: Error): void;
    export function catchLoadError(e: ['LoadError', string, () => void]): void;
    export function catchUnknownError(e: unknown): void;
    export function updateMain(): void;
    export function updateInputData(): void;
    export function updateEffekseer(): void;
    export function changeScene(): void;
    export function updateScene(): void;
    export function isGameActive(): boolean;
    export function onSceneTerminate(): void;
    export function onSceneCreate(): void;
    export function onBeforeSceneStart(): void;
    export function onSceneStart(): void;
    export function isSceneChanging(): boolean;
    export function isCurrenSceneBusy(): boolean;
    export function isNextScene(sceneClass: SceneConstructor): boolean;
    export function isPreviousScene(sceneClass: SceneConstructor): boolean;
    export function goto(sceneClass: SceneConstructor): void;
    export function push(sceneClass: SceneConstructor): void;
    export function pop(): void;
    export function exit(): void;
    export function clearStack(): void;
    export function stop(): void;
    export function prepareNextScene(): void;
    export function snap(): void;
    export function snapForBackground(): void;
    export function backgroundBitmap(): Bitmap;
    export function resume(): void;

}

export { SceneManager };
