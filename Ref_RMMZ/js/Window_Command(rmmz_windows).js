
// Window_Command
//
// The superclass of windows for selecting a command.

function Window_Command() {
    this.initialize(...arguments);
}

Window_Command.prototype = Object.create(Window_Selectable.prototype);
Window_Command.prototype.constructor = Window_Command;

Window_Command.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this.select(0);
    this.activate();
};

Window_Command.prototype.maxItems = function() {
    return this._list.length;
};

Window_Command.prototype.clearCommandList = function() {
    this._list = [];
};

Window_Command.prototype.makeCommandList = function() {
    //
};

// prettier-ignore
Window_Command.prototype.addCommand = function(
    name, symbol, enabled = true, ext = null
) {
    this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext });
};

Window_Command.prototype.commandName = function(index) {
    return this._list[index].name;
};

Window_Command.prototype.commandSymbol = function(index) {
    return this._list[index].symbol;
};

Window_Command.prototype.isCommandEnabled = function(index) {
    return this._list[index].enabled;
};

Window_Command.prototype.currentData = function() {
    return this.index() >= 0 ? this._list[this.index()] : null;
};

Window_Command.prototype.isCurrentItemEnabled = function() {
    return this.currentData() ? this.currentData().enabled : false;
};

Window_Command.prototype.currentSymbol = function() {
    return this.currentData() ? this.currentData().symbol : null;
};

Window_Command.prototype.currentExt = function() {
    return this.currentData() ? this.currentData().ext : null;
};

Window_Command.prototype.findSymbol = function(symbol) {
    return this._list.findIndex(item => item.symbol === symbol);
};

Window_Command.prototype.selectSymbol = function(symbol) {
    const index = this.findSymbol(symbol);
    if (index >= 0) {
        this.forceSelect(index);
    } else {
        this.forceSelect(0);
    }
};

Window_Command.prototype.findExt = function(ext) {
    return this._list.findIndex(item => item.ext === ext);
};

Window_Command.prototype.selectExt = function(ext) {
    const index = this.findExt(ext);
    if (index >= 0) {
        this.forceSelect(index);
    } else {
        this.forceSelect(0);
    }
};

Window_Command.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_Command.prototype.itemTextAlign = function() {
    return "center";
};

Window_Command.prototype.isOkEnabled = function() {
    return true;
};

Window_Command.prototype.callOkHandler = function() {
    const symbol = this.currentSymbol();
    if (this.isHandled(symbol)) {
        this.callHandler(symbol);
    } else if (this.isHandled("ok")) {
        Window_Selectable.prototype.callOkHandler.call(this);
    } else {
        this.activate();
    }
};

Window_Command.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.refresh.call(this);
};

