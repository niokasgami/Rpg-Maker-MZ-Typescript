/**
 * @author Brandt (Masked)
 */

import { Sprite } from '../rmmz_core';

import { Game_Battler } from '../rmmz_objects';

import { Sprite_Clickable, Sprite_Damage } from '.';

declare class Sprite_Battler extends Sprite_Clickable {

    constructor(battler: Game_Battler);

    initMembers(): void;

    setBattler(battler: Game_Battler): void;
    checkBattler(battler: Game_Battler): boolean;

    mainSprite(): Sprite;

    setHome(x: number, y: number): void;

    updateMain(): void;

    updateBitmap(): void;
    updateFrame(): void;

    updateMove(): void;
    updatePosition(): void;
    updateDamagePopup(): void;
    updateSelectionEffect(): void;

    setupDamagePopup(): void;

    createDamageSprite(): void;
    destroyDamageSprite(sprite: Sprite_Damage): void;

    damageOffsetX(): number;
    damageOffsetY(): number;

    startMove(x: number, y: number, duration: number): void;

    onMoveEnd(): void;

    isEffecting(): boolean;
    isMoving(): boolean;
    inHomePosition(): boolean;

    onMouseEnter(): void;
    onMouseExit(): void;
    
    onPress(): void;
    onClick(): void;

}

export { Sprite_Battler };
