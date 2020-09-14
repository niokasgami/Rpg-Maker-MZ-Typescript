/**
 * @author Brandt (Masked)
 */

import { RPG } from "../RPG";

import { Game_Battler, Game_Party, Game_Troop, Game_Action } from '.';

declare class Game_Actor extends Game_Battler {
    readonly level: number;

    constructor(actorId: number);

    setup(actorId: number): void;
    
    actorId(): number;
    actor(): RPG.DataActor;
    
    name(): string;
    setName(name: string): void;

    nickname(): string;
    setNickname(name: string): void;

    profile(): string;
    setProfile(name: string): void;

    characterName(): string;
    characterIndex(): number;

    faceName(): string;
    faceIndex(): number;

    battlerName(): string;

    initImages(): void;

    expForLevel(level: number): number;
    initExp(): void;
    currentExp(): number;
    currentLevelExp(): number;
    nextLevelExp(): number;
    nextRequiredExp(): number;

    maxLevel(): number;
    isMaxLevel(): boolean;

    initSkills(): void;
    initEquips(): void;

    equipSlots(): number[];

    equips(): (RPG.DataWeapon | RPG.DataArmor)[];

    weapons(): RPG.DataWeapon;
    armors(): RPG.DataArmor;

    hasWeapon(weapon: RPG.DataWeapon): boolean;
    hasArmor(armor: RPG.DataArmor): boolean;

    isEquipChangeOk(slotId: number): boolean;
    changeEquip(slotId: number, item: RPG.DataEquipItem): void;
    forceChangeEquip(slotId: number, item: RPG.DataEquipItem): void;
    tradeItemWithParty(newItem: RPG.DataEquipItem, oldItem: RPG.DataEquipItem): boolean;

    changeEquipById(etypeId: number, itemId: number): void;

    isEquipped(item: RPG.DataEquipItem): boolean;
    discardEquip(item: RPG.DataEquipItem): void;
    releaseUnequippableItems(forcing: boolean): void;
    clearEquipments(): void;
    optimizeEquipments(): void;
    
    bestEquipItem(slotId: number): RPG.DataEquipItem;
    calcEquipItemPerformance(item: RPG.DataEquipItem): number;
    
    isSkillWtypeOk(skill: RPG.DataSkill): boolean;
    isWtypeEquipped(wtypeId: number): boolean;

    isActor(): true;

    friendsUnit(): Game_Party;
    opponentsUnit(): Game_Troop;

    index(): number;

    isBattleMember(): boolean;
    isFormationChangeOk(): boolean;

    currentClass(): RPG.DataClass;

    isClass(gameClass?: RPG.DataClass): boolean;

    skillTypes(): number[];
    skills(): RPG.DataSkill[];
    usableSkills(): RPG.DataSkill[];

    hasNoWeapons(): boolean;
    bareHandsElementId(): number;

    attackAnimationId1(): number;
    attackAnimationId2(): number;
    bareHandsAnimationId(): number;

    changeExp(exp: number, show: boolean): void;
    levelUp(): void;
    levelDown(): void;

    findNewSkills(lastSkills: RPG.DataSkill[]): RPG.DataSkill[];
    displayLevelUp(newSkills: RPG.DataSkill[]): void;

    gainExp(exp: number): void;
    finalExpRate(): number;

    benchMembersExpRate(): number;

    shouldDisplayLevelUp(): boolean;

    changeLevel(level: number, show: boolean): void;
    learnSkill(skillId: number): void;
    forgetSkill(skillId: number): void;

    isLearnedSkill(skillId: number): boolean;
    hasSkill(skillId: number): boolean;

    changeClass(classId: number, keepExp: boolean): void;

    setCharacterImage(characterName: string, characterIndex: number): void;
    setFaceImage(faceName: string, faceIndex: number): void;
    setBattlerImage(battlerName: string): void;

    isSpriteVisible(): boolean;
    performAttack(): void;
    performVictory(): void;
    performEscape(): void;

    makeActionList(): Game_Action[];
    makeAutoBattleActions(): void;
    makeConfusionActions(): void;

    onPlayerWalk(): void;

    updateStateSteps(state: RPG.DataState): void;
    showAddedStates(): void;
    showRemovedStates(): void;

    stepsForTurn(): number;
    
    turnEndOnMap(): void;

    checkFloorEffect(): void;
    executeFloorDamage(): void;

    basicFloorDamage(): number;
    maxFloorDamage(): number;

    performMapDamage(): void;
    inputtingAction(): Game_Action;
    selectNextCommand(): boolean;
    selectNextCommand(): boolean;

    lastSkill(): RPG.DataSkill;

    lastMenuSkill(): RPG.DataSkill;
    setLastMenuSkill(skill: RPG.DataSkill): void;

    lastBattleSkill(): RPG.DataSkill;
    setLastBattleSkill(skill: RPG.DataSkill): void;

    lastCommandSymbol(): string;
    setLastCommandSymbol(symbol: string): void;

    testEscape(item: RPG.DataConsumable): boolean;
    onEscapeFailure(): boolean;
}

export { Game_Actor };
