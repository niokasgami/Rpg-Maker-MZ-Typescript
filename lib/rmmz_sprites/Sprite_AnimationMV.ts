/**
 * @author Brandt (Masked)
 */

import { RPG } from '../RPG';

import { RGBA, Sprite } from '../rmmz_core';

declare class Sprite_AnimationMV extends Sprite {

    constructor();

    public initMembers(): void;

    public setup(
        targets: Game_Battler[],
        animation: RPG.DataAnimation, // TODO: DataAnimationMV
        mirror: boolean,
        delay: number
    ): void;

    public setupRate(): number;

    public setupDuration(): number;

    public updateFlash(): void;
    public updateScreenFlash(): void;

    public absoluteX(): number;
    public absoluteY(): number;

    public updateHiding(): void;

    public isPlaying(): boolean;

    public loadBitmaps(): void;

    public isReady(): boolean;

    public createCellSprites(): void;
    public createScreenFlashSprite(): void;

    public updateMain(): void;
    public updatePosition(): void;

    public updateFrame(): void;

    public currentFrameIndex(): number;

    public updateAllCellSprites(frame: number[][]): void; // TODO: DataAnimationMV
    public updateCellSprite(sprite: Sprite, cell: number[]): void;

    public processTimingData(timing: unknown): void; // TODO: DataAnimationMV

    public startFlash(color: RGBA, duration: number): void;
    public startScreenFlash(color: RGBA, duration: number): void;

    public startHiding(duration: number): void;

    public onEnd(): void;
}

export { Sprite_AnimationMV };
