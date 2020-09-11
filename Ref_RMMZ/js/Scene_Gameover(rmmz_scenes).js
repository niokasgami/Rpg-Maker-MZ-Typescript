
// Scene_Gameover
//
// The scene class of the game over screen.

function Scene_Gameover() {
    this.initialize(...arguments);
}

Scene_Gameover.prototype = Object.create(Scene_Base.prototype);
Scene_Gameover.prototype.constructor = Scene_Gameover;

Scene_Gameover.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Gameover.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.playGameoverMusic();
    this.createBackground();
};

Scene_Gameover.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.adjustBackground();
    this.startFadeIn(this.slowFadeSpeed(), false);
};

Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        this.gotoTitle();
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Gameover.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();
};

Scene_Gameover.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};

Scene_Gameover.prototype.playGameoverMusic = function() {
    AudioManager.stopBgm();
    AudioManager.stopBgs();
    AudioManager.playMe($dataSystem.gameoverMe);
};

Scene_Gameover.prototype.createBackground = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadSystem("GameOver");
    this.addChild(this._backSprite);
};

Scene_Gameover.prototype.adjustBackground = function() {
    this.scaleSprite(this._backSprite);
    this.centerSprite(this._backSprite);
};

Scene_Gameover.prototype.isTriggered = function() {
    return Input.isTriggered("ok") || TouchInput.isTriggered();
};

Scene_Gameover.prototype.gotoTitle = function() {
    SceneManager.goto(Scene_Title);
};

