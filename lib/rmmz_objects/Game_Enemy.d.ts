/**
 * @author Brandt (Masked)
 */

import { RPG } from '../RPG';

import { Game_Battler, Game_Party, Game_Troop } from '.';

declare namespace Game_Enemy {
    export enum ItemKind {
        Item = 1,
        Weapon = 2,
        Armor = 3
    }
}

declare class Game_Enemy extends Game_Battler {

    constructor(enemyId: number, x: number, y: number);

    public setup(enemyId: number, x: number, y: number): void;

    public isEnemy(): true;

    public friendsUnit(): Game_Troop;
    public opponentsUnit(): Game_Party;

    public index(): number;

    public isBattleMember(): boolean;

    public enemyId(): number;
    public enemy(): RPG.DataEnemy;

    public exp(): number;
    public gold(): number;

    public makeDropItems(): RPG.DataItemBase[];
    public dropItemRate(): number;

    public itemObject(kind: Game_Enemy.ItemKind, dataId: number): RPG.DataItemBase;

    public isSpriteVisible(): boolean;

    public screenX(): number;
    public screenY(): number;

    public battlerName(): string;
    public battlerHue(): number;

    public originalName(): string;
    public name(): string;

    public isLetterEmpty(): boolean;
    public setLetter(letter: string): void;
    public setPlural(plural: boolean): void;

    public transform(enemyId: number): void;

    public meetsCondition(action: Game_Action): boolean;
    public meetsTurnCondition(param1: number, param2: number): boolean;
    public meetsHpCondition(param1: number, param2: number): boolean;
    public meetsMpCondition(param1: number, param2: number): boolean;
    public meetsStateCondition(param1: number, param2: number): boolean;
    public meetsPartyLevelCondition(param1: number, param2: number): boolean;
    public meetsSwitchCondition(param1: number, param2: number): boolean;

    public isActionValid(action: Game_Action): boolean;

    public selectAction(actionList: Game_Action[], ratingZero: number): Game_Action | null;
    public selectAllActions(actionList: Game_Action[]): void;

}

export { Game_Enemy };
