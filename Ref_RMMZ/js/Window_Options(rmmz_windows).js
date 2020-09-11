
// Window_Options
//
// The window for changing various settings on the options screen.

function Window_Options() {
    this.initialize(...arguments);
}

Window_Options.prototype = Object.create(Window_Command.prototype);
Window_Options.prototype.constructor = Window_Options;

Window_Options.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
};

Window_Options.prototype.makeCommandList = function() {
    this.addGeneralOptions();
    this.addVolumeOptions();
};

Window_Options.prototype.addGeneralOptions = function() {
    this.addCommand(TextManager.alwaysDash, "alwaysDash");
    this.addCommand(TextManager.commandRemember, "commandRemember");
    this.addCommand(TextManager.touchUI, "touchUI");
};

Window_Options.prototype.addVolumeOptions = function() {
    this.addCommand(TextManager.bgmVolume, "bgmVolume");
    this.addCommand(TextManager.bgsVolume, "bgsVolume");
    this.addCommand(TextManager.meVolume, "meVolume");
    this.addCommand(TextManager.seVolume, "seVolume");
};

Window_Options.prototype.drawItem = function(index) {
    const title = this.commandName(index);
    const status = this.statusText(index);
    const rect = this.itemLineRect(index);
    const statusWidth = this.statusWidth();
    const titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(title, rect.x, rect.y, titleWidth, "left");
    this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right");
};

Window_Options.prototype.statusWidth = function() {
    return 120;
};

Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else {
        return this.booleanStatusText(value);
    }
};

Window_Options.prototype.isVolumeSymbol = function(symbol) {
    return symbol.includes("Volume");
};

Window_Options.prototype.booleanStatusText = function(value) {
    return value ? "ON" : "OFF";
};

Window_Options.prototype.volumeStatusText = function(value) {
    return value + "%";
};

Window_Options.prototype.processOk = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isVolumeSymbol(symbol)) {
        this.changeVolume(symbol, true, true);
    } else {
        this.changeValue(symbol, !this.getConfigValue(symbol));
    }
};

Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isVolumeSymbol(symbol)) {
        this.changeVolume(symbol, true, false);
    } else {
        this.changeValue(symbol, true);
    }
};

Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isVolumeSymbol(symbol)) {
        this.changeVolume(symbol, false, false);
    } else {
        this.changeValue(symbol, false);
    }
};

Window_Options.prototype.changeVolume = function(symbol, forward, wrap) {
    const lastValue = this.getConfigValue(symbol);
    const offset = this.volumeOffset();
    const value = lastValue + (forward ? offset : -offset);
    if (value > 100 && wrap) {
        this.changeValue(symbol, 0);
    } else {
        this.changeValue(symbol, value.clamp(0, 100));
    }
};

Window_Options.prototype.volumeOffset = function() {
    return 20;
};

Window_Options.prototype.changeValue = function(symbol, value) {
    const lastValue = this.getConfigValue(symbol);
    if (lastValue !== value) {
        this.setConfigValue(symbol, value);
        this.redrawItem(this.findSymbol(symbol));
        this.playCursorSound();
    }
};

Window_Options.prototype.getConfigValue = function(symbol) {
    return ConfigManager[symbol];
};

Window_Options.prototype.setConfigValue = function(symbol, volume) {
    ConfigManager[symbol] = volume;
};

