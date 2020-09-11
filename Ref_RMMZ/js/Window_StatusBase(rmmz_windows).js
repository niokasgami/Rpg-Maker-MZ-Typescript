
// Window_StatusBase
//
// The superclass of windows for displaying actor status.

function Window_StatusBase() {
    this.initialize(...arguments);
}

Window_StatusBase.prototype = Object.create(Window_Selectable.prototype);
Window_StatusBase.prototype.constructor = Window_StatusBase;

Window_StatusBase.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._additionalSprites = {};
    this.loadFaceImages();
};

Window_StatusBase.prototype.loadFaceImages = function() {
    for (const actor of $gameParty.members()) {
        ImageManager.loadFace(actor.faceName());
    }
};

Window_StatusBase.prototype.refresh = function() {
    this.hideAdditionalSprites();
    Window_Selectable.prototype.refresh.call(this);
};

Window_StatusBase.prototype.hideAdditionalSprites = function() {
    for (const sprite of Object.values(this._additionalSprites)) {
        sprite.hide();
    }
};

Window_StatusBase.prototype.placeActorName = function(actor, x, y) {
    const key = "actor%1-name".format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_Name);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
};

Window_StatusBase.prototype.placeStateIcon = function(actor, x, y) {
    const key = "actor%1-stateIcon".format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
};

Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};

Window_StatusBase.prototype.createInnerSprite = function(key, spriteClass) {
    const dict = this._additionalSprites;
    if (dict[key]) {
        return dict[key];
    } else {
        const sprite = new spriteClass();
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
    }
};

Window_StatusBase.prototype.placeTimeGauge = function(actor, x, y) {
    if (BattleManager.isTpb()) {
        this.placeGauge(actor, "time", x, y);
    }
};

Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
    this.placeGauge(actor, "hp", x, y);
    this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());
    if ($dataSystem.optDisplayTp) {
        this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
    }
};

Window_StatusBase.prototype.gaugeLineHeight = function() {
    return 24;
};

Window_StatusBase.prototype.drawActorCharacter = function(actor, x, y) {
    this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
};

// prettier-ignore
Window_StatusBase.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

Window_StatusBase.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawText(actor.name(), x, y, width);
};

Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width);
};

Window_StatusBase.prototype.drawActorNickname = function(actor, x, y, width) {
    width = width || 270;
    this.resetTextColor();
    this.drawText(actor.nickname(), x, y, width);
};

Window_StatusBase.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 84, y, 36, "right");
};

Window_StatusBase.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    const iconWidth = ImageManager.iconWidth;
    const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
    let iconX = x;
    for (const icon of icons) {
        this.drawIcon(icon, iconX, y + 2);
        iconX += iconWidth;
    }
};

Window_StatusBase.prototype.drawActorSimpleStatus = function(actor, x, y) {
    const lineHeight = this.lineHeight();
    const x2 = x + 180;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.placeBasicGauges(actor, x2, y + lineHeight);
};

Window_StatusBase.prototype.actorSlotName = function(actor, index) {
    const slots = actor.equipSlots();
    return $dataSystem.equipTypes[slots[index]];
};

