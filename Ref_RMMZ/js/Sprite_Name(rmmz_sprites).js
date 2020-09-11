
// Sprite_Name
//
// The sprite for displaying a status gauge.

function Sprite_Name() {
    this.initialize(...arguments);
}

Sprite_Name.prototype = Object.create(Sprite.prototype);
Sprite_Name.prototype.constructor = Sprite_Name;

Sprite_Name.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.createBitmap();
};

Sprite_Name.prototype.initMembers = function() {
    this._battler = null;
    this._name = "";
    this._textColor = "";
};

Sprite_Name.prototype.destroy = function(options) {
    this.bitmap.destroy();
    Sprite.prototype.destroy.call(this, options);
};

Sprite_Name.prototype.createBitmap = function() {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.bitmap = new Bitmap(width, height);
};

Sprite_Name.prototype.bitmapWidth = function() {
    return 128;
};

Sprite_Name.prototype.bitmapHeight = function() {
    return 24;
};

Sprite_Name.prototype.fontFace = function() {
    return $gameSystem.mainFontFace();
};

Sprite_Name.prototype.fontSize = function() {
    return $gameSystem.mainFontSize();
};

Sprite_Name.prototype.setup = function(battler) {
    this._battler = battler;
    this.updateBitmap();
};

Sprite_Name.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
};

Sprite_Name.prototype.updateBitmap = function() {
    const name = this.name();
    const color = this.textColor();
    if (name !== this._name || color !== this._textColor) {
        this._name = name;
        this._textColor = color;
        this.redraw();
    }
};

Sprite_Name.prototype.name = function() {
    return this._battler ? this._battler.name() : "";
};

Sprite_Name.prototype.textColor = function() {
    return ColorManager.hpColor(this._battler);
};

Sprite_Name.prototype.outlineColor = function() {
    return ColorManager.outlineColor();
};

Sprite_Name.prototype.outlineWidth = function() {
    return 3;
};

Sprite_Name.prototype.redraw = function() {
    const name = this.name();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupFont();
    this.bitmap.clear();
    this.bitmap.drawText(name, 0, 0, width, height, "left");
};

Sprite_Name.prototype.setupFont = function() {
    this.bitmap.fontFace = this.fontFace();
    this.bitmap.fontSize = this.fontSize();
    this.bitmap.textColor = this.textColor();
    this.bitmap.outlineColor = this.outlineColor();
    this.bitmap.outlineWidth = this.outlineWidth();
};

