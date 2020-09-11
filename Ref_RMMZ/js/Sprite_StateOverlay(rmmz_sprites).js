
// Sprite_StateOverlay
//
// The sprite for displaying an overlay image for a state.

function Sprite_StateOverlay() {
    this.initialize(...arguments);
}

Sprite_StateOverlay.prototype = Object.create(Sprite.prototype);
Sprite_StateOverlay.prototype.constructor = Sprite_StateOverlay;

Sprite_StateOverlay.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
};

Sprite_StateOverlay.prototype.initMembers = function() {
    this._battler = null;
    this._overlayIndex = 0;
    this._animationCount = 0;
    this._pattern = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

Sprite_StateOverlay.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem("States");
    this.setFrame(0, 0, 0, 0);
};

Sprite_StateOverlay.prototype.setup = function(battler) {
    this._battler = battler;
};

Sprite_StateOverlay.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._animationCount++;
    if (this._animationCount >= this.animationWait()) {
        this.updatePattern();
        this.updateFrame();
        this._animationCount = 0;
    }
};

Sprite_StateOverlay.prototype.animationWait = function() {
    return 8;
};

Sprite_StateOverlay.prototype.updatePattern = function() {
    this._pattern++;
    this._pattern %= 8;
    if (this._battler) {
        this._overlayIndex = this._battler.stateOverlayIndex();
    } else {
        this._overlayIndex = 0;
    }
};

Sprite_StateOverlay.prototype.updateFrame = function() {
    if (this._overlayIndex > 0) {
        const w = 96;
        const h = 96;
        const sx = this._pattern * w;
        const sy = (this._overlayIndex - 1) * h;
        this.setFrame(sx, sy, w, h);
    } else {
        this.setFrame(0, 0, 0, 0);
    }
};

