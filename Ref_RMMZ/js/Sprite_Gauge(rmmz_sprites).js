
// Sprite_Gauge
//
// The sprite for displaying a status gauge.

function Sprite_Gauge() {
    this.initialize(...arguments);
}

Sprite_Gauge.prototype = Object.create(Sprite.prototype);
Sprite_Gauge.prototype.constructor = Sprite_Gauge;

Sprite_Gauge.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.createBitmap();
};

Sprite_Gauge.prototype.initMembers = function() {
    this._battler = null;
    this._statusType = "";
    this._value = NaN;
    this._maxValue = NaN;
    this._targetValue = NaN;
    this._targetMaxValue = NaN;
    this._duration = 0;
    this._flashingCount = 0;
};

Sprite_Gauge.prototype.destroy = function(options) {
    this.bitmap.destroy();
    Sprite.prototype.destroy.call(this, options);
};

Sprite_Gauge.prototype.createBitmap = function() {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.bitmap = new Bitmap(width, height);
};

Sprite_Gauge.prototype.bitmapWidth = function() {
    return 128;
};

Sprite_Gauge.prototype.bitmapHeight = function() {
    return 24;
};

Sprite_Gauge.prototype.gaugeHeight = function() {
    return 12;
};

Sprite_Gauge.prototype.gaugeX = function() {
    return this._statusType === "time" ? 0 : 30;
};

Sprite_Gauge.prototype.labelY = function() {
    return 3;
};

Sprite_Gauge.prototype.labelFontFace = function() {
    return $gameSystem.mainFontFace();
};

Sprite_Gauge.prototype.labelFontSize = function() {
    return $gameSystem.mainFontSize() - 2;
};

Sprite_Gauge.prototype.valueFontFace = function() {
    return $gameSystem.numberFontFace();
};

Sprite_Gauge.prototype.valueFontSize = function() {
    return $gameSystem.mainFontSize() - 6;
};

Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this._battler = battler;
    this._statusType = statusType;
    this._value = this.currentValue();
    this._maxValue = this.currentMaxValue();
    this.updateBitmap();
};

Sprite_Gauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
};

Sprite_Gauge.prototype.updateBitmap = function() {
    const value = this.currentValue();
    const maxValue = this.currentMaxValue();
    if (value !== this._targetValue || maxValue !== this._targetMaxValue) {
        this.updateTargetValue(value, maxValue);
    }
    this.updateGaugeAnimation();
    this.updateFlashing();
};

Sprite_Gauge.prototype.updateTargetValue = function(value, maxValue) {
    this._targetValue = value;
    this._targetMaxValue = maxValue;
    if (isNaN(this._value)) {
        this._value = value;
        this._maxValue = maxValue;
        this.redraw();
    } else {
        this._duration = this.smoothness();
    }
};

Sprite_Gauge.prototype.smoothness = function() {
    return this._statusType === "time" ? 5 : 20;
};

Sprite_Gauge.prototype.updateGaugeAnimation = function() {
    if (this._duration > 0) {
        const d = this._duration;
        this._value = (this._value * (d - 1) + this._targetValue) / d;
        this._maxValue = (this._maxValue * (d - 1) + this._targetMaxValue) / d;
        this._duration--;
        this.redraw();
    }
};

Sprite_Gauge.prototype.updateFlashing = function() {
    if (this._statusType === "time") {
        this._flashingCount++;
        if (this._battler.isInputting()) {
            if (this._flashingCount % 30 < 15) {
                this.setBlendColor(this.flashingColor1());
            } else {
                this.setBlendColor(this.flashingColor2());
            }
        } else {
            this.setBlendColor([0, 0, 0, 0]);
        }
    }
};

Sprite_Gauge.prototype.flashingColor1 = function() {
    return [255, 255, 255, 64];
};

Sprite_Gauge.prototype.flashingColor2 = function() {
    return [0, 0, 255, 48];
};

Sprite_Gauge.prototype.isValid = function() {
    if (this._battler) {
        if (this._statusType === "tp" && !this._battler.isPreserveTp()) {
            return $gameParty.inBattle();
        } else {
            return true;
        }
    }
    return false;
};

Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler) {
        switch (this._statusType) {
            case "hp":
                return this._battler.hp;
            case "mp":
                return this._battler.mp;
            case "tp":
                return this._battler.tp;
            case "time":
                return this._battler.tpbChargeTime();
        }
    }
    return NaN;
};

Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this._battler) {
        switch (this._statusType) {
            case "hp":
                return this._battler.mhp;
            case "mp":
                return this._battler.mmp;
            case "tp":
                return this._battler.maxTp();
            case "time":
                return 1;
        }
    }
    return NaN;
};

