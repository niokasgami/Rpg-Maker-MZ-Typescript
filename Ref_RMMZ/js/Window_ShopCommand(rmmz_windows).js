
// Window_ShopCommand
//
// The window for selecting buy/sell on the shop screen.

function Window_ShopCommand() {
    this.initialize(...arguments);
}

Window_ShopCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_ShopCommand.prototype.constructor = Window_ShopCommand;

Window_ShopCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_ShopCommand.prototype.setPurchaseOnly = function(purchaseOnly) {
    this._purchaseOnly = purchaseOnly;
    this.refresh();
};

Window_ShopCommand.prototype.maxCols = function() {
    return 3;
};

Window_ShopCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.buy, "buy");
    this.addCommand(TextManager.sell, "sell", !this._purchaseOnly);
    this.addCommand(TextManager.cancel, "cancel");
};

