
// BattleManager
//
// The static class that manages battle progress.

function BattleManager() {
    throw new Error("This is a static class");
}

BattleManager.setup = function(troopId, canEscape, canLose) {
    this.initMembers();
    this._canEscape = canEscape;
    this._canLose = canLose;
    $gameTroop.setup(troopId);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
};

BattleManager.initMembers = function() {
    this._phase = "";
    this._inputting = false;
    this._canEscape = false;
    this._canLose = false;
    this._battleTest = false;
    this._eventCallback = null;
    this._preemptive = false;
    this._surprise = false;
    this._currentActor = null;
    this._actionForcedBattler = null;
    this._mapBgm = null;
    this._mapBgs = null;
    this._actionBattlers = [];
    this._subject = null;
    this._action = null;
    this._targets = [];
    this._logWindow = null;
    this._spriteset = null;
    this._escapeRatio = 0;
    this._escaped = false;
    this._rewards = {};
    this._tpbNeedsPartyCommand = true;
};

BattleManager.isTpb = function() {
    return $dataSystem.battleSystem >= 1;
};

BattleManager.isActiveTpb = function() {
    return $dataSystem.battleSystem === 1;
};

BattleManager.isBattleTest = function() {
    return this._battleTest;
};

BattleManager.setBattleTest = function(battleTest) {
    this._battleTest = battleTest;
};

BattleManager.setEventCallback = function(callback) {
    this._eventCallback = callback;
};

BattleManager.setLogWindow = function(logWindow) {
    this._logWindow = logWindow;
};

BattleManager.setSpriteset = function(spriteset) {
    this._spriteset = spriteset;
};

BattleManager.onEncounter = function() {
    this._preemptive = Math.random() < this.ratePreemptive();
    this._surprise = Math.random() < this.rateSurprise() && !this._preemptive;
};

BattleManager.ratePreemptive = function() {
    return $gameParty.ratePreemptive($gameTroop.agility());
};

BattleManager.rateSurprise = function() {
    return $gameParty.rateSurprise($gameTroop.agility());
};

BattleManager.saveBgmAndBgs = function() {
    this._mapBgm = AudioManager.saveBgm();
    this._mapBgs = AudioManager.saveBgs();
};

BattleManager.playBattleBgm = function() {
    AudioManager.playBgm($gameSystem.battleBgm());
    AudioManager.stopBgs();
};

BattleManager.playVictoryMe = function() {
    AudioManager.playMe($gameSystem.victoryMe());
};

BattleManager.playDefeatMe = function() {
    AudioManager.playMe($gameSystem.defeatMe());
};

BattleManager.replayBgmAndBgs = function() {
    if (this._mapBgm) {
        AudioManager.replayBgm(this._mapBgm);
    } else {
        AudioManager.stopBgm();
    }
    if (this._mapBgs) {
        AudioManager.replayBgs(this._mapBgs);
    }
};

BattleManager.makeEscapeRatio = function() {
    this._escapeRatio = (0.5 * $gameParty.agility()) / $gameTroop.agility();
};

BattleManager.update = function(timeActive) {
    if (!this.isBusy() && !this.updateEvent()) {
        this.updatePhase(timeActive);
    }
    if (this.isTpb()) {
        this.updateTpbInput();
    }
};

BattleManager.updatePhase = function(timeActive) {
    switch (this._phase) {
        case "start":
            this.updateStart();
            break;
        case "turn":
            this.updateTurn(timeActive);
            break;
        case "action":
            this.updateAction();
            break;
        case "turnEnd":
            this.updateTurnEnd();
            break;
        case "battleEnd":
            this.updateBattleEnd();
            break;
    }
};

BattleManager.updateEvent = function() {
    switch (this._phase) {
        case "start":
        case "turn":
        case "turnEnd":
            if (this.isActionForced()) {
                this.processForcedAction();
                return true;
            } else {
                return this.updateEventMain();
            }
    }
    return this.checkAbort();
};

