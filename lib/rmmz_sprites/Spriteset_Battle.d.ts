/**
 * @author Brandt (Masked)
 */

import { Spriteset_Base, Sprite_Battler } from '.';

declare class Spriteset_Battle extends Spriteset_Base<Game_Battler, Sprite_Battler> {

    constructor();

    public createBackground(): void;
    public createBattleback(): void;
    public createBattleField(): void;

    public battleFieldOffsetY(): number;

    public updateBattleback(): void;

    public createEnemies(): void;
    public compareEnemySprite(a: Sprite_Battler, b: Sprite_Battler): number;

    public createActors(): void;
    public updateActors(): void;

    public battlerSprites(): Sprite_Battler[];

    public isEffecting(): boolean;
    public isAnyoneMoving(): boolean;
    public isBusy(): boolean;
}

export { Spriteset_Battle };
