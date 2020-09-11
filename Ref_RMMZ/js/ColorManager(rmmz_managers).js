
// ColorManager
//
// The static class that handles the window colors.

function ColorManager() {
    throw new Error("This is a static class");
}

ColorManager.loadWindowskin = function() {
    this._windowskin = ImageManager.loadSystem("Window");
};

ColorManager.textColor = function(n) {
    const px = 96 + (n % 8) * 12 + 6;
    const py = 144 + Math.floor(n / 8) * 12 + 6;
    return this._windowskin.getPixel(px, py);
};

ColorManager.normalColor = function() {
    return this.textColor(0);
};

ColorManager.systemColor = function() {
    return this.textColor(16);
};

ColorManager.crisisColor = function() {
    return this.textColor(17);
};

ColorManager.deathColor = function() {
    return this.textColor(18);
};

ColorManager.gaugeBackColor = function() {
    return this.textColor(19);
};

ColorManager.hpGaugeColor1 = function() {
    return this.textColor(20);
};

ColorManager.hpGaugeColor2 = function() {
    return this.textColor(21);
};

ColorManager.mpGaugeColor1 = function() {
    return this.textColor(22);
};

ColorManager.mpGaugeColor2 = function() {
    return this.textColor(23);
};

ColorManager.mpCostColor = function() {
    return this.textColor(23);
};

ColorManager.powerUpColor = function() {
    return this.textColor(24);
};

ColorManager.powerDownColor = function() {
    return this.textColor(25);
};

ColorManager.ctGaugeColor1 = function() {
    return this.textColor(26);
};

ColorManager.ctGaugeColor2 = function() {
    return this.textColor(27);
};

ColorManager.tpGaugeColor1 = function() {
    return this.textColor(28);
};

ColorManager.tpGaugeColor2 = function() {
    return this.textColor(29);
};

ColorManager.tpCostColor = function() {
    return this.textColor(29);
};

ColorManager.pendingColor = function() {
    return this._windowskin.getPixel(120, 120);
};

ColorManager.hpColor = function(actor) {
    if (!actor) {
        return this.normalColor();
    } else if (actor.isDead()) {
        return this.deathColor();
    } else if (actor.isDying()) {
        return this.crisisColor();
    } else {
        return this.normalColor();
    }
};

ColorManager.mpColor = function(/*actor*/) {
    return this.normalColor();
};

ColorManager.tpColor = function(/*actor*/) {
    return this.normalColor();
};

ColorManager.paramchangeTextColor = function(change) {
    if (change > 0) {
        return this.powerUpColor();
    } else if (change < 0) {
        return this.powerDownColor();
    } else {
        return this.normalColor();
    }
};

ColorManager.damageColor = function(colorType) {
    switch (colorType) {
        case 0: // HP damage
            return "#ffffff";
        case 1: // HP recover
            return "#b9ffb5";
        case 2: // MP damage
            return "#ffff90";
        case 3: // MP recover
            return "#80b0ff";
        default:
            return "#808080";
    }
};

ColorManager.outlineColor = function() {
    return "rgba(0, 0, 0, 0.6)";
};

ColorManager.dimColor1 = function() {
    return "rgba(0, 0, 0, 0.6)";
};

ColorManager.dimColor2 = function() {
    return "rgba(0, 0, 0, 0)";
};

ColorManager.itemBackColor1 = function() {
    return "rgba(32, 32, 32, 0.5)";
};

ColorManager.itemBackColor2 = function() {
    return "rgba(0, 0, 0, 0.5)";
};

