/**
 * @author Brandt (Masked)
 */

import { RPG } from '../RPG';

import { Game_Battler, Game_Party, Game_Troop } from '.';

declare class Game_Actor extends Game_Battler {

    public readonly level: number;

    constructor(actorId: number);

    public setup(actorId: number): void;
    
    public actorId(): number;
    public actor(): RPG.DataActor;
    
    public name(): string;
    public setName(name: string): void;

    public nickname(): string;
    public setNickname(name: string): void;

    public profile(): string;
    public setProfile(name: string): void;

    public characterName(): string;
    public characterIndex(): number;

    public faceName(): string;
    public faceIndex(): number;

    public battlerName(): string;

    public initImages(): void;

    public expForLevel(level: number): number;
    public initExp(): void;
    public currentExp(): number;
    public currentLevelExp(): number;
    public nextLevelExp(): number;
    public nextRequiredExp(): number;

    public maxLevel(): number;
    public isMaxLevel(): boolean;

    public initSkills(): void;
    public initEquips(): void;

    public equipSlots(): number[];

    public equips(): (RPG.DataWeapon | RPG.DataArmor)[];

    public weapons(): RPG.DataWeapon;
    public armors(): RPG.DataArmor;

    public hasWeapon(weapon: RPG.DataWeapon): boolean;
    public hasArmor(armor: RPG.DataArmor): boolean;

    public isEquipChangeOk(slotId: number): boolean;
    public changeEquip(slotId: number, item: RPG.DataEquipItem): void;
    public forceChangeEquip(slotId: number, item: RPG.DataEquipItem): void;
    public tradeItemWithParty(newItem: RPG.DataEquipItem, oldItem: RPG.DataEquipItem): boolean;

    public changeEquipById(etypeId: number, itemId: number): void;

    public isEquipped(item: RPG.DataEquipItem): boolean;
    public discardEquip(item: RPG.DataEquipItem): void;
    public releaseUnequippableItems(forcing: boolean): void;
    public clearEquipments(): void;
    public optimizeEquipments(): void;
    
    public bestEquipItem(slotId: number): RPG.DataEquipItem;
    public calcEquipItemPerformance(item: RPG.DataEquipItem): number;
    
    public isSkillWtypeOk(skill: RPG.DataSkill): boolean;
    public isWtypeEquipped(wtypeId: number): boolean;

    public isActor(): true;

    public friendsUnit(): Game_Party;
    public opponentsUnit(): Game_Troop;

    public index(): number;

    public isBattleMember(): boolean;
    public isFormationChangeOk(): boolean;

    public currentClass(): RPG.DataClass;

    public isClass(gameClass?: RPG.DataClass): boolean;

    public skillTypes(): number[];
    public skills(): RPG.DataSkill[];
    public usableSkills(): RPG.DataSkill[];

    public hasNoWeapons(): boolean;
    public bareHandsElementId(): number;

    public attackAnimationId1(): number;
    public attackAnimationId2(): number;
    public bareHandsAnimationId(): number;

    public changeExp(exp: number, show: boolean): void;
    public levelUp(): void;
    public levelDown(): void;

    public findNewSkills(lastSkills: RPG.DataSkill[]): RPG.DataSkill[];
    public displayLevelUp(newSkills: RPG.DataSkill[]): void;

    public gainExp(exp: number): void;
    public finalExpRate(): number;

    public benchMembersExpRate(): number;

    public shouldDisplayLevelUp(): boolean;

    public changeLevel(level: number, show: boolean): void;
    public learnSkill(skillId: number): void;
    public forgetSkill(skillId: number): void;

    public isLearnedSkill(skillId: number): boolean;
    public hasSkill(skillId: number): boolean;

    public changeClass(classId: number, keepExp: boolean): void;

    public setCharacterImage(characterName: string, characterIndex: number): void;
    public setFaceImage(faceName: string, faceIndex: number): void;
    public setBattlerImage(battlerName: string): void;

    public isSpriteVisible(): boolean;
    public performAttack(): void;
    public performVictory(): void;
    public performEscape(): void;

    public makeActionList(): Game_Action[];
    public makeAutoBattleActions(): void;
    public makeConfusionActions(): void;

    public onPlayerWalk(): void;

    public updateStateSteps(state: RPG.DataState): void;
    public showAddedStates(): void;
    public showRemovedStates(): void;

    public stepsForTurn(): number;
    
    public turnEndOnMap(): void;

    public checkFloorEffect(): void;
    public executeFloorDamage(): void;

    public basicFloorDamage(): number;
    public maxFloorDamage(): number;

    public performMapDamage(): void;
    public inputtingAction(): Game_Action;
    public selectNextCommand(): boolean;
    public selectNextCommand(): boolean;

    public lastSkill(): RPG.DataSkill;

    public lastMenuSkill(): RPG.DataSkill;
    public setLastMenuSkill(skill: RPG.DataSkill): void;

    public lastBattleSkill(): RPG.DataSkill;
    public setLastBattleSkill(skill: RPG.DataSkill): void;

    public lastCommandSymbol(): string;
    public setLastCommandSymbol(symbol: string): void;

    public testEscape(item: RPG.DataConsumable): boolean;
    public onEscapeFailure(): boolean;

}

export { Game_Actor };
