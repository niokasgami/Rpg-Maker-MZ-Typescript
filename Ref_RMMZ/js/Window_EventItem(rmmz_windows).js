
// Window_EventItem
//
// The window used for the event command [Select Item].

function Window_EventItem() {
    this.initialize(...arguments);
}

Window_EventItem.prototype = Object.create(Window_ItemList.prototype);
Window_EventItem.prototype.constructor = Window_EventItem;

Window_EventItem.prototype.initialize = function(rect) {
    Window_ItemList.prototype.initialize.call(this, rect);
    this.createCancelButton();
    this.openness = 0;
    this.deactivate();
    this.setHandler("ok", this.onOk.bind(this));
    this.setHandler("cancel", this.onCancel.bind(this));
};

Window_EventItem.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
};

Window_EventItem.prototype.createCancelButton = function() {
    if (ConfigManager.touchUI) {
        this._cancelButton = new Sprite_Button("cancel");
        this._cancelButton.visible = false;
        this.addChild(this._cancelButton);
    }
};

Window_EventItem.prototype.start = function() {
    this.refresh();
    this.updatePlacement();
    this.placeCancelButton();
    this.forceSelect(0);
    this.open();
    this.activate();
};

Window_EventItem.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updateCancelButton();
};

Window_EventItem.prototype.updateCancelButton = function() {
    if (this._cancelButton) {
        this._cancelButton.visible = this.isOpen();
    }
};

Window_EventItem.prototype.updatePlacement = function() {
    if (this._messageWindow.y >= Graphics.boxHeight / 2) {
        this.y = 0;
    } else {
        this.y = Graphics.boxHeight - this.height;
    }
};

Window_EventItem.prototype.placeCancelButton = function() {
    if (this._cancelButton) {
        const spacing = 8;
        const button = this._cancelButton;
        if (this.y === 0) {
            button.y = this.height + spacing;
        } else if (this._messageWindow.y >= Graphics.boxHeight / 4) {
            const distance = this.y - this._messageWindow.y;
            button.y = -button.height - spacing - distance;
        } else {
            button.y = -button.height - spacing;
        }
        button.x = this.width - button.width - spacing;
    }
};

Window_EventItem.prototype.includes = function(item) {
    const itypeId = $gameMessage.itemChoiceItypeId();
    return DataManager.isItem(item) && item.itypeId === itypeId;
};

Window_EventItem.prototype.needsNumber = function() {
    const itypeId = $gameMessage.itemChoiceItypeId();
    if (itypeId === 2) {
        // Key Item
        return $dataSystem.optKeyItemsNumber;
    } else if (itypeId >= 3) {
        // Hidden Item
        return false;
    } else {
        // Normal Item
        return true;
    }
};

Window_EventItem.prototype.isEnabled = function(/*item*/) {
    return true;
};

Window_EventItem.prototype.onOk = function() {
    const item = this.item();
    const itemId = item ? item.id : 0;
    $gameVariables.setValue($gameMessage.itemChoiceVariableId(), itemId);
    this._messageWindow.terminateMessage();
    this.close();
};

Window_EventItem.prototype.onCancel = function() {
    $gameVariables.setValue($gameMessage.itemChoiceVariableId(), 0);
    this._messageWindow.terminateMessage();
    this.close();
};

