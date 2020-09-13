/**
 * @author Brandt (Masked)
 */

import { RPG } from '../RPG';
import { Sprite, Rectangle } from '../rmmz_core';
import { Game_Battler } from '../rmmz_objects';

import { Sprite_Animation, Sprite_AnimationMV } from '.';

declare class Spriteset_Base<T, S> extends Sprite {

    constructor();

    public loadSystemImages(): void;

    public createLowerLayer(): void;
    public createUpperLayer(): void;

    public update(): void;

    public createBaseSprite(): void;
    public createBaseFilters(): void;

    public createPictures(): void;
    public pictureContainerRect(): Rectangle;

    public createTimer(): void;

    public createOverallFilters(): void;

    public updateBaseFilters(): void;
    public updateOverallFilters(): void;

    public updatePosition(): void;

    public findTargetSprite(target: T): S;

    public updateAnimations(): void;
    public processAnimationRequests(): void;
    public createAnimation(): void;
    public createAnimationSprite(): void;

    public isMVAnimation(animation: RPG.DataAnimation): boolean;

    public makeTargetSprites(targets: T[]): S[];

    public lastAnimationSprite(): Sprite_Animation | Sprite_AnimationMV;
    public isAnimationForEach(animation: RPG.DataAnimation): boolean;

    public animationBaseDelay(): number;
    public animationNextDelay(): number;

    public animationShouldMirror(target: Game_Battler): boolean;

    public removeAnimation(sprite: Sprite_Animation | Sprite_AnimationMV): void;
    public removeAllAnimations(): void;

    public isAnimationPlaying(): boolean;

}

export { Spriteset_Base };
