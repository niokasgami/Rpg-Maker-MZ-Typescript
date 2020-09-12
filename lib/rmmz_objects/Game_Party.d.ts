/**
 * @author Brandt (Masked)
 */

import { Game_Unit, Game_Actor } from '.';

import { RPG } from '../rmmz_managers';

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

    static readonly ABILITY_ENCOUNTER_HALF: Game_Party.Ability.ENCOUNTER_HALF;
    static readonly ABILITY_ENCOUNTER_NONE: Game_Party.Ability.ENCOUNTER_NONE;
    static readonly ABILITY_CANCEL_SURPRISE: Game_Party.Ability.CANCEL_SURPRISE;
    static readonly ABILITY_RAISE_PREEMPTIVE: Game_Party.Ability.RAISE_PREEMPTIVE;
    static readonly ABILITY_GOLD_DOUBLE: Game_Party.Ability.GOLD_DOUBLE;
    static readonly ABILITY_DROP_ITEM_DOUBLE: Game_Party.Ability.DROP_ITEM_DOUBLE;

    initAllItems(): void;

    exists(): boolean;

    size(): number;
    isEmpty(): boolean;

    allMembers(): Game_Actor[];

    battleMembers(): Game_Actor[];
    maxBattleMembers(): number;
    leader(): Game_Actor;

    removeInvalidMembers(): void;
    reviveBattleMembers(): void;

    items(): RPG.DataItem[];
    weapons(): RPG.DataWeapon[];
    armors(): RPG.DataArmor[];
    equipItems(): RPG.DataEquipItem[];
    allItems(): RPG.DataItemBase[];

    itemContainer(item: RPG.DataItemBase): Record<number, number> | null;

    setupStartingMembers(): void;

    name(): string;

    setupBattleTest(): void;
    setupBattleTestMembers(): void;
    setupBattleTestItems(): void;

    highestLevel(): number;

    addActor(actorId: number): void;
    removeActor(actorId: number): void;

    gold(): number;
    gainGold(amount: number): void;
    loseGold(amount: number): void;
    maxGold(): number;
    
    steps(): number;
    increaseSteps(): void;

    numItems(item: RPG.DataItemBase): number;
    maxItems(item: RPG.DataItemBase): number;

    hasMaxItems(item: RPG.DataItemBase): boolean;

    hasItem(item: RPG.DataItemBase): boolean;
    hasItem(item: RPG.DataEquipItem, includeEquip: boolean): boolean;

    isAnyMemberEquipped(item: RPG.DataItem): false;
    isAnyMemberEquipped(item: RPG.DataEquipItem): boolean;

    gainItem(item: RPG.DataItemBase, amount: number): void;
    gainItem(item: RPG.DataEquipItem, amount: number, includeEquip: boolean): void;

    discardMembersEquip(item: RPG.DataEquipItem, amount: number): void;

    loseItem(item: RPG.DataEquipItem, amount: number, includeEquip: boolean): void;
    consumeItem(item: RPG.DataItem): void;

    canUse(item: RPG.DataItem): boolean;
    canInput(): boolean;

    onPlayerWalk(): void;

    menuActor(): Game_Actor;
    setMenuActor(actor: Game_Actor): void;
    makeMenuActorNext(): void;
    makeMenuActorPrevious(): void;

    targetActor(): Game_Actor;
    setTargetActor(actor: Game_Actor): void;

    lastItem(): RPG.DataItem;
    setLastItem(item: RPG.DataItem): void;

    swapOrder(index1: number, index2: number): void;

    charactersForSavefile(): [string, number][];
    facesForSavefile(): [string, number][];

    partyAbility(abilityId: Game_Party.Ability): boolean;
    hasEncounterHalf(): boolean;
    hasEncounterNone(): boolean;
    hasCancelSurprise(): boolean;
    hasRaisePreemptive(): boolean;
    hasGoldDouble(): boolean;
    hasDropItemDouble(): boolean;

    ratePreemptive(troopAgi: number): number;
    rateSurprise(troopAgi: number): number;

    performVictory(): void;
    performEscape(): void;

    removeBattleStates(): void;
    requestMotionRefresh(): void;
    onEscapeFailure(): void;
}

export { Game_Party };
