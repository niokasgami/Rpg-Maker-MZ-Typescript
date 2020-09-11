
// Window_ScrollText
//
// The window for displaying scrolling text. No frame is displayed, but it
// is handled as a window for convenience.

function Window_ScrollText() {
    this.initialize(...arguments);
}

Window_ScrollText.prototype = Object.create(Window_Base.prototype);
Window_ScrollText.prototype.constructor = Window_ScrollText;

Window_ScrollText.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, new Rectangle());
    this.opacity = 0;
    this.hide();
    this._reservedRect = rect;
    this._text = "";
    this._allTextHeight = 0;
};

Window_ScrollText.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if ($gameMessage.scrollMode()) {
        if (this._text) {
            this.updateMessage();
        }
        if (!this._text && $gameMessage.hasText()) {
            this.startMessage();
        }
    }
};

Window_ScrollText.prototype.startMessage = function() {
    this._text = $gameMessage.allText();
    this.updatePlacement();
    this.refresh();
    this.show();
};

Window_ScrollText.prototype.refresh = function() {
    this._allTextHeight = this.textSizeEx(this._text).height;
    this.createContents();
    this.origin.y = -this.height;
    const rect = this.baseTextRect();
    this.drawTextEx(this._text, rect.x, rect.y, rect.width);
};

Window_ScrollText.prototype.updatePlacement = function() {
    const rect = this._reservedRect;
    this.move(rect.x, rect.y, rect.width, rect.height);
};

Window_ScrollText.prototype.contentsHeight = function() {
    return Math.max(this._allTextHeight, 1);
};

Window_ScrollText.prototype.updateMessage = function() {
    this.origin.y += this.scrollSpeed();
    if (this.origin.y >= this.contents.height) {
        this.terminateMessage();
    }
};

Window_ScrollText.prototype.scrollSpeed = function() {
    let speed = $gameMessage.scrollSpeed() / 2;
    if (this.isFastForward()) {
        speed *= this.fastForwardRate();
    }
    return speed;
};

Window_ScrollText.prototype.isFastForward = function() {
    if ($gameMessage.scrollNoFast()) {
        return false;
    } else {
        return (
            Input.isPressed("ok") ||
            Input.isPressed("shift") ||
            TouchInput.isPressed()
        );
    }
};

Window_ScrollText.prototype.fastForwardRate = function() {
    return 3;
};

Window_ScrollText.prototype.terminateMessage = function() {
    this._text = null;
    $gameMessage.clear();
    this.hide();
};

