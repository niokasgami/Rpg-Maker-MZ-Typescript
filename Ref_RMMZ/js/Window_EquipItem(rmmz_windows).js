
// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.

function Window_EquipItem() {
    this.initialize(...arguments);
}

Window_EquipItem.prototype = Object.create(Window_ItemList.prototype);
Window_EquipItem.prototype.constructor = Window_EquipItem;

Window_EquipItem.prototype.initialize = function(rect) {
    Window_ItemList.prototype.initialize.call(this, rect);
    this._actor = null;
    this._slotId = 0;
};

Window_EquipItem.prototype.maxCols = function() {
    return 1;
};

Window_EquipItem.prototype.colSpacing = function() {
    return 8;
};

Window_EquipItem.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.scrollTo(0, 0);
    }
};

Window_EquipItem.prototype.setSlotId = function(slotId) {
    if (this._slotId !== slotId) {
        this._slotId = slotId;
        this.refresh();
        this.scrollTo(0, 0);
    }
};

Window_EquipItem.prototype.includes = function(item) {
    if (item === null) {
        return true;
    }
    return (
        this._actor &&
        this._actor.canEquip(item) &&
        item.etypeId === this.etypeId()
    );
};

Window_EquipItem.prototype.etypeId = function() {
    if (this._actor && this._slotId >= 0) {
        return this._actor.equipSlots()[this._slotId];
    } else {
        return 0;
    }
};

Window_EquipItem.prototype.isEnabled = function(/*item*/) {
    return true;
};

Window_EquipItem.prototype.selectLast = function() {
    //
};

Window_EquipItem.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_EquipItem.prototype.updateHelp = function() {
    Window_ItemList.prototype.updateHelp.call(this);
    if (this._actor && this._statusWindow && this._slotId >= 0) {
        const actor = JsonEx.makeDeepCopy(this._actor);
        actor.forceChangeEquip(this._slotId, this.item());
        this._statusWindow.setTempActor(actor);
    }
};

Window_EquipItem.prototype.playOkSound = function() {
    //
};