BattleManager.updateEventMain = function() {
    $gameTroop.updateInterpreter();
    $gameParty.requestMotionRefresh();
    if ($gameTroop.isEventRunning() || this.checkBattleEnd()) {
        return true;
    }
    $gameTroop.setupBattleEvent();
    if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
        return true;
    }
    return false;
};

BattleManager.isBusy = function() {
    return (
        $gameMessage.isBusy() ||
        this._spriteset.isBusy() ||
        this._logWindow.isBusy()
    );
};

BattleManager.updateTpbInput = function() {
    if (this._inputting) {
        this.checkTpbInputClose();
    } else {
        this.checkTpbInputOpen();
    }
};

BattleManager.checkTpbInputClose = function() {
    if (!this.isPartyTpbInputtable() || this.needsActorInputCancel()) {
        this.cancelActorInput();
        this._currentActor = null;
        this._inputting = false;
    }
};

BattleManager.checkTpbInputOpen = function() {
    if (this.isPartyTpbInputtable()) {
        if (this._tpbNeedsPartyCommand) {
            this._inputting = true;
            this._tpbNeedsPartyCommand = false;
        } else {
            this.selectNextCommand();
        }
    }
};

BattleManager.isPartyTpbInputtable = function() {
    return $gameParty.canInput() && this.isTpbMainPhase();
};

BattleManager.needsActorInputCancel = function() {
    return this._currentActor && !this._currentActor.canInput();
};

BattleManager.isTpbMainPhase = function() {
    return ["turn", "turnEnd", "action"].includes(this._phase);
};

BattleManager.isInputting = function() {
    return this._inputting;
};

BattleManager.isInTurn = function() {
    return this._phase === "turn";
};

BattleManager.isTurnEnd = function() {
    return this._phase === "turnEnd";
};

BattleManager.isAborting = function() {
    return this._phase === "aborting";
};

BattleManager.isBattleEnd = function() {
    return this._phase === "battleEnd";
};

BattleManager.canEscape = function() {
    return this._canEscape;
};

BattleManager.canLose = function() {
    return this._canLose;
};

BattleManager.isEscaped = function() {
    return this._escaped;
};

BattleManager.actor = function() {
    return this._currentActor;
};

BattleManager.startBattle = function() {
    this._phase = "start";
    $gameSystem.onBattleStart();
    $gameParty.onBattleStart(this._preemptive);
    $gameTroop.onBattleStart(this._surprise);
    this.displayStartMessages();
};

BattleManager.displayStartMessages = function() {
    for (const name of $gameTroop.enemyNames()) {
        $gameMessage.add(TextManager.emerge.format(name));
    }
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};

BattleManager.startInput = function() {
    this._phase = "input";
    this._inputting = true;
    $gameParty.makeActions();
    $gameTroop.makeActions();
    this._currentActor = null;
    if (this._surprise || !$gameParty.canInput()) {
        this.startTurn();
    }
};

BattleManager.inputtingAction = function() {
    return this._currentActor ? this._currentActor.inputtingAction() : null;
};

BattleManager.selectNextCommand = function() {
    if (this._currentActor) {
        if (this._currentActor.selectNextCommand()) {
            return;
        }
        this.finishActorInput();
    }
    this.selectNextActor();
};

BattleManager.selectNextActor = function() {
    this.changeCurrentActor(true);
    if (!this._currentActor) {
        if (this.isTpb()) {
            this.changeCurrentActor(true);
        } else {
            this.startTurn();
        }
    }
};

BattleManager.selectPreviousCommand = function() {
    if (this._currentActor) {
        if (this._currentActor.selectPreviousCommand()) {
            return;
        }
        this.cancelActorInput();
    }
    this.selectPreviousActor();
};

