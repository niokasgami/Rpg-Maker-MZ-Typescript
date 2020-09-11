
// Window_StatusEquip
//
// The window for displaying equipment items on the status screen.

function Window_StatusEquip() {
    this.initialize(...arguments);
}

Window_StatusEquip.prototype = Object.create(Window_StatusBase.prototype);
Window_StatusEquip.prototype.constructor = Window_StatusEquip;

Window_StatusEquip.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
};

Window_StatusEquip.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_StatusEquip.prototype.maxItems = function() {
    return this._actor ? this._actor.equipSlots().length : 0;
};

Window_StatusEquip.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_StatusEquip.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const equips = this._actor.equips();
    const item = equips[index];
    const slotName = this.actorSlotName(this._actor, index);
    const sw = 138;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(slotName, rect.x, rect.y, sw, rect.height);
    this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
};

Window_StatusEquip.prototype.drawItemBackground = function(/*index*/) {
    //
};

