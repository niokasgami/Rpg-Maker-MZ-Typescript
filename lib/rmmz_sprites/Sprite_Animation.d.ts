/**
 * @author Brandt (Masked)
 */

import * as PIXI from 'pixi.js';

import { RPG } from "../RPG";

import { Sprite, Point } from "../rmmz_core";

import { Game_Battler } from "../rmmz_objects";

import { Sprite_AnimationMV } from '.';

declare class Sprite_Animation extends Sprite {

    constructor();

    initMembers(): void;

    setup(
        targets: Game_Battler[],
        animation: RPG.DataAnimation,
        mirror: boolean,
        delay: number,
        previous: Sprite_Animation | Sprite_AnimationMV
    ): void;

    canStart(): boolean;

    shouldWaitForPrevious(): boolean;

    updateEffectGeometry(): void;
    updateMain(): void;

    processSoundTimings(): void;
    processFlashTimings(): void;

    checkEnd(): void;

    updateFlash(): void;

    isPlaying(): boolean;

    setRotation(x: number, y: number, z: number): void;

    setProjectionMatrix(renderer: PIXI.Renderer): void;
    setCameraMatrix(renderer: PIXI.Renderer): void;
    setViewport(renderer: PIXI.Renderer): void;

    targetPosition(renderer: PIXI.Renderer): Point;
    targetSpritePosition(sprite: Sprite): Point;

    saveViewport(renderer: PIXI.Renderer): void;
    resetViewport(renderer: PIXI.Renderer): void;

    onBeforeRender(renderer: PIXI.Renderer): void;
    onAfterRender(renderer: PIXI.Renderer): void;

}

export { Sprite_Animation };
