
// Scene_Battle
//
// The scene class of the battle screen.

function Scene_Battle() {
    this.initialize(...arguments);
}

Scene_Battle.prototype = Object.create(Scene_Message.prototype);
Scene_Battle.prototype.constructor = Scene_Battle;

Scene_Battle.prototype.initialize = function() {
    Scene_Message.prototype.initialize.call(this);
};

Scene_Battle.prototype.create = function() {
    Scene_Message.prototype.create.call(this);
    this.createDisplayObjects();
};

Scene_Battle.prototype.start = function() {
    Scene_Message.prototype.start.call(this);
    BattleManager.playBattleBgm();
    BattleManager.startBattle();
    this._statusWindow.refresh();
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Battle.prototype.update = function() {
    const active = this.isActive();
    $gameTimer.update(active);
    $gameScreen.update();
    this.updateVisibility();
    if (active && !this.isBusy()) {
        this.updateBattleProcess();
    }
    Scene_Message.prototype.update.call(this);
};

Scene_Battle.prototype.updateVisibility = function() {
    this.updateLogWindowVisibility();
    this.updateStatusWindowVisibility();
    this.updateInputWindowVisibility();
    this.updateCancelButton();
};

Scene_Battle.prototype.updateBattleProcess = function() {
    BattleManager.update(this.isTimeActive());
};

Scene_Battle.prototype.isTimeActive = function() {
    if (BattleManager.isActiveTpb()) {
        return !this._skillWindow.active && !this._itemWindow.active;
    } else {
        return !this.isAnyInputWindowActive();
    }
};

Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return (
        this._partyCommandWindow.active ||
        this._actorCommandWindow.active ||
        this._skillWindow.active ||
        this._itemWindow.active ||
        this._actorWindow.active ||
        this._enemyWindow.active
    );
};

Scene_Battle.prototype.changeInputWindow = function() {
    this.hideSubInputWindows();
    if (BattleManager.isInputting()) {
        if (BattleManager.actor()) {
            this.startActorCommandSelection();
        } else {
            this.startPartyCommandSelection();
        }
    } else {
        this.endCommandSelection();
    }
};

Scene_Battle.prototype.stop = function() {
    Scene_Message.prototype.stop.call(this);
    if (this.needsSlowFadeOut()) {
        this.startFadeOut(this.slowFadeSpeed(), false);
    } else {
        this.startFadeOut(this.fadeSpeed(), false);
    }
    this._statusWindow.close();
    this._partyCommandWindow.close();
    this._actorCommandWindow.close();
};

Scene_Battle.prototype.terminate = function() {
    Scene_Message.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();
    if (this.shouldAutosave()) {
        this.requestAutosave();
    }
};

Scene_Battle.prototype.shouldAutosave = function() {
    return SceneManager.isNextScene(Scene_Map);
};

Scene_Battle.prototype.needsSlowFadeOut = function() {
    return (
        SceneManager.isNextScene(Scene_Title) ||
        SceneManager.isNextScene(Scene_Gameover)
    );
};

Scene_Battle.prototype.updateLogWindowVisibility = function() {
    this._logWindow.visible = !this._helpWindow.visible;
};

Scene_Battle.prototype.updateStatusWindowVisibility = function() {
    if ($gameMessage.isBusy()) {
        this._statusWindow.close();
    } else if (this.shouldOpenStatusWindow()) {
        this._statusWindow.open();
    }
    this.updateStatusWindowPosition();
};

Scene_Battle.prototype.shouldOpenStatusWindow = function() {
    return (
        this.isActive() &&
        !this.isMessageWindowClosing() &&
        !BattleManager.isBattleEnd()
    );
};

Scene_Battle.prototype.updateStatusWindowPosition = function() {
    const statusWindow = this._statusWindow;
    const targetX = this.statusWindowX();
    if (statusWindow.x < targetX) {
        statusWindow.x = Math.min(statusWindow.x + 16, targetX);
    }
    if (statusWindow.x > targetX) {
        statusWindow.x = Math.max(statusWindow.x - 16, targetX);
    }
};

