
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

function Game_Battler() {
    this.initialize(...arguments);
}

Game_Battler.prototype = Object.create(Game_BattlerBase.prototype);
Game_Battler.prototype.constructor = Game_Battler;

Game_Battler.prototype.initialize = function() {
    Game_BattlerBase.prototype.initialize.call(this);
};

Game_Battler.prototype.initMembers = function() {
    Game_BattlerBase.prototype.initMembers.call(this);
    this._actions = [];
    this._speed = 0;
    this._result = new Game_ActionResult();
    this._actionState = "";
    this._lastTargetIndex = 0;
    this._damagePopup = false;
    this._effectType = null;
    this._motionType = null;
    this._weaponImageId = 0;
    this._motionRefresh = false;
    this._selected = false;
    this._tpbState = "";
    this._tpbChargeTime = 0;
    this._tpbCastTime = 0;
    this._tpbIdleTime = 0;
    this._tpbTurnCount = 0;
    this._tpbTurnEnd = false;
};

Game_Battler.prototype.clearDamagePopup = function() {
    this._damagePopup = false;
};

Game_Battler.prototype.clearWeaponAnimation = function() {
    this._weaponImageId = 0;
};

Game_Battler.prototype.clearEffect = function() {
    this._effectType = null;
};

Game_Battler.prototype.clearMotion = function() {
    this._motionType = null;
    this._motionRefresh = false;
};

Game_Battler.prototype.requestEffect = function(effectType) {
    this._effectType = effectType;
};

Game_Battler.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
};

Game_Battler.prototype.requestMotionRefresh = function() {
    this._motionRefresh = true;
};

Game_Battler.prototype.select = function() {
    this._selected = true;
};

Game_Battler.prototype.deselect = function() {
    this._selected = false;
};

Game_Battler.prototype.isDamagePopupRequested = function() {
    return this._damagePopup;
};

Game_Battler.prototype.isEffectRequested = function() {
    return !!this._effectType;
};

Game_Battler.prototype.isMotionRequested = function() {
    return !!this._motionType;
};

Game_Battler.prototype.isWeaponAnimationRequested = function() {
    return this._weaponImageId > 0;
};

Game_Battler.prototype.isMotionRefreshRequested = function() {
    return this._motionRefresh;
};

Game_Battler.prototype.isSelected = function() {
    return this._selected;
};

Game_Battler.prototype.effectType = function() {
    return this._effectType;
};

Game_Battler.prototype.motionType = function() {
    return this._motionType;
};

Game_Battler.prototype.weaponImageId = function() {
    return this._weaponImageId;
};

Game_Battler.prototype.startDamagePopup = function() {
    this._damagePopup = true;
};

Game_Battler.prototype.shouldPopupDamage = function() {
    const result = this._result;
    return (
        result.missed ||
        result.evaded ||
        result.hpAffected ||
        result.mpDamage !== 0
    );
};

Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
    this._weaponImageId = weaponImageId;
};

Game_Battler.prototype.action = function(index) {
    return this._actions[index];
};

Game_Battler.prototype.setAction = function(index, action) {
    this._actions[index] = action;
};

Game_Battler.prototype.numActions = function() {
    return this._actions.length;
};

Game_Battler.prototype.clearActions = function() {
    this._actions = [];
};

Game_Battler.prototype.result = function() {
    return this._result;
};

Game_Battler.prototype.clearResult = function() {
    this._result.clear();
};

Game_Battler.prototype.clearTpbChargeTime = function() {
    this._tpbState = "charging";
    this._tpbChargeTime = 0;
};

Game_Battler.prototype.applyTpbPenalty = function() {
    this._tpbState = "charging";
    this._tpbChargeTime -= 1;
};

Game_Battler.prototype.initTpbChargeTime = function(advantageous) {
    const speed = this.tpbRelativeSpeed();
    this._tpbState = "charging";
    this._tpbChargeTime = advantageous ? 1 : speed * Math.random() * 0.5;
    if (this.isRestricted()) {
        this._tpbChargeTime = 0;
    }
};

Game_Battler.prototype.tpbChargeTime = function() {
    return this._tpbChargeTime;
};

Game_Battler.prototype.startTpbCasting = function() {
    this._tpbState = "casting";
    this._tpbCastTime = 0;
};

Game_Battler.prototype.startTpbAction = function() {
    this._tpbState = "acting";
};

Game_Battler.prototype.isTpbCharged = function() {
    return this._tpbState === "charged";
};

Game_Battler.prototype.isTpbReady = function() {
    return this._tpbState === "ready";
};

