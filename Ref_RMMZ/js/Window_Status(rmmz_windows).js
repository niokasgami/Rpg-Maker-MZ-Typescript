
// Window_Status
//
// The window for displaying full status on the status screen.

function Window_Status() {
    this.initialize(...arguments);
}

Window_Status.prototype = Object.create(Window_StatusBase.prototype);
Window_Status.prototype.constructor = Window_Status;

Window_Status.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
    this.refresh();
    this.activate();
};

Window_Status.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_Status.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    if (this._actor) {
        this.drawBlock1();
        this.drawBlock2();
    }
};

Window_Status.prototype.drawBlock1 = function() {
    const y = this.block1Y();
    this.drawActorName(this._actor, 6, y, 168);
    this.drawActorClass(this._actor, 192, y, 168);
    this.drawActorNickname(this._actor, 432, y, 270);
};

Window_Status.prototype.block1Y = function() {
    return 0;
};

Window_Status.prototype.drawBlock2 = function() {
    const y = this.block2Y();
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
};

Window_Status.prototype.block2Y = function() {
    const lineHeight = this.lineHeight();
    const min = lineHeight;
    const max = this.innerHeight - lineHeight * 4;
    return Math.floor((lineHeight * 1.4).clamp(min, max));
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    const lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.placeBasicGauges(this._actor, x, y + lineHeight * 2);
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    const lineHeight = this.lineHeight();
    const expTotal = TextManager.expTotal.format(TextManager.exp);
    const expNext = TextManager.expNext.format(TextManager.level);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(this.expTotalValue(), x, y + lineHeight * 1, 270, "right");
    this.drawText(this.expNextValue(), x, y + lineHeight * 3, 270, "right");
};

Window_Status.prototype.expTotalValue = function() {
    if (this._actor.isMaxLevel()) {
        return "-------";
    } else {
        return this._actor.currentExp();
    }
};

Window_Status.prototype.expNextValue = function() {
    if (this._actor.isMaxLevel()) {
        return "-------";
    } else {
        return this._actor.nextRequiredExp();
    }
};

