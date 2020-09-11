
// Window_MenuStatus
//
// The window for displaying party member status on the menu screen.

function Window_MenuStatus() {
    this.initialize(...arguments);
}

Window_MenuStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_MenuStatus.prototype.constructor = Window_MenuStatus;

Window_MenuStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.refresh();
};

Window_MenuStatus.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 4;
};

Window_MenuStatus.prototype.itemHeight = function() {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

Window_MenuStatus.prototype.actor = function(index) {
    return $gameParty.members()[index];
};

Window_MenuStatus.prototype.drawItem = function(index) {
    this.drawPendingItemBackground(index);
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_MenuStatus.prototype.drawPendingItemBackground = function(index) {
    if (index === this._pendingIndex) {
        const rect = this.itemRect(index);
        const color = ColorManager.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    }
};

Window_MenuStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const width = ImageManager.faceWidth;
    const height = rect.height - 2;
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, width, height);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const x = rect.x + 180;
    const y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    this.drawActorSimpleStatus(actor, x, y);
};

Window_MenuStatus.prototype.processOk = function() {
    Window_StatusBase.prototype.processOk.call(this);
    const actor = this.actor(this.index());
    $gameParty.setMenuActor(actor);
};

Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
    if (this._formationMode) {
        const actor = this.actor(this.index());
        return actor && actor.isFormationChangeOk();
    } else {
        return true;
    }
};

Window_MenuStatus.prototype.selectLast = function() {
    this.smoothSelect($gameParty.menuActor().index() || 0);
};

Window_MenuStatus.prototype.formationMode = function() {
    return this._formationMode;
};

Window_MenuStatus.prototype.setFormationMode = function(formationMode) {
    this._formationMode = formationMode;
};

Window_MenuStatus.prototype.pendingIndex = function() {
    return this._pendingIndex;
};

Window_MenuStatus.prototype.setPendingIndex = function(index) {
    const lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};

