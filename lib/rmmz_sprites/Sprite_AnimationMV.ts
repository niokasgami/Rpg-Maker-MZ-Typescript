/**
 * @author Brandt (Masked)
 */

import { RPG } from 'RPG';

import { RGBA, Sprite } from 'rmmz_core';
import { Game_Battler } from 'rmmz_objects';

declare class Sprite_AnimationMV extends Sprite {

    constructor();

    initMembers(): void;

    setup(
        targets: Game_Battler[],
        animation: RPG.DataAnimation, // TODO: DataAnimationMV
        mirror: boolean,
        delay: number
    ): void;

    setupRate(): number;

    setupDuration(): number;

    updateFlash(): void;
    updateScreenFlash(): void;

    absoluteX(): number;
    absoluteY(): number;

    updateHiding(): void;

    isPlaying(): boolean;

    loadBitmaps(): void;

    isReady(): boolean;

    createCellSprites(): void;
    createScreenFlashSprite(): void;

    updateMain(): void;
    updatePosition(): void;

    updateFrame(): void;

    currentFrameIndex(): number;

    updateAllCellSprites(frame: number[][]): void; // TODO: DataAnimationMV
    updateCellSprite(sprite: Sprite, cell: number[]): void;

    processTimingData(timing: unknown): void; // TODO: DataAnimationMV

    startFlash(color: RGBA, duration: number): void;
    startScreenFlash(color: RGBA, duration: number): void;

    startHiding(duration: number): void;

    onEnd(): void;
}

export { Sprite_AnimationMV };
