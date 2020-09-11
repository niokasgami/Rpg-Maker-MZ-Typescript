
// Window_EquipSlot
//
// The window for selecting an equipment slot on the equipment screen.

function Window_EquipSlot() {
    this.initialize(...arguments);
}

Window_EquipSlot.prototype = Object.create(Window_StatusBase.prototype);
Window_EquipSlot.prototype.constructor = Window_EquipSlot;

Window_EquipSlot.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
    this.refresh();
};

Window_EquipSlot.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EquipSlot.prototype.update = function() {
    Window_StatusBase.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setSlotId(this.index());
    }
};

Window_EquipSlot.prototype.maxItems = function() {
    return this._actor ? this._actor.equipSlots().length : 0;
};

Window_EquipSlot.prototype.item = function() {
    return this.itemAt(this.index());
};

Window_EquipSlot.prototype.itemAt = function(index) {
    return this._actor ? this._actor.equips()[index] : null;
};

Window_EquipSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        const slotName = this.actorSlotName(this._actor, index);
        const item = this.itemAt(index);
        const slotNameWidth = this.slotNameWidth();
        const rect = this.itemLineRect(index);
        const itemWidth = rect.width - slotNameWidth;
        this.changeTextColor(ColorManager.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
        this.drawItemName(item, rect.x + slotNameWidth, rect.y, itemWidth);
        this.changePaintOpacity(true);
    }
};

Window_EquipSlot.prototype.slotNameWidth = function() {
    return 138;
};

Window_EquipSlot.prototype.isEnabled = function(index) {
    return this._actor ? this._actor.isEquipChangeOk(index) : false;
};

Window_EquipSlot.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
};

Window_EquipSlot.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_EquipSlot.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_EquipSlot.prototype.updateHelp = function() {
    Window_StatusBase.prototype.updateHelp.call(this);
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setTempActor(null);
    }
};

