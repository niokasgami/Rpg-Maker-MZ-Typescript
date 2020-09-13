/**
 * @author Brandt (Masked)
 */

import { RPG } from 'RPG';
import { Sprite, Rectangle } from 'rmmz_core';
import { Game_Battler } from 'rmmz_objects';

import { Sprite_Animation, Sprite_AnimationMV } from '.';

declare class Spriteset_Base<T, S> extends Sprite {

    constructor();

    loadSystemImages(): void;

    createLowerLayer(): void;
    createUpperLayer(): void;

    update(): void;

    createBaseSprite(): void;
    createBaseFilters(): void;

    createPictures(): void;
    pictureContainerRect(): Rectangle;

    createTimer(): void;

    createOverallFilters(): void;

    updateBaseFilters(): void;
    updateOverallFilters(): void;

    updatePosition(): void;

    findTargetSprite(target: T): S;

    updateAnimations(): void;
    processAnimationRequests(): void;
    createAnimation(): void;
    createAnimationSprite(): void;

    isMVAnimation(animation: RPG.DataAnimation): boolean;

    makeTargetSprites(targets: T[]): S[];

    lastAnimationSprite(): Sprite_Animation | Sprite_AnimationMV;
    isAnimationForEach(animation: RPG.DataAnimation): boolean;

    animationBaseDelay(): number;
    animationNextDelay(): number;

    animationShouldMirror(target: Game_Battler): boolean;

    removeAnimation(sprite: Sprite_Animation | Sprite_AnimationMV): void;
    removeAllAnimations(): void;

    isAnimationPlaying(): boolean;

}

export { Spriteset_Base };
