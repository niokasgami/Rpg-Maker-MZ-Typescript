
// Scene_Options
//
// The scene class of the options screen.

function Scene_Options() {
    this.initialize(...arguments);
}

Scene_Options.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Options.prototype.constructor = Scene_Options;

Scene_Options.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Options.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createOptionsWindow();
};

Scene_Options.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    ConfigManager.save();
};

Scene_Options.prototype.createOptionsWindow = function() {
    const rect = this.optionsWindowRect();
    this._optionsWindow = new Window_Options(rect);
    this._optionsWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._optionsWindow);
};

Scene_Options.prototype.optionsWindowRect = function() {
    const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
    const ww = 400;
    const wh = this.calcWindowHeight(n, true);
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = (Graphics.boxHeight - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Options.prototype.maxCommands = function() {
    // Increase this value when adding option items.
    return 7;
};

Scene_Options.prototype.maxVisibleCommands = function() {
    return 12;
};

