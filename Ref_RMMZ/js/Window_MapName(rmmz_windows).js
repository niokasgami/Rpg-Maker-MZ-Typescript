
// Window_MapName
//
// The window for displaying the map name on the map screen.

function Window_MapName() {
    this.initialize(...arguments);
}

Window_MapName.prototype = Object.create(Window_Base.prototype);
Window_MapName.prototype.constructor = Window_MapName;

Window_MapName.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.refresh();
};

Window_MapName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._showCount > 0 && $gameMap.isNameDisplayEnabled()) {
        this.updateFadeIn();
        this._showCount--;
    } else {
        this.updateFadeOut();
    }
};

Window_MapName.prototype.updateFadeIn = function() {
    this.contentsOpacity += 16;
};

Window_MapName.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 16;
};

Window_MapName.prototype.open = function() {
    this.refresh();
    this._showCount = 150;
};

Window_MapName.prototype.close = function() {
    this._showCount = 0;
};

Window_MapName.prototype.refresh = function() {
    this.contents.clear();
    if ($gameMap.displayName()) {
        const width = this.innerWidth;
        this.drawBackground(0, 0, width, this.lineHeight());
        this.drawText($gameMap.displayName(), 0, 0, width, "center");
    }
};

Window_MapName.prototype.drawBackground = function(x, y, width, height) {
    const color1 = ColorManager.dimColor1();
    const color2 = ColorManager.dimColor2();
    const half = width / 2;
    this.contents.gradientFillRect(x, y, half, height, color2, color1);
    this.contents.gradientFillRect(x + half, y, half, height, color1, color2);
};

