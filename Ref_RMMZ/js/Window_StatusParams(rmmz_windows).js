
// Window_StatusParams
//
// The window for displaying parameters on the status screen.

function Window_StatusParams() {
    this.initialize(...arguments);
}

Window_StatusParams.prototype = Object.create(Window_StatusBase.prototype);
Window_StatusParams.prototype.constructor = Window_StatusParams;

Window_StatusParams.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
};

Window_StatusParams.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_StatusParams.prototype.maxItems = function() {
    return 6;
};

Window_StatusParams.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_StatusParams.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const paramId = index + 2;
    const name = TextManager.param(paramId);
    const value = this._actor.param(paramId);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, rect.x, rect.y, 160);
    this.resetTextColor();
    this.drawText(value, rect.x + 160, rect.y, 60, "right");
};

Window_StatusParams.prototype.drawItemBackground = function(/*index*/) {
    //
};

