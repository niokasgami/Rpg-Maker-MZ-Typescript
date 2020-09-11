
// Sprite_Clickable
//
// The sprite class with click handling functions.

function Sprite_Clickable() {
    this.initialize(...arguments);
}

Sprite_Clickable.prototype = Object.create(Sprite.prototype);
Sprite_Clickable.prototype.constructor = Sprite_Clickable;

Sprite_Clickable.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._pressed = false;
    this._hovered = false;
};

Sprite_Clickable.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.processTouch();
};

Sprite_Clickable.prototype.processTouch = function() {
    if (this.isClickEnabled()) {
        if (this.isBeingTouched()) {
            if (!this._hovered && TouchInput.isHovered()) {
                this._hovered = true;
                this.onMouseEnter();
            }
            if (TouchInput.isTriggered()) {
                this._pressed = true;
                this.onPress();
            }
        } else {
            if (this._hovered) {
                this.onMouseExit();
            }
            this._pressed = false;
            this._hovered = false;
        }
        if (this._pressed && TouchInput.isReleased()) {
            this._pressed = false;
            this.onClick();
        }
    } else {
        this._pressed = false;
        this._hovered = false;
    }
};

Sprite_Clickable.prototype.isPressed = function() {
    return this._pressed;
};

Sprite_Clickable.prototype.isClickEnabled = function() {
    return this.worldVisible;
};

Sprite_Clickable.prototype.isBeingTouched = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
};

Sprite_Clickable.prototype.hitTest = function(x, y) {
    const rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
    );
    return rect.contains(x, y);
};

Sprite_Clickable.prototype.onMouseEnter = function() {
    //
};

Sprite_Clickable.prototype.onMouseExit = function() {
    //
};

Sprite_Clickable.prototype.onPress = function() {
    //
};

Sprite_Clickable.prototype.onClick = function() {
    //
};

