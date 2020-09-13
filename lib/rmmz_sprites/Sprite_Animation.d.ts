/**
 * @author Brandt (Masked)
 */

import * as PIXI from 'pixi.js';

import { RPG } from '../RPG';

import { Sprite, Point } from '../rmmz_core';

import { Game_Battler } from '../rmmz_objects';

import { Sprite_AnimationMV } from '.';

declare class Sprite_Animation extends Sprite {

    constructor();

    public initMembers(): void;

    public setup(
        targets: Game_Battler[],
        animation: RPG.DataAnimation,
        mirror: boolean,
        delay: number,
        previous: Sprite_Animation | Sprite_AnimationMV
    ): void;

    public canStart(): boolean;

    public shouldWaitForPrevious(): boolean;

    public updateEffectGeometry(): void;
    public updateMain(): void;

    public processSoundTimings(): void;
    public processFlashTimings(): void;

    public checkEnd(): void;

    public updateFlash(): void;

    public isPlaying(): boolean;

    public setRotation(x: number, y: number, z: number): void;

    public setProjectionMatrix(renderer: PIXI.Renderer): void;
    public setCameraMatrix(renderer: PIXI.Renderer): void;
    public setViewport(renderer: PIXI.Renderer): void;

    public targetPosition(renderer: PIXI.Renderer): Point;
    public targetSpritePosition(sprite: Sprite): Point;

    public saveViewport(renderer: PIXI.Renderer): void;
    public resetViewport(renderer: PIXI.Renderer): void;

    public onBeforeRender(renderer: PIXI.Renderer): void;
    public onAfterRender(renderer: PIXI.Renderer): void;

}

export { Sprite_Animation };
