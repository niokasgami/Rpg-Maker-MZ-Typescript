
// Window_HorzCommand
//
// The command window for the horizontal selection format.

function Window_HorzCommand() {
    this.initialize(...arguments);
}

Window_HorzCommand.prototype = Object.create(Window_Command.prototype);
Window_HorzCommand.prototype.constructor = Window_HorzCommand;

Window_HorzCommand.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
};

Window_HorzCommand.prototype.maxCols = function() {
    return 4;
};

Window_HorzCommand.prototype.itemTextAlign = function() {
    return "center";
};

