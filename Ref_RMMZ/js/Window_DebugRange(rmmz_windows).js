
// Window_DebugRange
//
// The window for selecting a block of switches/variables on the debug screen.

function Window_DebugRange() {
    this.initialize(...arguments);
}

Window_DebugRange.prototype = Object.create(Window_Selectable.prototype);
Window_DebugRange.prototype.constructor = Window_DebugRange;

Window_DebugRange.lastTopRow = 0;
Window_DebugRange.lastIndex = 0;

Window_DebugRange.prototype.initialize = function(rect) {
    this._maxSwitches = Math.ceil(($dataSystem.switches.length - 1) / 10);
    this._maxVariables = Math.ceil(($dataSystem.variables.length - 1) / 10);
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this.setTopRow(Window_DebugRange.lastTopRow);
    this.select(Window_DebugRange.lastIndex);
    this.activate();
};

Window_DebugRange.prototype.maxItems = function() {
    return this._maxSwitches + this._maxVariables;
};

Window_DebugRange.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._editWindow) {
        const index = this.index();
        this._editWindow.setMode(this.mode(index));
        this._editWindow.setTopId(this.topId(index));
    }
};

Window_DebugRange.prototype.mode = function(index) {
    return this.isSwitchMode(index) ? "switch" : "variable";
};

Window_DebugRange.prototype.topId = function(index) {
    if (this.isSwitchMode(index)) {
        return index * 10 + 1;
    } else {
        return (index - this._maxSwitches) * 10 + 1;
    }
};

Window_DebugRange.prototype.isSwitchMode = function(index) {
    return index < this._maxSwitches;
};

Window_DebugRange.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const c = this.isSwitchMode(index) ? "S" : "V";
    const start = this.topId(index);
    const end = start + 9;
    const text = c + " [" + start.padZero(4) + "-" + end.padZero(4) + "]";
    this.drawText(text, rect.x, rect.y, rect.width);
};

Window_DebugRange.prototype.isCancelTriggered = function() {
    return (
        Window_Selectable.prototype.isCancelTriggered() ||
        Input.isTriggered("debug")
    );
};

Window_DebugRange.prototype.processCancel = function() {
    Window_Selectable.prototype.processCancel.call(this);
    Window_DebugRange.lastTopRow = this.topRow();
    Window_DebugRange.lastIndex = this.index();
};

Window_DebugRange.prototype.setEditWindow = function(editWindow) {
    this._editWindow = editWindow;
};

