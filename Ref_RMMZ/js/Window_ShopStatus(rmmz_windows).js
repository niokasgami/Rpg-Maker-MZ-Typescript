
// Window_ShopStatus
//
// The window for displaying number of items in possession and the actor's
// equipment on the shop screen.

function Window_ShopStatus() {
    this.initialize(...arguments);
}

Window_ShopStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_ShopStatus.prototype.constructor = Window_ShopStatus;

Window_ShopStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._item = null;
    this._pageIndex = 0;
    this.refresh();
};

Window_ShopStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._item) {
        const x = this.itemPadding();
        this.drawPossession(x, 0);
        if (this.isEquipItem()) {
            const y = Math.floor(this.lineHeight() * 1.5);
            this.drawEquipInfo(x, y);
        }
    }
};

Window_ShopStatus.prototype.setItem = function(item) {
    this._item = item;
    this.refresh();
};

Window_ShopStatus.prototype.isEquipItem = function() {
    return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
};

Window_ShopStatus.prototype.drawPossession = function(x, y) {
    const width = this.innerWidth - this.itemPadding() - x;
    const possessionWidth = this.textWidth("0000");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.possession, x, y, width - possessionWidth);
    this.resetTextColor();
    this.drawText($gameParty.numItems(this._item), x, y, width, "right");
};

Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
    const members = this.statusMembers();
    for (let i = 0; i < members.length; i++) {
        const actorY = y + Math.floor(this.lineHeight() * i * 2.2);
        this.drawActorEquipInfo(x, actorY, members[i]);
    }
};

Window_ShopStatus.prototype.statusMembers = function() {
    const start = this._pageIndex * this.pageSize();
    const end = start + this.pageSize();
    return $gameParty.members().slice(start, end);
};

Window_ShopStatus.prototype.pageSize = function() {
    return 4;
};

Window_ShopStatus.prototype.maxPages = function() {
    return Math.floor(
        ($gameParty.size() + this.pageSize() - 1) / this.pageSize()
    );
};

Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
    const item1 = this.currentEquippedItem(actor, this._item.etypeId);
    const width = this.innerWidth - x - this.itemPadding();
    const enabled = actor.canEquip(this._item);
    this.changePaintOpacity(enabled);
    this.resetTextColor();
    this.drawText(actor.name(), x, y, width);
    if (enabled) {
        this.drawActorParamChange(x, y, actor, item1);
    }
    this.drawItemName(item1, x, y + this.lineHeight(), width);
    this.changePaintOpacity(true);
};

// prettier-ignore
Window_ShopStatus.prototype.drawActorParamChange = function(
    x, y, actor, item1
) {
    const width = this.innerWidth - this.itemPadding() - x;
    const paramId = this.paramId();
    const change =
        this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
    this.changeTextColor(ColorManager.paramchangeTextColor(change));
    this.drawText((change > 0 ? "+" : "") + change, x, y, width, "right");
};

Window_ShopStatus.prototype.paramId = function() {
    return DataManager.isWeapon(this._item) ? 2 : 3;
};

Window_ShopStatus.prototype.currentEquippedItem = function(actor, etypeId) {
    const list = [];
    const equips = actor.equips();
    const slots = actor.equipSlots();
    for (let i = 0; i < slots.length; i++) {
        if (slots[i] === etypeId) {
            list.push(equips[i]);
        }
    }
    const paramId = this.paramId();
    let worstParam = Number.MAX_VALUE;
    let worstItem = null;
    for (const item of list) {
        if (item && item.params[paramId] < worstParam) {
            worstParam = item.params[paramId];
            worstItem = item;
        }
    }
    return worstItem;
};

Window_ShopStatus.prototype.update = function() {
    Window_StatusBase.prototype.update.call(this);
    this.updatePage();
};

Window_ShopStatus.prototype.updatePage = function() {
    if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
        this.changePage();
    }
};

Window_ShopStatus.prototype.isPageChangeEnabled = function() {
    return this.visible && this.maxPages() >= 2;
};

Window_ShopStatus.prototype.isPageChangeRequested = function() {
    if (Input.isTriggered("shift")) {
        return true;
    }
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        return true;
    }
    return false;
};

Window_ShopStatus.prototype.changePage = function() {
    this._pageIndex = (this._pageIndex + 1) % this.maxPages();
    this.refresh();
    this.playCursorSound();
};