Game_Battler.prototype.isTpbTimeout = function() {
    return this._tpbIdleTime >= 1;
};

Game_Battler.prototype.updateTpb = function() {
    if (this.canMove()) {
        this.updateTpbChargeTime();
        this.updateTpbCastTime();
        this.updateTpbAutoBattle();
    }
    if (this.isAlive()) {
        this.updateTpbIdleTime();
    }
};

Game_Battler.prototype.updateTpbChargeTime = function() {
    if (this._tpbState === "charging") {
        this._tpbChargeTime += this.tpbAcceleration();
        if (this._tpbChargeTime >= 1) {
            this._tpbChargeTime = 1;
            this.onTpbCharged();
        }
    }
};

Game_Battler.prototype.updateTpbCastTime = function() {
    if (this._tpbState === "casting") {
        this._tpbCastTime += this.tpbAcceleration();
        if (this._tpbCastTime >= this.tpbRequiredCastTime()) {
            this._tpbCastTime = this.tpbRequiredCastTime();
            this._tpbState = "ready";
        }
    }
};

Game_Battler.prototype.updateTpbAutoBattle = function() {
    if (this.isTpbCharged() && !this.isTpbTurnEnd() && this.isAutoBattle()) {
        this.makeTpbActions();
    }
};

Game_Battler.prototype.updateTpbIdleTime = function() {
    if (!this.canMove() || this.isTpbCharged()) {
        this._tpbIdleTime += this.tpbAcceleration();
    }
};

Game_Battler.prototype.tpbAcceleration = function() {
    const speed = this.tpbRelativeSpeed();
    const referenceTime = $gameParty.tpbReferenceTime();
    return speed / referenceTime;
};

Game_Battler.prototype.tpbRelativeSpeed = function() {
    return this.tpbSpeed() / $gameParty.tpbBaseSpeed();
};

Game_Battler.prototype.tpbSpeed = function() {
    return Math.sqrt(this.agi) + 1;
};

Game_Battler.prototype.tpbBaseSpeed = function() {
    const baseAgility = this.paramBasePlus(6);
    return Math.sqrt(baseAgility) + 1;
};

Game_Battler.prototype.tpbRequiredCastTime = function() {
    const actions = this._actions.filter(action => action.isValid());
    const items = actions.map(action => action.item());
    const delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);
    return Math.sqrt(delay) / this.tpbSpeed();
};

Game_Battler.prototype.onTpbCharged = function() {
    if (!this.shouldDelayTpbCharge()) {
        this.finishTpbCharge();
    }
};

Game_Battler.prototype.shouldDelayTpbCharge = function() {
    return !BattleManager.isActiveTpb() && $gameParty.canInput();
};

Game_Battler.prototype.finishTpbCharge = function() {
    this._tpbState = "charged";
    this._tpbTurnEnd = true;
    this._tpbIdleTime = 0;
};

Game_Battler.prototype.isTpbTurnEnd = function() {
    return this._tpbTurnEnd;
};

Game_Battler.prototype.initTpbTurn = function() {
    this._tpbTurnEnd = false;
    this._tpbTurnCount = 0;
    this._tpbIdleTime = 0;
};

Game_Battler.prototype.startTpbTurn = function() {
    this._tpbTurnEnd = false;
    this._tpbTurnCount++;
    this._tpbIdleTime = 0;
    if (this.numActions() === 0) {
        this.makeTpbActions();
    }
};

Game_Battler.prototype.makeTpbActions = function() {
    this.makeActions();
    if (this.canInput()) {
        this.setActionState("undecided");
    } else {
        this.startTpbCasting();
        this.setActionState("waiting");
    }
};

Game_Battler.prototype.onTpbTimeout = function() {
    this.onAllActionsEnd();
    this._tpbTurnEnd = true;
    this._tpbIdleTime = 0;
};

Game_Battler.prototype.turnCount = function() {
    if (BattleManager.isTpb()) {
        return this._tpbTurnCount;
    } else {
        return $gameTroop.turnCount() + 1;
    }
};

Game_Battler.prototype.canInput = function() {
    if (BattleManager.isTpb() && !this.isTpbCharged()) {
        return false;
    }
    return Game_BattlerBase.prototype.canInput.call(this);
};

Game_Battler.prototype.refresh = function() {
    Game_BattlerBase.prototype.refresh.call(this);
    if (this.hp === 0) {
        this.addState(this.deathStateId());
    } else {
        this.removeState(this.deathStateId());
    }
};

Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId)) {
            this.addNewState(stateId);
            this.refresh();
        }
        this.resetStateCounts(stateId);
        this._result.pushAddedState(stateId);
    }
};

