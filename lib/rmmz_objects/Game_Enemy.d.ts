/**
 * @author Brandt (Masked)
 */

import { RPG } from "../RPG";

import { Game_Battler, Game_Party, Game_Troop, Game_Action } from '.';

declare namespace Game_Enemy {
    export enum ItemKind {
        Item = 1,
        Weapon = 2,
        Armor = 3
    }
}

declare class Game_Enemy extends Game_Battler {

    constructor(enemyId: number, x: number, y: number);

    setup(enemyId: number, x: number, y: number): void;

    isEnemy(): true;

    friendsUnit(): Game_Troop;
    opponentsUnit(): Game_Party;

    index(): number;

    isBattleMember(): boolean;

    enemyId(): number;
    enemy(): RPG.DataEnemy;

    exp(): number;
    gold(): number;

    makeDropItems(): RPG.DataItemBase[];
    dropItemRate(): number;

    itemObject(kind: Game_Enemy.ItemKind, dataId: number): RPG.DataItemBase;

    isSpriteVisible(): boolean;

    screenX(): number;
    screenY(): number;

    battlerName(): string;
    battlerHue(): number;

    originalName(): string;
    name(): string;

    isLetterEmpty(): boolean;
    setLetter(letter: string): void;
    setPlural(plural: boolean): void;

    transform(enemyId: number): void;

    meetsCondition(action: Game_Action): boolean;
    meetsTurnCondition(param1: number, param2: number): boolean;
    meetsHpCondition(param1: number, param2: number): boolean;
    meetsMpCondition(param1: number, param2: number): boolean;
    meetsStateCondition(param1: number, param2: number): boolean;
    meetsPartyLevelCondition(param1: number, param2: number): boolean;
    meetsSwitchCondition(param1: number, param2: number): boolean;

    isActionValid(action: Game_Action): boolean;

    selectAction(actionList: Game_Action[], ratingZero: number): Game_Action | null;
    selectAllActions(actionList: Game_Action[]): void;

}

export { Game_Enemy };
