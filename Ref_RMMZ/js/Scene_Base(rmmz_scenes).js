
// Scene_Base
//
// The superclass of all scenes within the game.

function Scene_Base() {
    this.initialize(...arguments);
}

Scene_Base.prototype = Object.create(Stage.prototype);
Scene_Base.prototype.constructor = Scene_Base;

Scene_Base.prototype.initialize = function() {
    Stage.prototype.initialize.call(this);
    this._started = false;
    this._active = false;
    this._fadeSign = 0;
    this._fadeDuration = 0;
    this._fadeWhite = 0;
    this._fadeOpacity = 0;
    this.createColorFilter();
};

Scene_Base.prototype.create = function() {
    //
};

Scene_Base.prototype.isActive = function() {
    return this._active;
};

Scene_Base.prototype.isReady = function() {
    return (
        ImageManager.isReady() &&
        EffectManager.isReady() &&
        FontManager.isReady()
    );
};

Scene_Base.prototype.start = function() {
    this._started = true;
    this._active = true;
};

Scene_Base.prototype.update = function() {
    this.updateFade();
    this.updateColorFilter();
    this.updateChildren();
    AudioManager.checkErrors();
};

Scene_Base.prototype.stop = function() {
    this._active = false;
};

Scene_Base.prototype.isStarted = function() {
    return this._started;
};

Scene_Base.prototype.isBusy = function() {
    return this.isFading();
};

Scene_Base.prototype.isFading = function() {
    return this._fadeDuration > 0;
};

Scene_Base.prototype.terminate = function() {
    //
};

Scene_Base.prototype.createWindowLayer = function() {
    this._windowLayer = new WindowLayer();
    this._windowLayer.x = (Graphics.width - Graphics.boxWidth) / 2;
    this._windowLayer.y = (Graphics.height - Graphics.boxHeight) / 2;
    this.addChild(this._windowLayer);
};

Scene_Base.prototype.addWindow = function(window) {
    this._windowLayer.addChild(window);
};

Scene_Base.prototype.startFadeIn = function(duration, white) {
    this._fadeSign = 1;
    this._fadeDuration = duration || 30;
    this._fadeWhite = white;
    this._fadeOpacity = 255;
    this.updateColorFilter();
};

Scene_Base.prototype.startFadeOut = function(duration, white) {
    this._fadeSign = -1;
    this._fadeDuration = duration || 30;
    this._fadeWhite = white;
    this._fadeOpacity = 0;
    this.updateColorFilter();
};

Scene_Base.prototype.createColorFilter = function() {
    this._colorFilter = new ColorFilter();
    this.filters = [this._colorFilter];
};

Scene_Base.prototype.updateColorFilter = function() {
    const c = this._fadeWhite ? 255 : 0;
    const blendColor = [c, c, c, this._fadeOpacity];
    this._colorFilter.setBlendColor(blendColor);
};

Scene_Base.prototype.updateFade = function() {
    if (this._fadeDuration > 0) {
        const d = this._fadeDuration;
        if (this._fadeSign > 0) {
            this._fadeOpacity -= this._fadeOpacity / d;
        } else {
            this._fadeOpacity += (255 - this._fadeOpacity) / d;
        }
        this._fadeDuration--;
    }
};

Scene_Base.prototype.updateChildren = function() {
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};

Scene_Base.prototype.popScene = function() {
    SceneManager.pop();
};

Scene_Base.prototype.checkGameover = function() {
    if ($gameParty.isAllDead()) {
        SceneManager.goto(Scene_Gameover);
    }
};

Scene_Base.prototype.fadeOutAll = function() {
    const time = this.slowFadeSpeed() / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
    this.startFadeOut(this.slowFadeSpeed());
};

Scene_Base.prototype.fadeSpeed = function() {
    return 24;
};

Scene_Base.prototype.slowFadeSpeed = function() {
    return this.fadeSpeed() * 2;
};

Scene_Base.prototype.scaleSprite = function(sprite) {
    const ratioX = Graphics.width / sprite.bitmap.width;
    const ratioY = Graphics.height / sprite.bitmap.height;
    const scale = Math.max(ratioX, ratioY, 1.0);
    sprite.scale.x = scale;
    sprite.scale.y = scale;
};

Scene_Base.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Scene_Base.prototype.isBottomHelpMode = function() {
    return true;
};

Scene_Base.prototype.isBottomButtonMode = function() {
    return false;
};

Scene_Base.prototype.isRightInputMode = function() {
    return true;
};

Scene_Base.prototype.mainCommandWidth = function() {
    return 240;
};

Scene_Base.prototype.buttonAreaTop = function() {
    if (this.isBottomButtonMode()) {
        return Graphics.boxHeight - this.buttonAreaHeight();
    } else {
        return 0;
    }
};

Scene_Base.prototype.buttonAreaBottom = function() {
    return this.buttonAreaTop() + this.buttonAreaHeight();
};

Scene_Base.prototype.buttonAreaHeight = function() {
    return 52;
};

Scene_Base.prototype.buttonY = function() {
    const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2);
    return this.buttonAreaTop() + offsetY;
};

Scene_Base.prototype.calcWindowHeight = function(numLines, selectable) {
    if (selectable) {
        return Window_Selectable.prototype.fittingHeight(numLines);
    } else {
        return Window_Base.prototype.fittingHeight(numLines);
    }
};

Scene_Base.prototype.requestAutosave = function() {
    if (this.isAutosaveEnabled()) {
        this.executeAutosave();
    }
};

Scene_Base.prototype.isAutosaveEnabled = function() {
    return (
        !DataManager.isBattleTest() &&
        !DataManager.isEventTest() &&
        $gameSystem.isAutosaveEnabled() &&
        $gameSystem.isSaveEnabled()
    );
};

Scene_Base.prototype.executeAutosave = function() {
    $gameSystem.onBeforeSave();
    DataManager.saveGame(0)
        .then(() => this.onAutosaveSuccess())
        .catch(() => this.onAutosaveFailure());
};

Scene_Base.prototype.onAutosaveSuccess = function() {
    //
};

Scene_Base.prototype.onAutosaveFailure = function() {
    //
};

