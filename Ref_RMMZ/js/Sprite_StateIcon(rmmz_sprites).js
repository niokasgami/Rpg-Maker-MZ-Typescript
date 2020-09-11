
// Sprite_StateIcon
//
// The sprite for displaying state icons.

function Sprite_StateIcon() {
    this.initialize(...arguments);
}

Sprite_StateIcon.prototype = Object.create(Sprite.prototype);
Sprite_StateIcon.prototype.constructor = Sprite_StateIcon;

Sprite_StateIcon.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
};

Sprite_StateIcon.prototype.initMembers = function() {
    this._battler = null;
    this._iconIndex = 0;
    this._animationCount = 0;
    this._animationIndex = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Sprite_StateIcon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem("IconSet");
    this.setFrame(0, 0, 0, 0);
};

Sprite_StateIcon.prototype.setup = function(battler) {
    if (this._battler !== battler) {
        this._battler = battler;
        this._animationCount = this.animationWait();
    }
};

Sprite_StateIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._animationCount++;
    if (this._animationCount >= this.animationWait()) {
        this.updateIcon();
        this.updateFrame();
        this._animationCount = 0;
    }
};

Sprite_StateIcon.prototype.animationWait = function() {
    return 40;
};

Sprite_StateIcon.prototype.updateIcon = function() {
    const icons = [];
    if (this.shouldDisplay()) {
        icons.push(...this._battler.allIcons());
    }
    if (icons.length > 0) {
        this._animationIndex++;
        if (this._animationIndex >= icons.length) {
            this._animationIndex = 0;
        }
        this._iconIndex = icons[this._animationIndex];
    } else {
        this._animationIndex = 0;
        this._iconIndex = 0;
    }
};

Sprite_StateIcon.prototype.shouldDisplay = function() {
    const battler = this._battler;
    return battler && (battler.isActor() || battler.isAlive());
};

Sprite_StateIcon.prototype.updateFrame = function() {
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (this._iconIndex % 16) * pw;
    const sy = Math.floor(this._iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
};

