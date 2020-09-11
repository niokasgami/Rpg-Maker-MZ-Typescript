
// Window_EquipStatus
//
// The window for displaying parameter changes on the equipment screen.

function Window_EquipStatus() {
    this.initialize(...arguments);
}

Window_EquipStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_EquipStatus.prototype.constructor = Window_EquipStatus;

Window_EquipStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};

Window_EquipStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EquipStatus.prototype.colSpacing = function() {
    return 0;
};

Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        const nameRect = this.itemLineRect(0);
        this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
        this.drawActorFace(this._actor, nameRect.x, nameRect.height);
        this.drawAllParams();
    }
};

Window_EquipStatus.prototype.setTempActor = function(tempActor) {
    if (this._tempActor !== tempActor) {
        this._tempActor = tempActor;
        this.refresh();
    }
};

Window_EquipStatus.prototype.drawAllParams = function() {
    for (let i = 0; i < 6; i++) {
        const x = this.itemPadding();
        const y = this.paramY(i);
        this.drawItem(x, y, 2 + i);
    }
};

Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    const paramX = this.paramX();
    const paramWidth = this.paramWidth();
    const rightArrowWidth = this.rightArrowWidth();
    this.drawParamName(x, y, paramId);
    if (this._actor) {
        this.drawCurrentParam(paramX, y, paramId);
    }
    this.drawRightArrow(paramX + paramWidth, y);
    if (this._tempActor) {
        this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId);
    }
};

Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    const width = this.paramX() - this.itemPadding() * 2;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.param(paramId), x, y, width);
};

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    const paramWidth = this.paramWidth();
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x, y, paramWidth, "right");
};

Window_EquipStatus.prototype.drawRightArrow = function(x, y) {
    const rightArrowWidth = this.rightArrowWidth();
    this.changeTextColor(ColorManager.systemColor());
    this.drawText("\u2192", x, y, rightArrowWidth, "center");
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    const paramWidth = this.paramWidth();
    const newValue = this._tempActor.param(paramId);
    const diffvalue = newValue - this._actor.param(paramId);
    this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
    this.drawText(newValue, x, y, paramWidth, "right");
};

Window_EquipStatus.prototype.rightArrowWidth = function() {
    return 32;
};

Window_EquipStatus.prototype.paramWidth = function() {
    return 48;
};

Window_EquipStatus.prototype.paramX = function() {
    const itemPadding = this.itemPadding();
    const rightArrowWidth = this.rightArrowWidth();
    const paramWidth = this.paramWidth();
    return this.innerWidth - itemPadding - paramWidth * 2 - rightArrowWidth;
};

Window_EquipStatus.prototype.paramY = function(index) {
    const faceHeight = ImageManager.faceHeight;
    return faceHeight + Math.floor(this.lineHeight() * (index + 1.5));
};