Scene_Battle.prototype.statusWindowX = function() {
    if (this.isAnyInputWindowActive()) {
        return this.statusWindowRect().x;
    } else {
        return this._partyCommandWindow.width / 2;
    }
};

Scene_Battle.prototype.updateInputWindowVisibility = function() {
    if ($gameMessage.isBusy()) {
        this.closeCommandWindows();
        this.hideSubInputWindows();
    } else if (this.needsInputWindowChange()) {
        this.changeInputWindow();
    }
};

Scene_Battle.prototype.needsInputWindowChange = function() {
    const windowActive = this.isAnyInputWindowActive();
    const inputting = BattleManager.isInputting();
    if (windowActive && inputting) {
        return this._actorCommandWindow.actor() !== BattleManager.actor();
    }
    return windowActive !== inputting;
};

Scene_Battle.prototype.updateCancelButton = function() {
    if (this._cancelButton) {
        this._cancelButton.visible =
            this.isAnyInputWindowActive() && !this._partyCommandWindow.active;
    }
};

Scene_Battle.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
    this.createButtons();
    BattleManager.setLogWindow(this._logWindow);
    BattleManager.setSpriteset(this._spriteset);
    this._logWindow.setSpriteset(this._spriteset);
};

Scene_Battle.prototype.createSpriteset = function() {
    this._spriteset = new Spriteset_Battle();
    this.addChild(this._spriteset);
};

Scene_Battle.prototype.createAllWindows = function() {
    this.createLogWindow();
    this.createStatusWindow();
    this.createPartyCommandWindow();
    this.createActorCommandWindow();
    this.createHelpWindow();
    this.createSkillWindow();
    this.createItemWindow();
    this.createActorWindow();
    this.createEnemyWindow();
    Scene_Message.prototype.createAllWindows.call(this);
};

Scene_Battle.prototype.createLogWindow = function() {
    const rect = this.logWindowRect();
    this._logWindow = new Window_BattleLog(rect);
    this.addWindow(this._logWindow);
};

Scene_Battle.prototype.logWindowRect = function() {
    const wx = 0;
    const wy = 0;
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(10, false);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    const statusWindow = new Window_BattleStatus(rect);
    this.addWindow(statusWindow);
    this._statusWindow = statusWindow;
};

