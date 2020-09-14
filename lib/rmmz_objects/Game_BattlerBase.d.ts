/**
 * @author Brandt (Masked)
 */

import { RPG } from "../RPG";

import { Game_Actor } from './Game_Actor';
import { Game_Enemy } from './Game_Enemy';

declare namespace Game_BattlerBase {

    export enum Traits {
        ELEMENT_RATE = 11,
        DEBUFF_RATE = 12,
        STATE_RATE = 13,
        STATE_RESIST = 14,
        PARAM = 21,
        XPARAM = 22,
        SPARAM = 23,
        ATTACK_ELEMENT = 31,
        ATTACK_STATE = 32,
        ATTACK_SPEED = 33,
        ATTACK_TIMES = 34,
        ATTACK_SKILL = 35,
        STYPE_ADD = 41,
        STYPE_SEAL = 42,
        SKILL_ADD = 43,
        SKILL_SEAL = 44,
        EQUIP_WTYPE = 51,
        EQUIP_ATYPE = 52,
        EQUIP_LOCK = 53,
        EQUIP_SEAL = 54,
        SLOT_TYPE = 55,
        ACTION_PLUS = 61,
        SPECIAL_FLAG = 62,
        COLLAPSE_TYPE = 63,
        PARTY_ABILITY = 64
    }

    export enum FlagIds {
        AUTO_BATTLE = 0,
        GUARD = 1,
        SUBSTITUTE = 2,
        PRESERVE_TP = 3
    }

    export enum Params {
        /** Maximum Hit Points */
        MHP = 0,
        /** Maximum Magic Points */
        MMP = 1,
        /** ATtacK power */
        ATK = 2,
        /** DEFense power */
        DEF = 3,
        /** Magic ATtack power */
        MAT = 4,
        /** Magic DeFense power */
        MDF = 5,
        /** AGIlity */
        AGI = 6,
        /** LUcK */
        LUK = 7
    }

    export enum ExtraParams {
        /** HIT rate */
        HIT = 0,
        /** EVAsion rate */
        EVA = 1,
        /** CRItical rate */
        CRI = 2,
        /** Critical EVasion rate */
        CEV = 3,
        /** Magic EVasion rate */
        MEV = 4,
        /** Magic ReFlection rate */
        MRF = 5,
        /** CouNTer attack rate */
        CNT = 6,
        /** Hp ReGeneration rate */
        HRG = 7,
        /** Mp ReGeneration rate */
        MRG = 8,
        /** Tp ReGeneration rate */
        TRG = 9
    }

    export enum SpecialParams {
        /** TarGet Rate */
        TGR = 0,
        /** GuaRD effect rate */
        GRD = 1,
        /** RECovery effect rate */
        REC = 2,
        /** PHArmacology */
        PHA = 3,
        /** Mp Cost Rate */
        MCR = 4,
        /** Tp Charge Rate */
        TCR = 5,
        /** Physical Damage Rate */
        PDR = 6,
        /** Magic Damage Rate */
        MDR = 7,
        /** Floor Damage Rate */
        FDR = 8,
        /** EXperience Rate */
        EXR = 9
    }

    export enum CollapseType {
        DEFAULT = 0,
        BOSS = 1,
        INSTANT = 2
    }

}

declare class Game_BattlerBase {