BattleManager.selectPreviousActor = function() {
    if (this.isTpb()) {
        this.changeCurrentActor(true);
        if (!this._currentActor) {
            this._inputting = $gameParty.canInput();
        }
    } else {
        this.changeCurrentActor(false);
    }
};

BattleManager.changeCurrentActor = function(forward) {
    const members = $gameParty.battleMembers();
    let actor = this._currentActor;
    for (;;) {
        const currentIndex = members.indexOf(actor);
        actor = members[currentIndex + (forward ? 1 : -1)];
        if (!actor || actor.canInput()) {
            break;
        }
    }
    this._currentActor = actor ? actor : null;
    this.startActorInput();
};

BattleManager.startActorInput = function() {
    if (this._currentActor) {
        this._currentActor.setActionState("inputting");
        this._inputting = true;
    }
};

BattleManager.finishActorInput = function() {
    if (this._currentActor) {
        if (this.isTpb()) {
            this._currentActor.startTpbCasting();
        }
        this._currentActor.setActionState("waiting");
    }
};

BattleManager.cancelActorInput = function() {
    if (this._currentActor) {
        this._currentActor.setActionState("undecided");
    }
};

BattleManager.updateStart = function() {
    if (this.isTpb()) {
        this._phase = "turn";
    } else {
        this.startInput();
    }
};

BattleManager.startTurn = function() {
    this._phase = "turn";
    $gameTroop.increaseTurn();
    $gameParty.requestMotionRefresh();
    if (!this.isTpb()) {
        this.makeActionOrders();
        this._logWindow.startTurn();
        this._inputting = false;
    }
};

BattleManager.updateTurn = function(timeActive) {
    $gameParty.requestMotionRefresh();
    if (this.isTpb() && timeActive) {
        this.updateTpb();
    }
    if (!this._subject) {
        this._subject = this.getNextSubject();
    }
    if (this._subject) {
        this.processTurn();
    } else if (!this.isTpb()) {
        this.endTurn();
    }
};

BattleManager.updateTpb = function() {
    $gameParty.updateTpb();
    $gameTroop.updateTpb();
    this.updateAllTpbBattlers();
    this.checkTpbTurnEnd();
};

BattleManager.updateAllTpbBattlers = function() {
    for (const battler of this.allBattleMembers()) {
        this.updateTpbBattler(battler);
    }
};

BattleManager.updateTpbBattler = function(battler) {
    if (battler.isTpbTurnEnd()) {
        battler.onTurnEnd();
        battler.startTpbTurn();
        this.displayBattlerStatus(battler, false);
    } else if (battler.isTpbReady()) {
        battler.startTpbAction();
        this._actionBattlers.push(battler);
    } else if (battler.isTpbTimeout()) {
        battler.onTpbTimeout();
        this.displayBattlerStatus(battler, true);
    }
};

BattleManager.checkTpbTurnEnd = function() {
    if ($gameTroop.isTpbTurnEnd()) {
        this.endTurn();
    }
};

BattleManager.processTurn = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    if (action) {
        action.prepare();
        if (action.isValid()) {
            this.startAction();
        }
        subject.removeCurrentAction();
    } else {
        this.endAction();
        this._subject = null;
    }
};

BattleManager.endBattlerActions = function(battler) {
    battler.setActionState(this.isTpb() ? "undecided" : "done");
    battler.onAllActionsEnd();
    battler.clearTpbChargeTime();
    this.displayBattlerStatus(battler, true);
};

BattleManager.endTurn = function() {
    this._phase = "turnEnd";
    this._preemptive = false;
    this._surprise = false;
    if (!this.isTpb()) {
        this.endAllBattlersTurn();
    }
};

BattleManager.endAllBattlersTurn = function() {
    for (const battler of this.allBattleMembers()) {
        battler.onTurnEnd();
        this.displayBattlerStatus(battler, false);
    }
};

BattleManager.displayBattlerStatus = function(battler, current) {
    this._logWindow.displayAutoAffectedStatus(battler);
    if (current) {
        this._logWindow.displayCurrentState(battler);
    }
    this._logWindow.displayRegeneration(battler);
};

