
// Window_Help
//
// The window for displaying the description of the selected item.

function Window_Help() {
    this.initialize(...arguments);
}

Window_Help.prototype = Object.create(Window_Base.prototype);
Window_Help.prototype.constructor = Window_Help;

Window_Help.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._text = "";
};

Window_Help.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_Help.prototype.clear = function() {
    this.setText("");
};

Window_Help.prototype.setItem = function(item) {
    this.setText(item ? item.description : "");
};

Window_Help.prototype.refresh = function() {
    const rect = this.baseTextRect();
    this.contents.clear();
    this.drawTextEx(this._text, rect.x, rect.y, rect.width);
};

