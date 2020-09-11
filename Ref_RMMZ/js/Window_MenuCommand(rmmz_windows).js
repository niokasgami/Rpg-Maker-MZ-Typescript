
// Window_MenuCommand
//
// The window for selecting a command on the menu screen.

function Window_MenuCommand() {
    this.initialize(...arguments);
}

Window_MenuCommand.prototype = Object.create(Window_Command.prototype);
Window_MenuCommand.prototype.constructor = Window_MenuCommand;

Window_MenuCommand.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.selectLast();
    this._canRepeat = false;
};

Window_MenuCommand._lastCommandSymbol = null;

Window_MenuCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
};

Window_MenuCommand.prototype.addMainCommands = function() {
    const enabled = this.areMainCommandsEnabled();
    if (this.needsCommand("item")) {
        this.addCommand(TextManager.item, "item", enabled);
    }
    if (this.needsCommand("skill")) {
        this.addCommand(TextManager.skill, "skill", enabled);
    }
    if (this.needsCommand("equip")) {
        this.addCommand(TextManager.equip, "equip", enabled);
    }
    if (this.needsCommand("status")) {
        this.addCommand(TextManager.status, "status", enabled);
    }
};

Window_MenuCommand.prototype.addFormationCommand = function() {
    if (this.needsCommand("formation")) {
        const enabled = this.isFormationEnabled();
        this.addCommand(TextManager.formation, "formation", enabled);
    }
};

Window_MenuCommand.prototype.addOriginalCommands = function() {
    //
};

Window_MenuCommand.prototype.addOptionsCommand = function() {
    if (this.needsCommand("options")) {
        const enabled = this.isOptionsEnabled();
        this.addCommand(TextManager.options, "options", enabled);
    }
};

Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand("save")) {
        const enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, "save", enabled);
    }
};

Window_MenuCommand.prototype.addGameEndCommand = function() {
    const enabled = this.isGameEndEnabled();
    this.addCommand(TextManager.gameEnd, "gameEnd", enabled);
};

Window_MenuCommand.prototype.needsCommand = function(name) {
    const table = ["item", "skill", "equip", "status", "formation", "save"];
    const index = table.indexOf(name);
    if (index >= 0) {
        return $dataSystem.menuCommands[index];
    }
    return true;
};

Window_MenuCommand.prototype.areMainCommandsEnabled = function() {
    return $gameParty.exists();
};

Window_MenuCommand.prototype.isFormationEnabled = function() {
    return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
};

Window_MenuCommand.prototype.isOptionsEnabled = function() {
    return true;
};

Window_MenuCommand.prototype.isSaveEnabled = function() {
    return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
};

Window_MenuCommand.prototype.isGameEndEnabled = function() {
    return true;
};

Window_MenuCommand.prototype.processOk = function() {
    Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_MenuCommand.prototype.selectLast = function() {
    this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
};

