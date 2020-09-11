
// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.

function Window_PartyCommand() {
    this.initialize(...arguments);
}

Window_PartyCommand.prototype = Object.create(Window_Command.prototype);
Window_PartyCommand.prototype.constructor = Window_PartyCommand;

Window_PartyCommand.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.deactivate();
};

Window_PartyCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.fight, "fight");
    this.addCommand(TextManager.escape, "escape", BattleManager.canEscape());
};

Window_PartyCommand.prototype.setup = function() {
    this.refresh();
    this.forceSelect(0);
    this.activate();
    this.open();
};

