import { Bitmap } from "../rpg_core/Bitmap";

declare class ImageManager {

    public static iconWidth: number;
    public static iconHeight: number;
    public static faceWidth: number;
    public static faceHeight: number;

    private static _cache: Record<string, Bitmap>;
    private static _system: Record<string, Bitmap>;
    private static _newBitmap: Bitmap;

    public static loadAnimation(filename: string): Bitmap;
    public static loadBattleback1(filename: string): Bitmap;
    public static loadBattleback2(filename: string): Bitmap;
    public static loadEnemy(filename: string): Bitmap;
    public static loadCharacter(filename: string): Bitmap;
    public static loadFace(filename: string): Bitmap;
    public static loadParallax(filename: string): Bitmap;
    public static loadPicture(filename: string): Bitmap;
    public static loadSvActor(filename: string): Bitmap;
    public static loadSvEnemy(filename: string): Bitmap;
    public static loadSystem(filename: string): Bitmap;
    public static loadTileset(filename: string): Bitmap;
    public static loadTitle1(filename: string): Bitmap;
    public static loadTitle2(filename: string): Bitmap;

    public static loadBitmap(folder: string, filename: string): Bitmap;
    public static loadBitmapFromUrl(url: string): Bitmap;
    public static clear(): void;
    public static isReady(): boolean;
    public static throwLoadError(bitmap: Bitmap): void;
    public static isObjectCharacter(filename: string): boolean;
    public static isBigCharacter(filename: string): boolean;
    public static isZeroParallax(filename: string): boolean;
}

export { ImageManager }