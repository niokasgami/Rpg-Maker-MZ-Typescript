
// Window_NameBox
//
// The window for displaying a speaker name above the message window.

function Window_NameBox() {
    this.initialize(...arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, new Rectangle());
    this.openness = 0;
    this._name = "";
};

Window_NameBox.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
};

Window_NameBox.prototype.setName = function(name) {
    if (this._name !== name) {
        this._name = name;
        this.refresh();
    }
};

Window_NameBox.prototype.clear = function() {
    this.setName("");
};

Window_NameBox.prototype.start = function() {
    this.updatePlacement();
    this.updateBackground();
    this.createContents();
    this.refresh();
};

Window_NameBox.prototype.updatePlacement = function() {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    const messageWindow = this._messageWindow;
    if ($gameMessage.isRTL()) {
        this.x = messageWindow.x + messageWindow.width - this.width;
    } else {
        this.x = messageWindow.x;
    }
    if (messageWindow.y > 0) {
        this.y = messageWindow.y - this.height;
    } else {
        this.y = messageWindow.y + messageWindow.height;
    }
};

Window_NameBox.prototype.updateBackground = function() {
    this.setBackgroundType($gameMessage.background());
};

Window_NameBox.prototype.windowWidth = function() {
    if (this._name) {
        const textWidth = this.textSizeEx(this._name).width;
        const padding = this.padding + this.itemPadding();
        const width = Math.ceil(textWidth) + padding * 2;
        return Math.min(width, Graphics.boxWidth);
    } else {
        return 0;
    }
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.refresh = function() {
    const rect = this.baseTextRect();
    this.contents.clear();
    this.drawTextEx(this._name, rect.x, rect.y, rect.width);
};

