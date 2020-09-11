
// Sprite_Battler
//
// The superclass of Sprite_Actor and Sprite_Enemy.

function Sprite_Battler() {
    this.initialize(...arguments);
}

Sprite_Battler.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_Battler.prototype.constructor = Sprite_Battler;

Sprite_Battler.prototype.initialize = function(battler) {
    Sprite_Clickable.prototype.initialize.call(this);
    this.initMembers();
    this.setBattler(battler);
};

Sprite_Battler.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._battler = null;
    this._damages = [];
    this._homeX = 0;
    this._homeY = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._targetOffsetX = NaN;
    this._targetOffsetY = NaN;
    this._movementDuration = 0;
    this._selectionEffectCount = 0;
};

Sprite_Battler.prototype.setBattler = function(battler) {
    this._battler = battler;
};

Sprite_Battler.prototype.checkBattler = function(battler) {
    return this._battler === battler;
};

Sprite_Battler.prototype.mainSprite = function() {
    return this;
};

Sprite_Battler.prototype.setHome = function(x, y) {
    this._homeX = x;
    this._homeY = y;
    this.updatePosition();
};

Sprite_Battler.prototype.update = function() {
    Sprite_Clickable.prototype.update.call(this);
    if (this._battler) {
        this.updateMain();
        this.updateDamagePopup();
        this.updateSelectionEffect();
        this.updateVisibility();
    } else {
        this.bitmap = null;
    }
};

Sprite_Battler.prototype.updateVisibility = function() {
    Sprite_Clickable.prototype.updateVisibility.call(this);
    if (!this._battler || !this._battler.isSpriteVisible()) {
        this.visible = false;
    }
};

Sprite_Battler.prototype.updateMain = function() {
    if (this._battler.isSpriteVisible()) {
        this.updateBitmap();
        this.updateFrame();
    }
    this.updateMove();
    this.updatePosition();
};

Sprite_Battler.prototype.updateBitmap = function() {
    //
};

Sprite_Battler.prototype.updateFrame = function() {
    //
};

Sprite_Battler.prototype.updateMove = function() {
    if (this._movementDuration > 0) {
        const d = this._movementDuration;
        this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
        this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
        this._movementDuration--;
        if (this._movementDuration === 0) {
            this.onMoveEnd();
        }
    }
};

Sprite_Battler.prototype.updatePosition = function() {
    this.x = this._homeX + this._offsetX;
    this.y = this._homeY + this._offsetY;
};

Sprite_Battler.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
        for (const damage of this._damages) {
            damage.update();
        }
        if (!this._damages[0].isPlaying()) {
            this.destroyDamageSprite(this._damages[0]);
        }
    }
};

Sprite_Battler.prototype.updateSelectionEffect = function() {
    const target = this.mainSprite();
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            target.setBlendColor([255, 255, 255, 64]);
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
    }
};

Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            this.createDamageSprite();
        }
        this._battler.clearDamagePopup();
        this._battler.clearResult();
    }
};

Sprite_Battler.prototype.createDamageSprite = function() {
    const last = this._damages[this._damages.length - 1];
    const sprite = new Sprite_Damage();
    if (last) {
        sprite.x = last.x + 8;
        sprite.y = last.y - 16;
    } else {
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
    }
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
};

Sprite_Battler.prototype.destroyDamageSprite = function(sprite) {
    this.parent.removeChild(sprite);
    this._damages.remove(sprite);
    sprite.destroy();
};

Sprite_Battler.prototype.damageOffsetX = function() {
    return 0;
};

Sprite_Battler.prototype.damageOffsetY = function() {
    return 0;
};

Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
        this._targetOffsetX = x;
        this._targetOffsetY = y;
        this._movementDuration = duration;
        if (duration === 0) {
            this._offsetX = x;
            this._offsetY = y;
        }
    }
};

Sprite_Battler.prototype.onMoveEnd = function() {
    //
};

Sprite_Battler.prototype.isEffecting = function() {
    return false;
};

Sprite_Battler.prototype.isMoving = function() {
    return this._movementDuration > 0;
};

Sprite_Battler.prototype.inHomePosition = function() {
    return this._offsetX === 0 && this._offsetY === 0;
};

Sprite_Battler.prototype.onMouseEnter = function() {
    $gameTemp.setTouchState(this._battler, "select");
};

Sprite_Battler.prototype.onPress = function() {
    $gameTemp.setTouchState(this._battler, "select");
};

Sprite_Battler.prototype.onClick = function() {
    $gameTemp.setTouchState(this._battler, "click");
};

