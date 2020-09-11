
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

function Window_BattleStatus() {
    this.initialize(...arguments);
}

Window_BattleStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_BattleStatus.prototype.constructor = Window_BattleStatus;

Window_BattleStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.frameVisible = false;
    this.openness = 0;
    this._bitmapsReady = 0;
    this.preparePartyRefresh();
};

Window_BattleStatus.prototype.extraHeight = function() {
    return 10;
};

Window_BattleStatus.prototype.maxCols = function() {
    return 4;
};

Window_BattleStatus.prototype.itemHeight = function() {
    return this.innerHeight;
};

Window_BattleStatus.prototype.maxItems = function() {
    return $gameParty.battleMembers().length;
};

Window_BattleStatus.prototype.rowSpacing = function() {
    return 0;
};

Window_BattleStatus.prototype.updatePadding = function() {
    this.padding = 8;
};

Window_BattleStatus.prototype.actor = function(index) {
    return $gameParty.battleMembers()[index];
};

Window_BattleStatus.prototype.selectActor = function(actor) {
    const members = $gameParty.battleMembers();
    this.select(members.indexOf(actor));
};

Window_BattleStatus.prototype.update = function() {
    Window_StatusBase.prototype.update.call(this);
    if ($gameTemp.isBattleRefreshRequested()) {
        this.preparePartyRefresh();
    }
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
    $gameTemp.clearBattleRefreshRequest();
    this._bitmapsReady = 0;
    for (const actor of $gameParty.members()) {
        const bitmap = ImageManager.loadFace(actor.faceName());
        bitmap.addLoadListener(this.performPartyRefresh.bind(this));
    }
};

Window_BattleStatus.prototype.performPartyRefresh = function() {
    this._bitmapsReady++;
    if (this._bitmapsReady >= $gameParty.members().length) {
        this.refresh();
    }
};

Window_BattleStatus.prototype.drawItem = function(index) {
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_BattleStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
    this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
};

Window_BattleStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    const nameX = this.nameX(rect);
    const nameY = this.nameY(rect);
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    const basicGaugesX = this.basicGaugesX(rect);
    const basicGaugesY = this.basicGaugesY(rect);
    this.placeTimeGauge(actor, nameX, nameY);
    this.placeActorName(actor, nameX, nameY);
    this.placeStateIcon(actor, stateIconX, stateIconY);
    this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
};

Window_BattleStatus.prototype.faceRect = function(index) {
    const rect = this.itemRect(index);
    rect.pad(-1);
    rect.height = this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
    return rect;
};

Window_BattleStatus.prototype.nameX = function(rect) {
    return rect.x;
};

Window_BattleStatus.prototype.nameY = function(rect) {
    return this.basicGaugesY(rect) - this.gaugeLineHeight();
};

Window_BattleStatus.prototype.stateIconX = function(rect) {
    return rect.x + rect.width - ImageManager.iconWidth / 2 + 4;
};

Window_BattleStatus.prototype.stateIconY = function(rect) {
    return rect.y + ImageManager.iconHeight / 2 + 4;
};

Window_BattleStatus.prototype.basicGaugesX = function(rect) {
    return rect.x;
};

Window_BattleStatus.prototype.basicGaugesY = function(rect) {
    const bottom = rect.y + rect.height - this.extraHeight();
    const numGauges = $dataSystem.optDisplayTp ? 3 : 2;
    return bottom - this.gaugeLineHeight() * numGauges;
};