BattleManager.updateTurnEnd = function() {
    if (this.isTpb()) {
        this.startTurn();
    } else {
        this.startInput();
    }
};

BattleManager.getNextSubject = function() {
    for (;;) {
        const battler = this._actionBattlers.shift();
        if (!battler) {
            return null;
        }
        if (battler.isBattleMember() && battler.isAlive()) {
            return battler;
        }
    }
};

BattleManager.allBattleMembers = function() {
    return $gameParty.battleMembers().concat($gameTroop.members());
};

BattleManager.makeActionOrders = function() {
    const battlers = [];
    if (!this._surprise) {
        battlers.push(...$gameParty.battleMembers());
    }
    if (!this._preemptive) {
        battlers.push(...$gameTroop.members());
    }
    for (const battler of battlers) {
        battler.makeSpeed();
    }
    battlers.sort((a, b) => b.speed() - a.speed());
    this._actionBattlers = battlers;
};

BattleManager.startAction = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    const targets = action.makeTargets();
    this._phase = "action";
    this._action = action;
    this._targets = targets;
    subject.useItem(action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(subject, action, targets);
};

BattleManager.updateAction = function() {
    const target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        this.endAction();
    }
};

BattleManager.endAction = function() {
    this._logWindow.endAction(this._subject);
    this._phase = "turn";
    if (this._subject.numActions() === 0) {
        this.endBattlerActions(this._subject);
        this._subject = null;
    }
};

BattleManager.invokeAction = function(subject, target) {
    this._logWindow.push("pushBaseLine");
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
    this._logWindow.push("popBaseLine");
};

BattleManager.invokeNormalAction = function(subject, target) {
    const realTarget = this.applySubstitute(target);
    this._action.apply(realTarget);
    this._logWindow.displayActionResults(subject, realTarget);
};

BattleManager.invokeCounterAttack = function(subject, target) {
    const action = new Game_Action(target);
    action.setAttack();
    action.apply(subject);
    this._logWindow.displayCounter(target);
    this._logWindow.displayActionResults(target, subject);
};

BattleManager.invokeMagicReflection = function(subject, target) {
    this._action._reflectionTarget = target;
    this._logWindow.displayReflection(target);
    this._action.apply(subject);
    this._logWindow.displayActionResults(target, subject);
};

BattleManager.applySubstitute = function(target) {
    if (this.checkSubstitute(target)) {
        const substitute = target.friendsUnit().substituteBattler();
        if (substitute && target !== substitute) {
            this._logWindow.displaySubstitute(substitute, target);
            return substitute;
        }
    }
    return target;
};

BattleManager.checkSubstitute = function(target) {
    return target.isDying() && !this._action.isCertainHit();
};

BattleManager.isActionForced = function() {
    return !!this._actionForcedBattler;
};

BattleManager.forceAction = function(battler) {
    this._actionForcedBattler = battler;
    this._actionBattlers.remove(battler);
};

BattleManager.processForcedAction = function() {
    if (this._actionForcedBattler) {
        if (this._subject) {
            this.endBattlerActions(this._subject);
        }
        this._subject = this._actionForcedBattler;
        this._actionForcedBattler = null;
        this.startAction();
        this._subject.removeCurrentAction();
    }
};

BattleManager.abort = function() {
    this._phase = "aborting";
};

BattleManager.checkBattleEnd = function() {
    if (this._phase) {
        if (this.checkAbort()) {
            return true;
        } else if ($gameParty.isAllDead()) {
            this.processDefeat();
            return true;
        } else if ($gameTroop.isAllDead()) {
            this.processVictory();
            return true;
        }
    }
    return false;
};

BattleManager.checkAbort = function() {
    if ($gameParty.isEmpty() || this.isAborting()) {
        this.processAbort();
    }
    return false;
};

