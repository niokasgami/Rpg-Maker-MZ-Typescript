
// Window_ItemCategory
//
// The window for selecting a category of items on the item and shop screens.

function Window_ItemCategory() {
    this.initialize(...arguments);
}

Window_ItemCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_ItemCategory.prototype.constructor = Window_ItemCategory;

Window_ItemCategory.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_ItemCategory.prototype.maxCols = function() {
    return 4;
};

Window_ItemCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_ItemCategory.prototype.makeCommandList = function() {
    if (this.needsCommand("item")) {
        this.addCommand(TextManager.item, "item");
    }
    if (this.needsCommand("weapon")) {
        this.addCommand(TextManager.weapon, "weapon");
    }
    if (this.needsCommand("armor")) {
        this.addCommand(TextManager.armor, "armor");
    }
    if (this.needsCommand("keyItem")) {
        this.addCommand(TextManager.keyItem, "keyItem");
    }
};

Window_ItemCategory.prototype.needsCommand = function(name) {
    const table = ["item", "weapon", "armor", "keyItem"];
    const index = table.indexOf(name);
    if (index >= 0) {
        return $dataSystem.itemCategories[index];
    }
    return true;
};

Window_ItemCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_ItemCategory.prototype.needsSelection = function() {
    return this.maxItems() >= 2;
};

