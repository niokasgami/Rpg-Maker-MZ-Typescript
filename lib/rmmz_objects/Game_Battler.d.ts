/**
 * @author Brandt (Masked)
 */

import { RPG } from '../RPG';

import { Game_BattlerBase, Game_Action, Game_Unit } from '.';

declare namespace Game_Battler {
    export type EffectType =
        'appear' | 'disappear' | 'whiten' | 'blink' | 'collapse' | 'bossCollapse' | 'instantCollapse';
    
    export type MotionType =
        'walk' | 'wait' | 'chant' | 'guard' | 'damage' | 'evade' | 'thrust' | 'swing' | 'missile' | 'skill' | 'spell'
        | 'item' | 'escape' | 'victory' | 'dying' | 'abnormal' | 'sleep' | 'dead';

    export type ActionState = "undecided" | "inputting" | "waiting" | "acting";
}

declare abstract class Game_Battler extends Game_BattlerBase {
    constructor();

    clearDamagePopup(): void;
    clearWeaponAnimation(): void;
    clearEffect(): void;
    clearMotion(): void;
    
    requestEffect(effectType: Game_Battler.EffectType): void;
    requestMotion(motionType: Game_Battler.MotionType): void;

    requestMotionRefresh(): void;
    
    select(): void;
    deselect(): void;

    isDamagePopupRequested(): boolean;
    isEffectRequested(): boolean;
    isMotionRequested(): boolean;
    isWeaponAnimationRequested(): boolean;
    isMotionRefreshRequested(): boolean;
    isSelected(): boolean;

    effectType(): Game_Battler.EffectType;
    motionType(): Game_Battler.MotionType;

    weaponImageId(): number;
    
    startDamagePopup(): void;
    shouldPopupDamage(): boolean;

    startWeaponAnimation(weaponImageId: number): void;

    action(index: number): Game_Action;
    setAction(index: number, action: Game_Action): void;
    numActions(): number;
    clearActions(): void;

    result(): Game_ActionResult;
    clearResult(): void;

    clearResult(): void;
    
    clearTpbChargeTime(): void;
    applyTpbPenalty(): void;
    
    initTpbChargeTime(advantageous: boolean): void;

    tbpChargeTime(): number;

    startTpbCasting(): void;    
    startTpbAction(): void;

    isTpbCharged(): boolean;    
    isTpbReady(): boolean;    
    isTpbTimeout(): boolean;

    updateTpb(): void;    
    updateTpbChargeTime(): void;    
    updateTpbCastTime(): void;
    updateTpbAutoBattle(): void;
    updateTpbIdleTime(): void;

    tpbAcceleration(): number;
    tpbRelativeSpeed(): number;
    tpbSpeed(): number;
    tpbBaseSpeed(): number;
    tpbRequiredCastTime(): number;

    onTpbCharged(): void;
    shouldDelayTpbCharge(): boolean;
    finishTpbCharge(): void;
    isTpbTurnEnd(): boolean;

    initTpbTurn(): void;
    startTpbTurn(): void;
    makeTpbActions(): void;
    onTpbTimeout(): void;

    turnCount(): number;

    canInput(): boolean;

    refresh(): void;

    addState(stateId: number): void;
    isStateAddable(stateId: number): boolean;
    isStateRestrict(stateId: number): boolean;

    onRestrict(): void;

    removeState(stateId: number): void;

    escape(): void;
    
    addBuff(paramId: Game_BattlerBase.Params, turns: number): void;    
    addDebuff(paramId: Game_BattlerBase.Params, turns: number): void;    

    removeBuff(paramId: Game_BattlerBase.Params): void;    
    removeBattleStates(): void;    
    removeAllBuffs(): void;    
    removeStatesAuto(timing: number): void;    
    removeBuffsAuto(): void;    
    removeStatesByDamage(): void;

    makeActionTimes(): number;
    makeActions(): void;

    speed(): number;
    makeSpeed(): void;

    currentAction(): Game_Action;
    removeCurrentAction(): void;

    setLastTarget(target: Game_Battler): void;

    forceAction(skillId: number, targetIndex: number): void;
    useItem(item: RPG.DataConsumable): void;

    consumeItem(item: RPG.DataItem): void;
    gainHp(value: number): void;
    gainMp(value: number): void;
    gainTp(value: number): void;
    gainSilentTp(value: number): void;
    initTp(): void;
    clearTp(): void;
    chargeTpByDamage(damageRate: number): void;

    regenerateHp(): void;
    maxSlipDamage(): number;
    regenerateMp(): void;
    regenerateTp(): void;

    regenerateAll(): void;

    onBattleStart(advantageous: boolean): void;
    onAllActionsEnd(): void;
    onTurnEnd(): void;
    onBattleEnd(): void;
    onDamage(value: number): void;

    setActionState(actionState: Game_Battler.ActionState): void;

    isUndecided(): boolean;
    isInputting(): boolean;
    isWaiting(): boolean;
    isActing(): boolean;

    isChanting(): boolean;
    isGuardWaiting(): boolean;

    performActionStart(action: Game_Action): void;
    performAction(action: Game_Action): void;
    performActionEnd(): void;
    performDamage(): void;
    performMiss(): void;
    performRecovery(): void;
    performEvasion(): void;
    performMagicEvasion(): void;
    performCounter(): void;
    performReflection(): void;
    performSubstitute(target: Game_Battler): void;
    performCollapse(): void;

    abstract index(): number;
    abstract isSpriteVisible(): boolean;
    
    abstract friendsUnit(): Game_Unit<Game_Battler>;
    abstract opponentsUnit(): Game_Unit<Game_Battler>;

    abstract isBattleMember(): boolean;

    abstract battlerName(): string;
}

export { Game_Battler };
