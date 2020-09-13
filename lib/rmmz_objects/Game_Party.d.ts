/**
 * @author Brandt (Masked)
 */

import { Game_Unit, Game_Actor } from '.';

import { RPG } from '../RPG';

declare namespace Game_Party {
    export enum Ability {
        ENCOUNTER_HALF = 0,
        ENCOUNTER_NONE = 1,
        CANCEL_SURPRISE = 2,
        RAISE_PREEMPTIVE = 3,
        GOLD_DOUBLE = 4,
        DROP_ITEM_DOUBLE = 5
    }
}

declare class Game_Party extends Game_Unit<Game_Actor> {
    constructor();

    public static readonly ABILITY_ENCOUNTER_HALF: Game_Party.Ability.ENCOUNTER_HALF;
    public static readonly ABILITY_ENCOUNTER_NONE: Game_Party.Ability.ENCOUNTER_NONE;
    public static readonly ABILITY_CANCEL_SURPRISE: Game_Party.Ability.CANCEL_SURPRISE;
    public static readonly ABILITY_RAISE_PREEMPTIVE: Game_Party.Ability.RAISE_PREEMPTIVE;
    public static readonly ABILITY_GOLD_DOUBLE: Game_Party.Ability.GOLD_DOUBLE;
    public static readonly ABILITY_DROP_ITEM_DOUBLE: Game_Party.Ability.DROP_ITEM_DOUBLE;

    public initAllItems(): void;

    public exists(): boolean;

    public size(): number;
    public isEmpty(): boolean;

    public allMembers(): Game_Actor[];

    public battleMembers(): Game_Actor[];
    public maxBattleMembers(): number;
    public leader(): Game_Actor;

    public removeInvalidMembers(): void;
    public reviveBattleMembers(): void;

    public items(): RPG.DataItem[];
    public weapons(): RPG.DataWeapon[];
    public armors(): RPG.DataArmor[];
    public equipItems(): RPG.DataEquipItem[];
    public allItems(): RPG.DataItemBase[];

    public itemContainer(item: RPG.DataItemBase): Record<number, number> | null;

    public setupStartingMembers(): void;

    public name(): string;

    public setupBattleTest(): void;
    public setupBattleTestMembers(): void;
    public setupBattleTestItems(): void;

    public highestLevel(): number;

    public addActor(actorId: number): void;
    public removeActor(actorId: number): void;

    public gold(): number;
    public gainGold(amount: number): void;
    public loseGold(amount: number): void;
    public maxGold(): number;
    
    public steps(): number;
    public increaseSteps(): void;

    public numItems(item: RPG.DataItemBase): number;
    public maxItems(item: RPG.DataItemBase): number;

    public hasMaxItems(item: RPG.DataItemBase): boolean;

    public hasItem(item: RPG.DataItemBase): boolean;
    public hasItem(item: RPG.DataEquipItem, includeEquip: boolean): boolean;

    public isAnyMemberEquipped(item: RPG.DataItem): false;
    public isAnyMemberEquipped(item: RPG.DataEquipItem): boolean;

    public gainItem(item: RPG.DataItemBase, amount: number): void;
    public gainItem(item: RPG.DataEquipItem, amount: number, includeEquip: boolean): void;

    public discardMembersEquip(item: RPG.DataEquipItem, amount: number): void;

    public loseItem(item: RPG.DataEquipItem, amount: number, includeEquip: boolean): void;
    public consumeItem(item: RPG.DataItem): void;

    public canUse(item: RPG.DataItem): boolean;
    public canInput(): boolean;

    public onPlayerWalk(): void;

    public menuActor(): Game_Actor;
    public setMenuActor(actor: Game_Actor): void;
    public makeMenuActorNext(): void;
    public makeMenuActorPrevious(): void;

    public targetActor(): Game_Actor;
    public setTargetActor(actor: Game_Actor): void;

    public lastItem(): RPG.DataItem;
    public setLastItem(item: RPG.DataItem): void;

    public swapOrder(index1: number, index2: number): void;

    public charactersForSavefile(): [string, number][];
    public facesForSavefile(): [string, number][];

    public partyAbility(abilityId: Game_Party.Ability): boolean;
    public hasEncounterHalf(): boolean;
    public hasEncounterNone(): boolean;
    public hasCancelSurprise(): boolean;
    public hasRaisePreemptive(): boolean;
    public hasGoldDouble(): boolean;
    public hasDropItemDouble(): boolean;

    public ratePreemptive(troopAgi: number): number;
    public rateSurprise(troopAgi: number): number;

    public performVictory(): void;
    public performEscape(): void;

    public removeBattleStates(): void;
    public requestMotionRefresh(): void;
    public onEscapeFailure(): void;
}

export { Game_Party };
