declare class Game_BattlerBase {

    public static readonly TRAIT_ELEMENT_RATE: number;
    public static readonly TRAIT_DEBUFF_RATE: number;
    public static readonly TRAIT_STATE_RATE: number;
    public static readonly TRAIT_STATE_RESIST: number;
    public static readonly TRAIT_PARAM: number;
    public static readonly TRAIT_XPARAM: number;
    public static readonly TRAIT_SPARAM: number;
    public static readonly TRAIT_ATTACK_ELEMENT: number;
    public static readonly TRAIT_ATTACK_STATE: number;
    public static readonly TRAIT_ATTACK_SPEED: number;
    public static readonly TRAIT_ATTACK_TIMES: number;
    public static readonly TRAIT_ATTACK_SKILL: number;
    public static readonly TRAIT_STYPE_ADD: number;
    public static readonly TRAIT_STYPE_SEAL: number;
    public static readonly TRAIT_SKILL_ADD: number;
    public static readonly TRAIT_SKILL_SEAL: number;
    public static readonly TRAIT_EQUIP_WTYPE: number;
    public static readonly TRAIT_EQUIP_ATYPE: number;
    public static readonly TRAIT_EQUIP_LOCK: number;
    public static readonly TRAIT_EQUIP_SEAL: number;
    public static readonly TRAIT_SLOT_TYPE: number;
    public static readonly TRAIT_ACTION_PLUS: number;
    public static readonly TRAIT_SPECIAL_FLAG: number;
    public static readonly TRAIT_COLLAPSE_TYPE: number;
    public static readonly TRAIT_PARTY_ABILITY: number;
    public static readonly FLAG_ID_AUTO_BATTLE: number;
    public static readonly FLAG_ID_GUARD: number;
    public static readonly FLAG_ID_SUBSTITUTE: number;
    public static readonly FLAG_ID_PRESERVE_TP: number;
    public static readonly ICON_BUFF_START: number;
    public static readonly ICON_DEBUFF_START: number;

    protected _hp: number
    protected _mp: number;
    protected _tp: number;
    protected _hidden: boolean;
    protected _paramPlus: number[];
    protected _states: RPG.DataState[];
    protected _stateTurns: Record<number, number>;
    protected _buffs: number[];
    protected _buffTurns: number[];

    public constructor(...args: never[]);

    public initialize(): void;

    public initMembers(): void;

    public clearParamPlus(): void;

    public clearStates(): void;

    public eraseState(stateId: number): void;

    public isStateAffected(stateId: number): boolean;

    public isDeathStateAffected(): boolean;

    public deathStateId(): number;

    public resetStateCounts(stateId: number): void;

    public isStateExpired(stateId: number): boolean;

    public updateStateTurns(): void;

    public clearBuffs(): void;

    public eraseBuff(paramId: number): void;
    public buffLength(): number;
    public buff(paramId: number): number;
    public isBuffAffected(paramId: number): boolean;
    public isDebuffAffected(paramId: number): boolean;
    public isBuffOrDebuffAffected(paramId: number): boolean;
    public isMaxBuffAffected(paramId: number): boolean;
    public isMaxDebuffAffected(paramId: number): boolean;
    public increaseBuff(paramId: number): void;
    public decreaseBuff(paramId: number): void;
    public overwriteBuffTurns(paramId: number, turns: number): void;
    public isBuffExpired(paramId: number): boolean;
    public updateBuffTurns(): void;
    public die(): void;
    public revive(): void;
    public states(): RPG.DataState[];
    public stateIcons(): number[];
    public buffIcons(): number[];
    public buffIconIndex(buffLevel: number, paramId: number): number;
    public allIcons(): number[];
    public traitObjects(): RPG.Trait[];
    public allTraits(): RPG.Trait[];
    public traits(code: number): RPG.Trait[];
    public traitsWithId(code: any, id: any): any;
    public traitsPi(code: any, id: any): any;
    public traitsSum(code: any, id: any): any;
    public traitsSumAll(code: any): any;
    public traitsSet(code: any): any;
    public paramBase(): number;
    public paramPlus(paramId: number): number;
    public paramBasePlus(paramId: number): number;
    public paramMin(paramId: number): 1 | 0;
    paramMax(): number;
    paramRate(paramId: number): any;
    paramBuffRate(paramId: number): number;
    param(paramId: number): number;
    xparam(xparamId: number): any;
    sparam(sparamId: number): any;
    elementRate(elementId: any): any;
    debuffRate(paramId: number): any;
    stateRate(stateId: any): any;
    stateResistSet(): any;
    isStateResist(stateId: any): any;
    attackElements(): any;
    attackStates(): any;
    attackStatesRate(stateId: any): any;
    attackSpeed(): any;
    attackTimesAdd(): number;
    attackSkillId(): number;
    addedSkillTypes(): any;
    isSkillTypeSealed(stypeId: any): any;
    addedSkills(): any;
    isSkillSealed(skillId: any): any;
    isEquipWtypeOk(wtypeId: any): any;
    isEquipAtypeOk(atypeId: any): any;
    isEquipTypeLocked(etypeId: any): any;
    isEquipTypeSealed(etypeId: any): any;
    slotType(): number;
    isDualWield(): boolean;
    actionPlusSet(): any;
    specialFlag(flagId: any): any;
    collapseType(): number;
    partyAbility(abilityId: any): any;
    isAutoBattle(): any;
    isGuard(): boolean;
    isSubstitute(): boolean;
    isPreserveTp(): any;
    addParam(paramId: number, value: any): void;
    setHp(hp: any): void;
    setMp(mp: any): void;
    setTp(tp: any): void;
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
    isActor(): boolean;
    isEnemy(): boolean;
    sortStates(): void;
    restriction(): number;
    addNewState(stateId: any): void;
    onRestrict(): void;
    mostImportantStateText(): any;
    stateMotionIndex(): any;
    stateOverlayIndex(): any;
    isSkillWtypeOk(): boolean;
    skillMpCost(skill: any): number;
    skillTpCost(skill: any): any;
    canPaySkillCost(skill: any): boolean;
    paySkillCost(skill: any): void;
    isOccasionOk(item: any): boolean;
    meetsUsableItemConditions(item: any): boolean;
    meetsSkillConditions(skill: any): boolean;
    meetsItemConditions(item: any): any;
    canUse(item: any): any;
    canEquip(item: any): boolean;
    canEquipWeapon(item: any): boolean;
    canEquipArmor(item: any): boolean;
    guardSkillId(): number;
    canAttack(): any;
    public canGuard(): any;
}



