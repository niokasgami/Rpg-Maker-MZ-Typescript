declare function Sprite_Damage(...args: any[]): void;
declare class Sprite_Damage {
    constructor(...args: any[]);
    constructor: typeof Sprite_Damage;
    initialize(): void;
    _duration: number;
    _flashColor: number[];
    _flashDuration: number;
    _colorType: number;
    destroy(options: any): void;
    setup(target: any): void;
    setupCriticalEffect(): void;
    fontFace(): any;
    fontSize(): any;
    damageColor(): "#ffffff" | "#b9ffb5" | "#ffff90" | "#80b0ff" | "#808080";
    outlineColor(): string;
    outlineWidth(): number;
    createMiss(): void;
    createDigits(value: any): void;
    createChildSprite(width: any, height: any): Sprite;
    createBitmap(width: any, height: any): Bitmap;
    update(): void;
    updateChild(sprite: any): void;
    updateFlash(): void;
    updateOpacity(): void;
    opacity: number;
    isPlaying(): boolean;
}