Game_Battler.prototype.isStateAddable = function(stateId) {
    return (
        this.isAlive() &&
        $dataStates[stateId] &&
        !this.isStateResist(stateId) &&
        !this.isStateRestrict(stateId)
    );
};

Game_Battler.prototype.isStateRestrict = function(stateId) {
    return $dataStates[stateId].removeByRestriction && this.isRestricted();
};

Game_Battler.prototype.onRestrict = function() {
    Game_BattlerBase.prototype.onRestrict.call(this);
    this.clearTpbChargeTime();
    this.clearActions();
    for (const state of this.states()) {
        if (state.removeByRestriction) {
            this.removeState(state.id);
        }
    }
};

Game_Battler.prototype.removeState = function(stateId) {
    if (this.isStateAffected(stateId)) {
        if (stateId === this.deathStateId()) {
            this.revive();
        }
        this.eraseState(stateId);
        this.refresh();
        this._result.pushRemovedState(stateId);
    }
};

Game_Battler.prototype.escape = function() {
    if ($gameParty.inBattle()) {
        this.hide();
    }
    this.clearActions();
    this.clearStates();
    SoundManager.playEscape();
};

Game_Battler.prototype.addBuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.increaseBuff(paramId);
        if (this.isBuffAffected(paramId)) {
            this.overwriteBuffTurns(paramId, turns);
        }
        this._result.pushAddedBuff(paramId);
        this.refresh();
    }
};

Game_Battler.prototype.addDebuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.decreaseBuff(paramId);
        if (this.isDebuffAffected(paramId)) {
            this.overwriteBuffTurns(paramId, turns);
        }
        this._result.pushAddedDebuff(paramId);
        this.refresh();
    }
};

Game_Battler.prototype.removeBuff = function(paramId) {
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
        this.eraseBuff(paramId);
        this._result.pushRemovedBuff(paramId);
        this.refresh();
    }
};

Game_Battler.prototype.removeBattleStates = function() {
    for (const state of this.states()) {
        if (state.removeAtBattleEnd) {
            this.removeState(state.id);
        }
    }
};

Game_Battler.prototype.removeAllBuffs = function() {
    for (let i = 0; i < this.buffLength(); i++) {
        this.removeBuff(i);
    }
};

Game_Battler.prototype.removeStatesAuto = function(timing) {
    for (const state of this.states()) {
        if (
            this.isStateExpired(state.id) &&
            state.autoRemovalTiming === timing
        ) {
            this.removeState(state.id);
        }
    }
};

Game_Battler.prototype.removeBuffsAuto = function() {
    for (let i = 0; i < this.buffLength(); i++) {
        if (this.isBuffExpired(i)) {
            this.removeBuff(i);
        }
    }
};

Game_Battler.prototype.removeStatesByDamage = function() {
    for (const state of this.states()) {
        if (
            state.removeByDamage &&
            Math.randomInt(100) < state.chanceByDamage
        ) {
            this.removeState(state.id);
        }
    }
};

Game_Battler.prototype.makeActionTimes = function() {
    const actionPlusSet = this.actionPlusSet();
    return actionPlusSet.reduce((r, p) => (Math.random() < p ? r + 1 : r), 1);
};

Game_Battler.prototype.makeActions = function() {
    this.clearActions();
    if (this.canMove()) {
        const actionTimes = this.makeActionTimes();
        this._actions = [];
        for (let i = 0; i < actionTimes; i++) {
            this._actions.push(new Game_Action(this));
        }
    }
};

Game_Battler.prototype.speed = function() {
    return this._speed;
};

Game_Battler.prototype.makeSpeed = function() {
    this._speed = Math.min(...this._actions.map(action => action.speed())) || 0;
};

Game_Battler.prototype.currentAction = function() {
    return this._actions[0];
};

Game_Battler.prototype.removeCurrentAction = function() {
    this._actions.shift();
};

Game_Battler.prototype.setLastTarget = function(target) {
    this._lastTargetIndex = target ? target.index() : 0;
};

Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
    this.clearActions();
    const action = new Game_Action(this, true);
    action.setSkill(skillId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    this._actions.push(action);
};

Game_Battler.prototype.useItem = function(item) {
    if (DataManager.isSkill(item)) {
        this.paySkillCost(item);
    } else if (DataManager.isItem(item)) {
        this.consumeItem(item);
    }
};

Game_Battler.prototype.consumeItem = function(item) {
    $gameParty.consumeItem(item);
};

