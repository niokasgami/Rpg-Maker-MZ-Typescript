
// Window_Gold
//
// The window for displaying the party's gold.

function Window_Gold() {
    this.initialize(...arguments);
}

Window_Gold.prototype = Object.create(Window_Selectable.prototype);
Window_Gold.prototype.constructor = Window_Gold;

Window_Gold.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_Gold.prototype.colSpacing = function() {
    return 0;
};

Window_Gold.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
};

Window_Gold.prototype.value = function() {
    return $gameParty.gold();
};

Window_Gold.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Gold.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

