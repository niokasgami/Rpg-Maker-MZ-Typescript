/**
 * @author Brandt (Masked)
 */

import { Sprite, Bitmap } from "../rmmz_core";

import { Game_Battler } from "../rmmz_objects";

declare class Sprite_Damage extends Sprite {

    constructor();
 
    setup(target: Game_Battler): void;
    setupCriticalEffect(): void;

    fontFace(): string;
    fontSize(): number;

    damageColor(): string;

    outlineColor(): string;
    outlineWidth(): number;

    createMiss(): void;

    createDigits(value: number): void;

    createChildSprite(width: number, height: number): Sprite;
    createBitmap(width: number, height: number): Bitmap;

    update(): void;

    updateChild(sprite: Sprite): void;

    updateFlash(): void;
    updateOpacity(): void;

    isPlaying(): boolean;

}

export { Sprite_Damage };