Scene_Battle.prototype.statusWindowRect = function() {
    const extra = 10;
    const ww = Graphics.boxWidth - 192;
    const wh = this.windowAreaHeight() + extra;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = Graphics.boxHeight - wh + extra - 4;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createPartyCommandWindow = function() {
    const rect = this.partyCommandWindowRect();
    const commandWindow = new Window_PartyCommand(rect);
    commandWindow.setHandler("fight", this.commandFight.bind(this));
    commandWindow.setHandler("escape", this.commandEscape.bind(this));
    commandWindow.deselect();
    this.addWindow(commandWindow);
    this._partyCommandWindow = commandWindow;
};

Scene_Battle.prototype.partyCommandWindowRect = function() {
    const ww = 192;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createActorCommandWindow = function() {
    const rect = this.actorCommandWindowRect();
    const commandWindow = new Window_ActorCommand(rect);
    commandWindow.y = Graphics.boxHeight - commandWindow.height;
    commandWindow.setHandler("attack", this.commandAttack.bind(this));
    commandWindow.setHandler("skill", this.commandSkill.bind(this));
    commandWindow.setHandler("guard", this.commandGuard.bind(this));
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("cancel", this.commandCancel.bind(this));
    this.addWindow(commandWindow);
    this._actorCommandWindow = commandWindow;
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
    const ww = 192;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect();
    this._helpWindow = new Window_Help(rect);
    this._helpWindow.hide();
    this.addWindow(this._helpWindow);
};

Scene_Battle.prototype.helpWindowRect = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createSkillWindow = function() {
    const rect = this.skillWindowRect();
    this._skillWindow = new Window_BattleSkill(rect);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler("ok", this.onSkillOk.bind(this));
    this._skillWindow.setHandler("cancel", this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
};

Scene_Battle.prototype.skillWindowRect = function() {
    const ww = Graphics.boxWidth;
    const wh = this.windowAreaHeight();
    const wx = 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_BattleItem(rect);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_Battle.prototype.itemWindowRect = function() {
    return this.skillWindowRect();
};

Scene_Battle.prototype.createActorWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_BattleActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
};

Scene_Battle.prototype.actorWindowRect = function() {
    return this.statusWindowRect();
};

Scene_Battle.prototype.createEnemyWindow = function() {
    const rect = this.enemyWindowRect();
    this._enemyWindow = new Window_BattleEnemy(rect);
    this._enemyWindow.setHandler("ok", this.onEnemyOk.bind(this));
    this._enemyWindow.setHandler("cancel", this.onEnemyCancel.bind(this));
    this.addWindow(this._enemyWindow);
};

Scene_Battle.prototype.enemyWindowRect = function() {
    const wx = this._statusWindow.x;
    const ww = this._statusWindow.width;
    const wh = this.windowAreaHeight();
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.helpAreaTop = function() {
    return 0;
};

Scene_Battle.prototype.helpAreaBottom = function() {
    return this.helpAreaTop() + this.helpAreaHeight();
};

Scene_Battle.prototype.helpAreaHeight = function() {
    return this.calcWindowHeight(2, false);
};

Scene_Battle.prototype.buttonAreaTop = function() {
    return this.helpAreaBottom();
};

Scene_Battle.prototype.windowAreaHeight = function() {
    return this.calcWindowHeight(4, true);
};

Scene_Battle.prototype.createButtons = function() {
    if (ConfigManager.touchUI) {
        this.createCancelButton();
    }
};

Scene_Battle.prototype.createCancelButton = function() {
    this._cancelButton = new Sprite_Button("cancel");
    this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
    this._cancelButton.y = this.buttonY();
    this.addWindow(this._cancelButton);
};

Scene_Battle.prototype.closeCommandWindows = function() {
    this._partyCommandWindow.deactivate();
    this._actorCommandWindow.deactivate();
    this._partyCommandWindow.close();
    this._actorCommandWindow.close();
};

Scene_Battle.prototype.hideSubInputWindows = function() {
    this._actorWindow.deactivate();
    this._enemyWindow.deactivate();
    this._skillWindow.deactivate();
    this._itemWindow.deactivate();
    this._actorWindow.hide();
    this._enemyWindow.hide();
    this._skillWindow.hide();
    this._itemWindow.hide();
};

Scene_Battle.prototype.startPartyCommandSelection = function() {
    this._statusWindow.deselect();
    this._statusWindow.show();
    this._statusWindow.open();
    this._actorCommandWindow.setup(null);
    this._actorCommandWindow.close();
    this._partyCommandWindow.setup();
};

Scene_Battle.prototype.commandFight = function() {
    this.selectNextCommand();
};

Scene_Battle.prototype.commandEscape = function() {
    BattleManager.processEscape();
    this.changeInputWindow();
};

Scene_Battle.prototype.startActorCommandSelection = function() {
    this._statusWindow.show();
    this._statusWindow.selectActor(BattleManager.actor());
    this._partyCommandWindow.close();
    this._actorCommandWindow.show();
    this._actorCommandWindow.setup(BattleManager.actor());
};

Scene_Battle.prototype.commandAttack = function() {
    const action = BattleManager.inputtingAction();
    action.setAttack();
    this.onSelectAction();
};

Scene_Battle.prototype.commandSkill = function() {
    this._skillWindow.setActor(BattleManager.actor());
    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
    this._skillWindow.refresh();
    this._skillWindow.show();
    this._skillWindow.activate();
    this._statusWindow.hide();
    this._actorCommandWindow.hide();
};

Scene_Battle.prototype.commandGuard = function() {
    const action = BattleManager.inputtingAction();
    action.setGuard();
    this.onSelectAction();
};

Scene_Battle.prototype.commandItem = function() {
    this._itemWindow.refresh();
    this._itemWindow.show();
    this._itemWindow.activate();
    this._statusWindow.hide();
    this._actorCommandWindow.hide();
};

Scene_Battle.prototype.commandCancel = function() {
    this.selectPreviousCommand();
};

Scene_Battle.prototype.selectNextCommand = function() {
    BattleManager.selectNextCommand();
    this.changeInputWindow();
};

Scene_Battle.prototype.selectPreviousCommand = function() {
    BattleManager.selectPreviousCommand();
    this.changeInputWindow();
};

Scene_Battle.prototype.startActorSelection = function() {
    this._actorWindow.refresh();
    this._actorWindow.show();
    this._actorWindow.activate();
};

Scene_Battle.prototype.onActorOk = function() {
    const action = BattleManager.inputtingAction();
    action.setTarget(this._actorWindow.index());
    this.hideSubInputWindows();
    this.selectNextCommand();
};

Scene_Battle.prototype.onActorCancel = function() {
    this._actorWindow.hide();
    switch (this._actorCommandWindow.currentSymbol()) {
        case "skill":
            this._skillWindow.show();
            this._skillWindow.activate();
            break;
        case "item":
            this._itemWindow.show();
            this._itemWindow.activate();
            break;
    }
};

Scene_Battle.prototype.startEnemySelection = function() {
    this._enemyWindow.refresh();
    this._enemyWindow.show();
    this._enemyWindow.select(0);
    this._enemyWindow.activate();
    this._statusWindow.hide();
};

Scene_Battle.prototype.onEnemyOk = function() {
    const action = BattleManager.inputtingAction();
    action.setTarget(this._enemyWindow.enemyIndex());
    this.hideSubInputWindows();
    this.selectNextCommand();
};

Scene_Battle.prototype.onEnemyCancel = function() {
    this._enemyWindow.hide();
    switch (this._actorCommandWindow.currentSymbol()) {
        case "attack":
            this._statusWindow.show();
            this._actorCommandWindow.activate();
            break;
        case "skill":
            this._skillWindow.show();
            this._skillWindow.activate();
            break;
        case "item":
            this._itemWindow.show();
            this._itemWindow.activate();
            break;
    }
};

Scene_Battle.prototype.onSkillOk = function() {
    const skill = this._skillWindow.item();
    const action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
};

Scene_Battle.prototype.onSkillCancel = function() {
    this._skillWindow.hide();
    this._statusWindow.show();
    this._actorCommandWindow.show();
    this._actorCommandWindow.activate();
};

Scene_Battle.prototype.onItemOk = function() {
    const item = this._itemWindow.item();
    const action = BattleManager.inputtingAction();
    action.setItem(item.id);
    $gameParty.setLastItem(item);
    this.onSelectAction();
};

Scene_Battle.prototype.onItemCancel = function() {
    this._itemWindow.hide();
    this._statusWindow.show();
    this._actorCommandWindow.show();
    this._actorCommandWindow.activate();
};

Scene_Battle.prototype.onSelectAction = function() {
    const action = BattleManager.inputtingAction();
    if (!action.needsSelection()) {
        this.selectNextCommand();
    } else if (action.isForOpponent()) {
        this.startEnemySelection();
    } else {
        this.startActorSelection();
    }
};

Scene_Battle.prototype.endCommandSelection = function() {
    this.closeCommandWindows();
    this.hideSubInputWindows();
    this._statusWindow.deselect();
    this._statusWindow.show();
};