Sprite_Gauge.prototype.label = function() {
    switch (this._statusType) {
        case "hp":
            return TextManager.hpA;
        case "mp":
            return TextManager.mpA;
        case "tp":
            return TextManager.tpA;
        default:
            return "";
    }
};

Sprite_Gauge.prototype.gaugeBackColor = function() {
    return ColorManager.gaugeBackColor();
};

Sprite_Gauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.hpGaugeColor1();
        case "mp":
            return ColorManager.mpGaugeColor1();
        case "tp":
            return ColorManager.tpGaugeColor1();
        case "time":
            return ColorManager.ctGaugeColor1();
        default:
            return ColorManager.normalColor();
    }
};

Sprite_Gauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.hpGaugeColor2();
        case "mp":
            return ColorManager.mpGaugeColor2();
        case "tp":
            return ColorManager.tpGaugeColor2();
        case "time":
            return ColorManager.ctGaugeColor2();
        default:
            return ColorManager.normalColor();
    }
};

Sprite_Gauge.prototype.labelColor = function() {
    return ColorManager.systemColor();
};

Sprite_Gauge.prototype.labelOutlineColor = function() {
    return ColorManager.outlineColor();
};

Sprite_Gauge.prototype.labelOutlineWidth = function() {
    return 3;
};

Sprite_Gauge.prototype.valueColor = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.hpColor(this._battler);
        case "mp":
            return ColorManager.mpColor(this._battler);
        case "tp":
            return ColorManager.tpColor(this._battler);
        default:
            return ColorManager.normalColor();
    }
};

Sprite_Gauge.prototype.valueOutlineColor = function() {
    return "rgba(0, 0, 0, 1)";
};

Sprite_Gauge.prototype.valueOutlineWidth = function() {
    return 2;
};

Sprite_Gauge.prototype.redraw = function() {
    this.bitmap.clear();
    const currentValue = this.currentValue();
    if (!isNaN(currentValue)) {
        this.drawGauge();
        if (this._statusType !== "time") {
            this.drawLabel();
            if (this.isValid()) {
                this.drawValue();
            }
        }
    }
};

Sprite_Gauge.prototype.drawGauge = function() {
    const gaugeX = this.gaugeX();
    const gaugeY = this.bitmapHeight() - this.gaugeHeight();
    const gaugewidth = this.bitmapWidth() - gaugeX;
    const gaugeHeight = this.gaugeHeight();
    this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
};

Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
    const rate = this.gaugeRate();
    const fillW = Math.floor((width - 2) * rate);
    const fillH = height - 2;
    const color0 = this.gaugeBackColor();
    const color1 = this.gaugeColor1();
    const color2 = this.gaugeColor2();
    this.bitmap.fillRect(x, y, width, height, color0);
    this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
};

Sprite_Gauge.prototype.gaugeRate = function() {
    if (this.isValid()) {
        const value = this._value;
        const maxValue = this._maxValue;
        return maxValue > 0 ? value / maxValue : 0;
    } else {
        return 0;
    }
};

Sprite_Gauge.prototype.drawLabel = function() {
    const label = this.label();
    const x = this.labelOutlineWidth() / 2;
    const y = this.labelY();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupLabelFont();
    this.bitmap.paintOpacity = this.labelOpacity();
    this.bitmap.drawText(label, x, y, width, height, "left");
    this.bitmap.paintOpacity = 255;
};

Sprite_Gauge.prototype.setupLabelFont = function() {
    this.bitmap.fontFace = this.labelFontFace();
    this.bitmap.fontSize = this.labelFontSize();
    this.bitmap.textColor = this.labelColor();
    this.bitmap.outlineColor = this.labelOutlineColor();
    this.bitmap.outlineWidth = this.labelOutlineWidth();
};

Sprite_Gauge.prototype.labelOpacity = function() {
    return this.isValid() ? 255 : 160;
};

Sprite_Gauge.prototype.drawValue = function() {
    const currentValue = this.currentValue();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupValueFont();
    this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
};

Sprite_Gauge.prototype.setupValueFont = function() {
    this.bitmap.fontFace = this.valueFontFace();
    this.bitmap.fontSize = this.valueFontSize();
    this.bitmap.textColor = this.valueColor();
    this.bitmap.outlineColor = this.valueOutlineColor();
    this.bitmap.outlineWidth = this.valueOutlineWidth();
};

