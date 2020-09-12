import { Bitmap } from "../rmmz_core/Bitmap";

declare namespace ImageManager {

    export let iconWidth: number;
    export let iconHeight: number;
    export let faceWidth: number;
    export let faceHeight: number;

    export function loadAnimation(filename: string): Bitmap;
    export function loadBattleback1(filename: string): Bitmap;
    export function loadBattleback2(filename: string): Bitmap;
    export function loadEnemy(filename: string): Bitmap;
    export function loadCharacter(filename: string): Bitmap;
    export function loadFace(filename: string): Bitmap;
    export function loadParallax(filename: string): Bitmap;
    export function loadPicture(filename: string): Bitmap;
    export function loadSvActor(filename: string): Bitmap;
    export function loadSvEnemy(filename: string): Bitmap;
    export function loadSystem(filename: string): Bitmap;
    export function loadTileset(filename: string): Bitmap;
    export function loadTitle1(filename: string): Bitmap;
    export function loadTitle2(filename: string): Bitmap;

    export function loadBitmap(folder: string, filename: string): Bitmap;
    export function loadBitmapFromUrl(url: string): Bitmap;
    export function clear(): void;
    export function isReady(): boolean;
    export function throwLoadError(bitmap: Bitmap): void;
    export function isObjectCharacter(filename: string): boolean;
    export function isBigCharacter(filename: string): boolean;
    export function isZeroParallax(filename: string): boolean;

}

export { ImageManager }