BattleManager.processVictory = function() {
    $gameParty.removeBattleStates();
    $gameParty.performVictory();
    this.playVictoryMe();
    this.replayBgmAndBgs();
    this.makeRewards();
    this.displayVictoryMessage();
    this.displayRewards();
    this.gainRewards();
    this.endBattle(0);
};

BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    const success = this._preemptive || Math.random() < this._escapeRatio;
    if (success) {
        this.onEscapeSuccess();
    } else {
        this.onEscapeFailure();
    }
    return success;
};

BattleManager.onEscapeSuccess = function() {
    this.displayEscapeSuccessMessage();
    this._escaped = true;
    this.processAbort();
};

BattleManager.onEscapeFailure = function() {
    $gameParty.onEscapeFailure();
    this.displayEscapeFailureMessage();
    this._escapeRatio += 0.1;
    if (!this.isTpb()) {
        this.startTurn();
    }
};

BattleManager.processAbort = function() {
    $gameParty.removeBattleStates();
    this._logWindow.clear();
    this.replayBgmAndBgs();
    this.endBattle(1);
};

BattleManager.processDefeat = function() {
    this.displayDefeatMessage();
    this.playDefeatMe();
    if (this._canLose) {
        this.replayBgmAndBgs();
    } else {
        AudioManager.stopBgm();
    }
    this.endBattle(2);
};

BattleManager.endBattle = function(result) {
    this._phase = "battleEnd";
    this.cancelActorInput();
    this._inputting = false;
    if (this._eventCallback) {
        this._eventCallback(result);
    }
    if (result === 0) {
        $gameSystem.onBattleWin();
    } else if (this._escaped) {
        $gameSystem.onBattleEscape();
    }
};

BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            SceneManager.goto(Scene_Gameover);
        }
    } else {
        SceneManager.pop();
    }
    this._phase = "";
};

BattleManager.makeRewards = function() {
    this._rewards = {
        gold: $gameTroop.goldTotal(),
        exp: $gameTroop.expTotal(),
        items: $gameTroop.makeDropItems()
    };
};

BattleManager.displayVictoryMessage = function() {
    $gameMessage.add(TextManager.victory.format($gameParty.name()));
};

BattleManager.displayDefeatMessage = function() {
    $gameMessage.add(TextManager.defeat.format($gameParty.name()));
};

BattleManager.displayEscapeSuccessMessage = function() {
    $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
};

BattleManager.displayEscapeFailureMessage = function() {
    $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
    $gameMessage.add("\\." + TextManager.escapeFailure);
};

BattleManager.displayRewards = function() {
    this.displayExp();
    this.displayGold();
    this.displayDropItems();
};

BattleManager.displayExp = function() {
    const exp = this._rewards.exp;
    if (exp > 0) {
        const text = TextManager.obtainExp.format(exp, TextManager.exp);
        $gameMessage.add("\\." + text);
    }
};

BattleManager.displayGold = function() {
    const gold = this._rewards.gold;
    if (gold > 0) {
        $gameMessage.add("\\." + TextManager.obtainGold.format(gold));
    }
};

BattleManager.displayDropItems = function() {
    const items = this._rewards.items;
    if (items.length > 0) {
        $gameMessage.newPage();
        for (const item of items) {
            $gameMessage.add(TextManager.obtainItem.format(item.name));
        }
    }
};

BattleManager.gainRewards = function() {
    this.gainExp();
    this.gainGold();
    this.gainDropItems();
};

BattleManager.gainExp = function() {
    const exp = this._rewards.exp;
    for (const actor of $gameParty.allMembers()) {
        actor.gainExp(exp);
    }
};

BattleManager.gainGold = function() {
    $gameParty.gainGold(this._rewards.gold);
};

BattleManager.gainDropItems = function() {
    const items = this._rewards.items;
    for (const item of items) {
        $gameParty.gainItem(item, 1);
    }
};

