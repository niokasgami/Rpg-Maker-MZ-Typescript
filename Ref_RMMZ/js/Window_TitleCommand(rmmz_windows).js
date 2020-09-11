
// Window_TitleCommand
//
// The window for selecting New Game/Continue on the title screen.

function Window_TitleCommand() {
    this.initialize(...arguments);
}

Window_TitleCommand.prototype = Object.create(Window_Command.prototype);
Window_TitleCommand.prototype.constructor = Window_TitleCommand;

Window_TitleCommand.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.selectLast();
};

Window_TitleCommand._lastCommandSymbol = null;

Window_TitleCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_TitleCommand.prototype.makeCommandList = function() {
    const continueEnabled = this.isContinueEnabled();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(TextManager.continue_, "continue", continueEnabled);
    this.addCommand(TextManager.options, "options");
};

Window_TitleCommand.prototype.isContinueEnabled = function() {
    return DataManager.isAnySavefileExists();
};

Window_TitleCommand.prototype.processOk = function() {
    Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_TitleCommand.prototype.selectLast = function() {
    if (Window_TitleCommand._lastCommandSymbol) {
        this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
    } else if (this.isContinueEnabled()) {
        this.selectSymbol("continue");
    }
};