    static readonly TRAIT_ELEMENT_RATE: Game_BattlerBase.Traits.ELEMENT_RATE;
    static readonly TRAIT_DEBUFF_RATE: Game_BattlerBase.Traits.DEBUFF_RATE;
    static readonly TRAIT_STATE_RATE: Game_BattlerBase.Traits.STATE_RATE;
    static readonly TRAIT_STATE_RESIST: Game_BattlerBase.Traits.STATE_RESIST;
    static readonly TRAIT_PARAM: Game_BattlerBase.Traits.PARAM;
    static readonly TRAIT_XPARAM: Game_BattlerBase.Traits.XPARAM;
    static readonly TRAIT_SPARAM: Game_BattlerBase.Traits.SPARAM;
    static readonly TRAIT_ATTACK_ELEMENT: Game_BattlerBase.Traits.ATTACK_ELEMENT;
    static readonly TRAIT_ATTACK_STATE: Game_BattlerBase.Traits.ATTACK_STATE;
    static readonly TRAIT_ATTACK_SPEED: Game_BattlerBase.Traits.ATTACK_SPEED;
    static readonly TRAIT_ATTACK_TIMES: Game_BattlerBase.Traits.ATTACK_TIMES;
    static readonly TRAIT_ATTACK_SKILL: Game_BattlerBase.Traits.ATTACK_SKILL;
    static readonly TRAIT_STYPE_ADD: Game_BattlerBase.Traits.STYPE_ADD;
    static readonly TRAIT_STYPE_SEAL: Game_BattlerBase.Traits.STYPE_SEAL;
    static readonly TRAIT_SKILL_ADD: Game_BattlerBase.Traits.SKILL_ADD;
    static readonly TRAIT_SKILL_SEAL: Game_BattlerBase.Traits.SKILL_SEAL;
    static readonly TRAIT_EQUIP_WTYPE: Game_BattlerBase.Traits.EQUIP_WTYPE;
    static readonly TRAIT_EQUIP_ATYPE: Game_BattlerBase.Traits.EQUIP_ATYPE;
    static readonly TRAIT_EQUIP_LOCK: Game_BattlerBase.Traits.EQUIP_LOCK;
    static readonly TRAIT_EQUIP_SEAL: Game_BattlerBase.Traits.EQUIP_SEAL;
    static readonly TRAIT_SLOT_TYPE: Game_BattlerBase.Traits.SLOT_TYPE;
    static readonly TRAIT_ACTION_PLUS: Game_BattlerBase.Traits.ACTION_PLUS;
    static readonly TRAIT_SPECIAL_FLAG: Game_BattlerBase.Traits.SPECIAL_FLAG;
    static readonly TRAIT_COLLAPSE_TYPE: Game_BattlerBase.Traits.COLLAPSE_TYPE;
    static readonly TRAIT_PARTY_ABILITY: Game_BattlerBase.Traits.PARTY_ABILITY;

    static readonly FLAG_ID_AUTO_BATTLE: Game_BattlerBase.FlagIds.AUTO_BATTLE;
    static readonly FLAG_ID_GUARD: Game_BattlerBase.FlagIds.GUARD;
    static readonly FLAG_ID_SUBSTITUTE: Game_BattlerBase.FlagIds.SUBSTITUTE;
    static readonly FLAG_ID_PRESERVE_TP: Game_BattlerBase.FlagIds.PRESERVE_TP;
    
    static readonly ICON_BUFF_START: 32;
    static readonly ICON_DEBUFF_START: 48;

    constructor();

    readonly hp: number;
    readonly mp: number;
    readonly tp: number;

    readonly mhp: number;
    readonly mmp: number;
    readonly atk: number;
    readonly def: number;
    readonly mat: number;
    readonly mdf: number;
    readonly agi: number;
    readonly luk: number;

    readonly hit: number;
    readonly eva: number;
    readonly cri: number;
    readonly cev: number;
    readonly mev: number;
    readonly mrf: number;
    readonly cnt: number;
    readonly hrg: number;
    readonly mrg: number;
    readonly trg: number;

    readonly tgr: number;
    readonly grd: number;
    readonly rec: number;
    readonly pha: number;
    readonly mcr: number;
    readonly tcr: number;
    readonly pdr: number;
    readonly mdr: number;
    readonly fdr: number;
    readonly exr: number;
    
    initMembers(): void;

    clearParamPlus(): void;

    clearStates(): void;
    eraseState(stateId: number): void;
    isStateAffected(stateId: number): boolean;
    isDeathStateAffected(): boolean;

    deathStateId(): number;

    resetStateCounts(stateId: number): void;    

    isStateExpired(stateId: number): boolean;

    updateStateTurns(): void;

    clearBuffs(): void;
    eraseBuff(paramId: Game_BattlerBase.Params): void;
    buffLength(): number;
    buff(paramId: Game_BattlerBase.Params): number;

    isBuffAffected(paramId: Game_BattlerBase.Params): boolean;
    isDebuffAffected(paramId: Game_BattlerBase.Params): boolean;
    isBuffOrDebuffAffected(paramId: Game_BattlerBase.Params): boolean;
    isMaxBuffAffected(paramId: Game_BattlerBase.Params): boolean;
    isMaxDebuffAffected(paramId: Game_BattlerBase.Params): boolean;

    increaseBuff(paramId: Game_BattlerBase.Params): void;
    decreaseBuff(paramId: Game_BattlerBase.Params): void;

    overwriteBuffTurns(paramId: Game_BattlerBase.Params, turns: number): void;

    isBuffExpired(paramId: Game_BattlerBase.Params): boolean;
    updateBuffTurns(): void;

    die(): void;
    revive(): void;

    states(): RPG.DataState[];

    stateIcons(): number[];
    buffIcons(): number[];

    buffIconIndex(buffLevel: number, paramId: Game_BattlerBase.Params): number;

