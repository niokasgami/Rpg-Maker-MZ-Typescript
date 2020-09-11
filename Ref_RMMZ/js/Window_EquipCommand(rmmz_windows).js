
// Window_EquipCommand
//
// The window for selecting a command on the equipment screen.

function Window_EquipCommand() {
    this.initialize(...arguments);
}

Window_EquipCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_EquipCommand.prototype.constructor = Window_EquipCommand;

Window_EquipCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_EquipCommand.prototype.maxCols = function() {
    return 3;
};

Window_EquipCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.equip2, "equip");
    this.addCommand(TextManager.optimize, "optimize");
    this.addCommand(TextManager.clear, "clear");
};

