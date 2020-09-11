
// Scene_Debug
//
// The scene class of the debug screen.

function Scene_Debug() {
    this.initialize(...arguments);
}

Scene_Debug.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Debug.prototype.constructor = Scene_Debug;

Scene_Debug.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Debug.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createRangeWindow();
    this.createEditWindow();
    this.createDebugHelpWindow();
};

Scene_Debug.prototype.needsCancelButton = function() {
    return false;
};

Scene_Debug.prototype.createRangeWindow = function() {
    const rect = this.rangeWindowRect();
    this._rangeWindow = new Window_DebugRange(rect);
    this._rangeWindow.setHandler("ok", this.onRangeOk.bind(this));
    this._rangeWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._rangeWindow);
};

Scene_Debug.prototype.rangeWindowRect = function() {
    const wx = 0;
    const wy = 0;
    const ww = 246;
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Debug.prototype.createEditWindow = function() {
    const rect = this.editWindowRect();
    this._editWindow = new Window_DebugEdit(rect);
    this._editWindow.setHandler("cancel", this.onEditCancel.bind(this));
    this._rangeWindow.setEditWindow(this._editWindow);
    this.addWindow(this._editWindow);
};

Scene_Debug.prototype.editWindowRect = function() {
    const wx = this._rangeWindow.width;
    const wy = 0;
    const ww = Graphics.boxWidth - wx;
    const wh = this.calcWindowHeight(10, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Debug.prototype.createDebugHelpWindow = function() {
    const rect = this.debugHelpWindowRect();
    this._debugHelpWindow = new Window_Base(rect);
    this.addWindow(this._debugHelpWindow);
};

Scene_Debug.prototype.debugHelpWindowRect = function() {
    const wx = this._editWindow.x;
    const wy = this._editWindow.height;
    const ww = this._editWindow.width;
    const wh = Graphics.boxHeight - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Debug.prototype.onRangeOk = function() {
    this._editWindow.activate();
    this._editWindow.select(0);
    this.refreshHelpWindow();
};

Scene_Debug.prototype.onEditCancel = function() {
    this._rangeWindow.activate();
    this._editWindow.deselect();
    this.refreshHelpWindow();
};

Scene_Debug.prototype.refreshHelpWindow = function() {
    const helpWindow = this._debugHelpWindow;
    helpWindow.contents.clear();
    if (this._editWindow.active) {
        const rect = helpWindow.baseTextRect();
        helpWindow.drawTextEx(this.helpText(), rect.x, rect.y, rect.width);
    }
};

Scene_Debug.prototype.helpText = function() {
    if (this._rangeWindow.mode() === "switch") {
        return "Enter : ON / OFF";
    } else {
        return (
            "Left     :  -1    Pageup   : -10\n" +
            "Right    :  +1    Pagedown : +10"
        );
    }
};

