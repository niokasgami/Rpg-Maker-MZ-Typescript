/**
 * @author Brandt (Masked)
 */

import { Spriteset_Base, Sprite_Battler } from '.';

import { Game_Battler } from 'rmmz_objects';

declare class Spriteset_Battle extends Spriteset_Base<Game_Battler, Sprite_Battler> {

    constructor();

    createBackground(): void;
    createBattleback(): void;
    createBattleField(): void;

    battleFieldOffsetY(): number;

    updateBattleback(): void;

    createEnemies(): void;
    compareEnemySprite(a: Sprite_Battler, b: Sprite_Battler): number;

    createActors(): void;
    updateActors(): void;

    battlerSprites(): Sprite_Battler[];

    isEffecting(): boolean;
    isAnyoneMoving(): boolean;
    isBusy(): boolean;
}

export { Spriteset_Battle };
