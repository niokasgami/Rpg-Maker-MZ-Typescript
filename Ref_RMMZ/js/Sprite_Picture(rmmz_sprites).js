
// Sprite_Picture
//
// The sprite for displaying a picture.

function Sprite_Picture() {
    this.initialize(...arguments);
}

Sprite_Picture.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_Picture.prototype.constructor = Sprite_Picture;

Sprite_Picture.prototype.initialize = function(pictureId) {
    Sprite_Clickable.prototype.initialize.call(this);
    this._pictureId = pictureId;
    this._pictureName = "";
    this.update();
};

Sprite_Picture.prototype.picture = function() {
    return $gameScreen.picture(this._pictureId);
};

Sprite_Picture.prototype.update = function() {
    Sprite_Clickable.prototype.update.call(this);
    this.updateBitmap();
    if (this.visible) {
        this.updateOrigin();
        this.updatePosition();
        this.updateScale();
        this.updateTone();
        this.updateOther();
    }
};

Sprite_Picture.prototype.updateBitmap = function() {
    const picture = this.picture();
    if (picture) {
        const pictureName = picture.name();
        if (this._pictureName !== pictureName) {
            this._pictureName = pictureName;
            this.loadBitmap();
        }
        this.visible = true;
    } else {
        this._pictureName = "";
        this.bitmap = null;
        this.visible = false;
    }
};

Sprite_Picture.prototype.updateOrigin = function() {
    const picture = this.picture();
    if (picture.origin() === 0) {
        this.anchor.x = 0;
        this.anchor.y = 0;
    } else {
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    }
};

Sprite_Picture.prototype.updatePosition = function() {
    const picture = this.picture();
    this.x = Math.round(picture.x());
    this.y = Math.round(picture.y());
};

Sprite_Picture.prototype.updateScale = function() {
    const picture = this.picture();
    this.scale.x = picture.scaleX() / 100;
    this.scale.y = picture.scaleY() / 100;
};

Sprite_Picture.prototype.updateTone = function() {
    const picture = this.picture();
    if (picture.tone()) {
        this.setColorTone(picture.tone());
    } else {
        this.setColorTone([0, 0, 0, 0]);
    }
};

Sprite_Picture.prototype.updateOther = function() {
    const picture = this.picture();
    this.opacity = picture.opacity();
    this.blendMode = picture.blendMode();
    this.rotation = (picture.angle() * Math.PI) / 180;
};

Sprite_Picture.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadPicture(this._pictureName);
};

