import { Game_Picture } from "./Game_Picture";

declare class Game_Screen {

    private _brightness: number;
    private _fadeOutDuration: number;
    private _fadeInDuration: number;

    private _tone: number[];
    private _toneTarget: number[];
    private _toneDuration: number;

    private _flashColor: number[];
    private _flashDuration: number;

    private _shake: number;
    private _shakePower: number;
    private _shakeSpeed: number;
    private _shakeDuration: number;
    private _shakeDirection: number;

    private _zoomX: number;
    private _zoomY: number;
    private _zoomScale: number;
    private _zoomScaleTarget: number;
    private _zoomDuration: number;

    private _weatherType: string;
    private _weatherPower: number;
    private _weatherPowerTarget: number;
    private _weatherDuration: number;

    private _pictures: Game_Pictures[];

    constructor();
    public initialize(): void;
    public clear(): void;
    public onBattleStart(): void;
    public brightness(): number;
    public tone(): number[];
    public flashColor(): number[];
    public shake(): number;
    public zoomX(): number;
    public zoomY(): number;
    public zoomScale(): number;
    public weatherType(): string;
    public weatherPower(): number;
    public picture(pictureId: number): Game_Picture;
    public realPictureId(pictureId: number): Game_Picture;
    public clearFade(): void;
    public clearTone(): void;
    public clearFlash(): void;
    public clearShake(): void;
    public clearZoom(): void;
    public clearWeather(): void;
    public clearPictures(): void;
    public eraseBattlePictures(): void;
    public maxPictures(): number;
    public startFadeOut(duration: number): void;
    public startFadeIn(duration: number): void;
    public startTint(tone: number[], duration: number): void;
    public startFlash(color: number[], duration: number): void;
    public startShake(power: number, speed: number, duration: number): void;
    public startZoom(x: number, y: number, scale: number, duration: number): void;
    public setZoom(x: number, y: number, scale: number): void;
    public changeWeather(type: string, power: number, duration: number): void;
    public update(): void;
    public updateFadeOut(): void;
    public updateFadeIn(): void;
    public updateTone(): void;
    public updateFlash(): void;
    public updateShake(): void;
    public updateZoom(): void;
    public updateWeather(): void;
    public updatePictures(): void;
    public startFlashForDamage(): void;
    public showPicture(pictureId: number, name: string, origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number): void;
    public movePicture(pictureId: number, name: string, origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number, duration: number, easingType: number): void;
    public rotatePicture(pictureId: number, speed: number): void;
    public tintPicture(pictureId: number, tone: number[], duration: number): void;
    public erasePicture(pictureId: number): void;
}
export { Game_Screen }