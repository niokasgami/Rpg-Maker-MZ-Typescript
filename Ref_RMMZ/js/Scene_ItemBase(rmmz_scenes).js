
// Scene_ItemBase
//
// The superclass of Scene_Item and Scene_Skill.

function Scene_ItemBase() {
    this.initialize(...arguments);
}

Scene_ItemBase.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ItemBase.prototype.constructor = Scene_ItemBase;

Scene_ItemBase.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ItemBase.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
};

Scene_ItemBase.prototype.createActorWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_MenuActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
};

Scene_ItemBase.prototype.actorWindowRect = function() {
    const wx = 0;
    const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
    const ww = Graphics.boxWidth - this.mainCommandWidth();
    const wh = this.mainAreaHeight() + this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_ItemBase.prototype.item = function() {
    return this._itemWindow.item();
};

Scene_ItemBase.prototype.user = function() {
    return null;
};

Scene_ItemBase.prototype.isCursorLeft = function() {
    return this._itemWindow.index() % 2 === 0;
};

Scene_ItemBase.prototype.showActorWindow = function() {
    if (this.isCursorLeft()) {
        this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
    } else {
        this._actorWindow.x = 0;
    }
    this._actorWindow.show();
    this._actorWindow.activate();
};

Scene_ItemBase.prototype.hideActorWindow = function() {
    this._actorWindow.hide();
    this._actorWindow.deactivate();
};

Scene_ItemBase.prototype.isActorWindowActive = function() {
    return this._actorWindow && this._actorWindow.active;
};

Scene_ItemBase.prototype.onActorOk = function() {
    if (this.canUse()) {
        this.useItem();
    } else {
        SoundManager.playBuzzer();
    }
};

Scene_ItemBase.prototype.onActorCancel = function() {
    this.hideActorWindow();
    this.activateItemWindow();
};

Scene_ItemBase.prototype.determineItem = function() {
    const action = new Game_Action(this.user());
    const item = this.item();
    action.setItemObject(item);
    if (action.isForFriend()) {
        this.showActorWindow();
        this._actorWindow.selectForItem(this.item());
    } else {
        this.useItem();
        this.activateItemWindow();
    }
};

Scene_ItemBase.prototype.useItem = function() {
    this.playSeForItem();
    this.user().useItem(this.item());
    this.applyItem();
    this.checkCommonEvent();
    this.checkGameover();
    this._actorWindow.refresh();
};

Scene_ItemBase.prototype.activateItemWindow = function() {
    this._itemWindow.refresh();
    this._itemWindow.activate();
};

Scene_ItemBase.prototype.itemTargetActors = function() {
    const action = new Game_Action(this.user());
    action.setItemObject(this.item());
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [$gameParty.members()[this._actorWindow.index()]];
    }
};

Scene_ItemBase.prototype.canUse = function() {
    const user = this.user();
    return user && user.canUse(this.item()) && this.isItemEffectsValid();
};

Scene_ItemBase.prototype.isItemEffectsValid = function() {
    const action = new Game_Action(this.user());
    action.setItemObject(this.item());
    return this.itemTargetActors().some(target => action.testApply(target));
};

Scene_ItemBase.prototype.applyItem = function() {
    const action = new Game_Action(this.user());
    action.setItemObject(this.item());
    for (const target of this.itemTargetActors()) {
        for (let i = 0; i < action.numRepeats(); i++) {
            action.apply(target);
        }
    }
    action.applyGlobal();
};

Scene_ItemBase.prototype.checkCommonEvent = function() {
    if ($gameTemp.isCommonEventReserved()) {
        SceneManager.goto(Scene_Map);
    }
};