Game_Battler.prototype.gainHp = function(value) {
    this._result.hpDamage = -value;
    this._result.hpAffected = true;
    this.setHp(this.hp + value);
};

Game_Battler.prototype.gainMp = function(value) {
    this._result.mpDamage = -value;
    this.setMp(this.mp + value);
};

Game_Battler.prototype.gainTp = function(value) {
    this._result.tpDamage = -value;
    this.setTp(this.tp + value);
};

Game_Battler.prototype.gainSilentTp = function(value) {
    this.setTp(this.tp + value);
};

Game_Battler.prototype.initTp = function() {
    this.setTp(Math.randomInt(25));
};

Game_Battler.prototype.clearTp = function() {
    this.setTp(0);
};

Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
    const value = Math.floor(50 * damageRate * this.tcr);
    this.gainSilentTp(value);
};

Game_Battler.prototype.regenerateHp = function() {
    const minRecover = -this.maxSlipDamage();
    const value = Math.max(Math.floor(this.mhp * this.hrg), minRecover);
    if (value !== 0) {
        this.gainHp(value);
    }
};

Game_Battler.prototype.maxSlipDamage = function() {
    return $dataSystem.optSlipDeath ? this.hp : Math.max(this.hp - 1, 0);
};

Game_Battler.prototype.regenerateMp = function() {
    const value = Math.floor(this.mmp * this.mrg);
    if (value !== 0) {
        this.gainMp(value);
    }
};

Game_Battler.prototype.regenerateTp = function() {
    const value = Math.floor(100 * this.trg);
    this.gainSilentTp(value);
};

Game_Battler.prototype.regenerateAll = function() {
    if (this.isAlive()) {
        this.regenerateHp();
        this.regenerateMp();
        this.regenerateTp();
    }
};

Game_Battler.prototype.onBattleStart = function(advantageous) {
    this.setActionState("undecided");
    this.clearMotion();
    this.initTpbChargeTime(advantageous);
    this.initTpbTurn();
    if (!this.isPreserveTp()) {
        this.initTp();
    }
};

Game_Battler.prototype.onAllActionsEnd = function() {
    this.clearResult();
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
};

Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
    this.regenerateAll();
    this.updateStateTurns();
    this.updateBuffTurns();
    this.removeStatesAuto(2);
};

Game_Battler.prototype.onBattleEnd = function() {
    this.clearResult();
    this.removeBattleStates();
    this.removeAllBuffs();
    this.clearActions();
    if (!this.isPreserveTp()) {
        this.clearTp();
    }
    this.appear();
};

Game_Battler.prototype.onDamage = function(value) {
    this.removeStatesByDamage();
    this.chargeTpByDamage(value / this.mhp);
};

Game_Battler.prototype.setActionState = function(actionState) {
    this._actionState = actionState;
    this.requestMotionRefresh();
};

Game_Battler.prototype.isUndecided = function() {
    return this._actionState === "undecided";
};

Game_Battler.prototype.isInputting = function() {
    return this._actionState === "inputting";
};

Game_Battler.prototype.isWaiting = function() {
    return this._actionState === "waiting";
};

Game_Battler.prototype.isActing = function() {
    return this._actionState === "acting";
};

Game_Battler.prototype.isChanting = function() {
    if (this.isWaiting()) {
        return this._actions.some(action => action.isMagicSkill());
    }
    return false;
};

Game_Battler.prototype.isGuardWaiting = function() {
    if (this.isWaiting()) {
        return this._actions.some(action => action.isGuard());
    }
    return false;
};

Game_Battler.prototype.performActionStart = function(action) {
    if (!action.isGuard()) {
        this.setActionState("acting");
    }
};

Game_Battler.prototype.performAction = function(/*action*/) {
    //
};

Game_Battler.prototype.performActionEnd = function() {
    //
};

Game_Battler.prototype.performDamage = function() {
    //
};

Game_Battler.prototype.performMiss = function() {
    SoundManager.playMiss();
};

Game_Battler.prototype.performRecovery = function() {
    SoundManager.playRecovery();
};

Game_Battler.prototype.performEvasion = function() {
    SoundManager.playEvasion();
};

Game_Battler.prototype.performMagicEvasion = function() {
    SoundManager.playMagicEvasion();
};

Game_Battler.prototype.performCounter = function() {
    SoundManager.playEvasion();
};

Game_Battler.prototype.performReflection = function() {
    SoundManager.playReflection();
};

Game_Battler.prototype.performSubstitute = function(/*target*/) {
    //
};

Game_Battler.prototype.performCollapse = function() {
    //
};