    allIcons(): number[];
    
    traitObjects(): { traits: RPG.Trait[] }[];
    allTraits(): RPG.Trait[];

    traits(code: Game_BattlerBase.Traits): RPG.Trait[];
    traitsWithId(code: Game_BattlerBase.Traits, id: number): RPG.Trait[];
    traitsPi(code: Game_BattlerBase.Traits, id: number): number;
    traitsSum(code: Game_BattlerBase.Traits, id: number): number;
    traitsSumAll(code: Game_BattlerBase.Traits): number;
    traitsSet(code: Game_BattlerBase.Traits): number[];

    paramBase(paramId: Game_BattlerBase.Params): number;
    paramPlus(paramId: Game_BattlerBase.Params): number;
    paramBasePlus(paramId: Game_BattlerBase.Params): number;

    paramMin(paramId: Game_BattlerBase.Params): number;
    paramMax(paramId: Game_BattlerBase.Params): number;

    paramRate(paramId: Game_BattlerBase.Params): number;
    paramBuffRate(paramId: Game_BattlerBase.Params): number;

    param(paramId: Game_BattlerBase.Params): number;
    xparam(paramId: Game_BattlerBase.ExtraParams): number;
    sparam(paramId: Game_BattlerBase.SpecialParams): number;
    
    elementRate(elementId: number): number;
    debuffRate(paramId: Game_BattlerBase.Params): number;

    stateRate(stateId: number): number;
    stateResistSet(): number[];
    isStateResist(stateId: number): boolean;

    attackElements(): number[];
    attackStates(): number[];
    attackStatesRate(stateId: number): number;
    attackSpeed(): number;
    attackTimesAdd(): number;

    attackSkillId(): number;
    attackSkillTypes(): number[];
    addedSkillTypes(): number[];
    isSkillTypeSealed(stypeId: number): boolean;
    addedSkills(): number[];
    isSkillSealed(skillId: number): boolean;

    isEquipWtypeOk(wtypeId: number): boolean;
    isEquipAtypeOk(atypeId: number): boolean;
    isEquipTypeLocked(etypeId: number): boolean;
    isEquipTypeSealed(etypeId: number): boolean;

    slotType(): number;

    isDualWield(): boolean;

    actionPlusSet(): number[];
    specialFlag(flagId: Game_BattlerBase.FlagIds): boolean;

    collapseType(): Game_BattlerBase.CollapseType;

    partyAbility(abilityId: number): boolean;

    isAutoBattle(): boolean;
    isGuard(): boolean;
    isSubstitute(): boolean;
    isPreserveTp(): boolean;

    addParam(paramId: Game_BattlerBase.Params, value: number): void;

    setHp(hp: number): void
    setMp(mp: number): void
    setTp(tp: number): void

    maxTp(): number;

    refresh(): void;
    recoverAll(): void;
    
    hpRate(): number;
    mpRate(): number;
    tpRate(): number;

    hide(): void;
    appear(): void;
    isHidden(): boolean;
    isAppeared(): boolean;

    isDead(): boolean;
    isAlive(): boolean;
    isDying(): boolean;
    isRestricted(): boolean;

    canInput(): boolean;    
    canMove(): boolean;

    isConfused(): boolean;
    confusionLevel(): number;

    isActor(): this is Game_Actor;
    isEnemy(): this is Game_Enemy;

    sortStates(): void;

    restriction(): number;

    addNewState(stateId: number): void;

    onRestrict(): void;

    mostImportantStateText(): string;
    stateMotionIndex(): number;
    stateOverlayIndex(): number;

    isSkillWtypeOk(skill: RPG.DataSkill): boolean;
    
    skillMpCost(skill: RPG.DataSkill): number;
    skillTpCost(skill: RPG.DataSkill): number;

    canPaySkillCost(skill: RPG.DataSkill): boolean;
    paySkillCost(skill: RPG.DataSkill): void;

    isOccasionOk(item: RPG.DataItem): boolean;
    meetsUsableItemConditions(item: RPG.DataConsumable): boolean;
    meetsSkillConditions(skill: RPG.DataSkill): boolean;
    meetsItemConditions(item: RPG.DataItem): boolean;

    canUse(item?: RPG.DataConsumable): boolean;
    canEquip(item?: RPG.DataEquipItem): boolean;

    canEquipWeapon(item: RPG.DataWeapon): boolean;
    canEquipArmor(item: RPG.DataArmor): boolean;

    guardSkillId(): number;

    canAttack(): boolean;
    canGuard(): boolean;

}

export { Game_BattlerBase };
