
// Window_Base
//
// The superclass of all windows within the game.

function Window_Base() {
    this.initialize(...arguments);
}

Window_Base.prototype = Object.create(Window.prototype);
Window_Base.prototype.constructor = Window_Base;

Window_Base.prototype.initialize = function(rect) {
    Window.prototype.initialize.call(this);
    this.loadWindowskin();
    this.checkRectObject(rect);
    this.move(rect.x, rect.y, rect.width, rect.height);
    this.updatePadding();
    this.updateBackOpacity();
    this.updateTone();
    this.createContents();
    this._opening = false;
    this._closing = false;
    this._dimmerSprite = null;
};

Window_Base.prototype.destroy = function(options) {
    this.destroyContents();
    if (this._dimmerSprite) {
        this._dimmerSprite.bitmap.destroy();
    }
    Window.prototype.destroy.call(this, options);
};

Window_Base.prototype.checkRectObject = function(rect) {
    if (typeof rect !== "object" || !("x" in rect)) {
        // Probably MV plugin is used
        throw new Error("Argument must be a Rectangle");
    }
};

Window_Base.prototype.lineHeight = function() {
    return 36;
};

Window_Base.prototype.itemWidth = function() {
    return this.innerWidth;
};

Window_Base.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_Base.prototype.itemPadding = function() {
    return 8;
};

Window_Base.prototype.baseTextRect = function() {
    const rect = new Rectangle(0, 0, this.innerWidth, this.innerHeight);
    rect.pad(-this.itemPadding(), 0);
    return rect;
};

Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem("Window");
};

Window_Base.prototype.updatePadding = function() {
    this.padding = $gameSystem.windowPadding();
};

Window_Base.prototype.updateBackOpacity = function() {
    this.backOpacity = 192;
};

Window_Base.prototype.fittingHeight = function(numLines) {
    return numLines * this.itemHeight() + $gameSystem.windowPadding() * 2;
};

Window_Base.prototype.updateTone = function() {
    const tone = $gameSystem.windowTone();
    this.setTone(tone[0], tone[1], tone[2]);
};

Window_Base.prototype.createContents = function() {
    const width = this.contentsWidth();
    const height = this.contentsHeight();
    this.destroyContents();
    this.contents = new Bitmap(width, height);
    this.contentsBack = new Bitmap(width, height);
    this.resetFontSettings();
};

Window_Base.prototype.destroyContents = function() {
    if (this.contents) {
        this.contents.destroy();
    }
    if (this.contentsBack) {
        this.contentsBack.destroy();
    }
};

Window_Base.prototype.contentsWidth = function() {
    return this.innerWidth;
};

Window_Base.prototype.contentsHeight = function() {
    return this.innerHeight;
};

Window_Base.prototype.resetFontSettings = function() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
};

Window_Base.prototype.resetTextColor = function() {
    this.changeTextColor(ColorManager.normalColor());
    this.changeOutlineColor(ColorManager.outlineColor());
};

Window_Base.prototype.update = function() {
    Window.prototype.update.call(this);
    this.updateTone();
    this.updateOpen();
    this.updateClose();
    this.updateBackgroundDimmer();
};

Window_Base.prototype.updateOpen = function() {
    if (this._opening) {
        this.openness += 32;
        if (this.isOpen()) {
            this._opening = false;
        }
    }
};

Window_Base.prototype.updateClose = function() {
    if (this._closing) {
        this.openness -= 32;
        if (this.isClosed()) {
            this._closing = false;
        }
    }
};

Window_Base.prototype.open = function() {
    if (!this.isOpen()) {
        this._opening = true;
    }
    this._closing = false;
};

Window_Base.prototype.close = function() {
    if (!this.isClosed()) {
        this._closing = true;
    }
    this._opening = false;
};

Window_Base.prototype.isOpening = function() {
    return this._opening;
};

Window_Base.prototype.isClosing = function() {
    return this._closing;
};

Window_Base.prototype.show = function() {
    this.visible = true;
};

Window_Base.prototype.hide = function() {
    this.visible = false;
};

Window_Base.prototype.activate = function() {
    this.active = true;
};

Window_Base.prototype.deactivate = function() {
    this.active = false;
};

Window_Base.prototype.systemColor = function() {
    return ColorManager.systemColor();
};

Window_Base.prototype.translucentOpacity = function() {
    return 160;
};

Window_Base.prototype.changeTextColor = function(color) {
    this.contents.textColor = color;
};

Window_Base.prototype.changeOutlineColor = function(color) {
    this.contents.outlineColor = color;
};

Window_Base.prototype.changePaintOpacity = function(enabled) {
    this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();
};

Window_Base.prototype.drawRect = function(x, y, width, height) {
    const outlineColor = this.contents.outlineColor;
    const mainColor = this.contents.textColor;
    this.contents.fillRect(x, y, width, height, outlineColor);
    this.contents.fillRect(x + 1, y + 1, width - 2, height - 2, mainColor);
};

Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};

Window_Base.prototype.textWidth = function(text) {
    return this.contents.measureTextWidth(text);
};

Window_Base.prototype.drawTextEx = function(text, x, y, width) {
    this.resetFontSettings();
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

Window_Base.prototype.textSizeEx = function(text) {
    this.resetFontSettings();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return { width: textState.outputWidth, height: textState.outputHeight };
};

Window_Base.prototype.createTextState = function(text, x, y, width) {
    const rtl = Utils.containsArabic(text);
    const textState = {};
    textState.text = this.convertEscapeCharacters(text);
    textState.index = 0;
    textState.x = rtl ? x + width : x;
    textState.y = y;
    textState.width = width;
    textState.height = this.calcTextHeight(textState);
    textState.startX = textState.x;
    textState.startY = textState.y;
    textState.rtl = rtl;
    textState.buffer = this.createTextBuffer(rtl);
    textState.drawing = true;
    textState.outputWidth = 0;
    textState.outputHeight = 0;
    return textState;
};

Window_Base.prototype.processAllText = function(textState) {
    while (textState.index < textState.text.length) {
        this.processCharacter(textState);
    }
    this.flushTextState(textState);
};

Window_Base.prototype.flushTextState = function(textState) {
    const text = textState.buffer;
    const rtl = textState.rtl;
    const width = this.textWidth(text);
    const height = textState.height;
    const x = rtl ? textState.x - width : textState.x;
    const y = textState.y;
    if (textState.drawing) {
        this.contents.drawText(text, x, y, width, height);
    }
    textState.x += rtl ? -width : width;
    textState.buffer = this.createTextBuffer(rtl);
    const outputWidth = Math.abs(textState.x - textState.startX);
    if (textState.outputWidth < outputWidth) {
        textState.outputWidth = outputWidth;
    }
    textState.outputHeight = y - textState.startY + height;
};

Window_Base.prototype.createTextBuffer = function(rtl) {
    // U+202B: RIGHT-TO-LEFT EMBEDDING
    return rtl ? "\u202B" : "";
};

Window_Base.prototype.convertEscapeCharacters = function(text) {
    /* eslint no-control-regex: 0 */
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bN\[(\d+)\]/gi, (_, p1) =>
        this.actorName(parseInt(p1))
    );
    text = text.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
        this.partyMemberName(parseInt(p1))
    );
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

Window_Base.prototype.actorName = function(n) {
    const actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : "";
};

Window_Base.prototype.partyMemberName = function(n) {
    const actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : "";
};

Window_Base.prototype.processCharacter = function(textState) {
    const c = textState.text[textState.index++];
    if (c.charCodeAt(0) < 0x20) {
        this.flushTextState(textState);
        this.processControlCharacter(textState, c);
    } else {
        textState.buffer += c;
    }
};

Window_Base.prototype.processControlCharacter = function(textState, c) {
    if (c === "\n") {
        this.processNewLine(textState);
    }
    if (c === "\x1b") {
        const code = this.obtainEscapeCode(textState);
        this.processEscapeCharacter(code, textState);
    }
};

Window_Base.prototype.processNewLine = function(textState) {
    textState.x = textState.startX;
    textState.y += textState.height;
    textState.height = this.calcTextHeight(textState);
};

Window_Base.prototype.obtainEscapeCode = function(textState) {
    const regExp = /^[$.|^!><{}\\]|^[A-Z]+/i;
    const arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return "";
    }
};

Window_Base.prototype.obtainEscapeParam = function(textState) {
    const regExp = /^\[\d+\]/;
    const arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return parseInt(arr[0].slice(1));
    } else {
        return "";
    }
};

Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
        case "C":
            this.processColorChange(this.obtainEscapeParam(textState));
            break;
        case "I":
            this.processDrawIcon(this.obtainEscapeParam(textState), textState);
            break;
        case "PX":
            textState.x = this.obtainEscapeParam(textState);
            break;
        case "PY":
            textState.y = this.obtainEscapeParam(textState);
            break;
        case "FS":
            this.contents.fontSize = this.obtainEscapeParam(textState);
            break;
        case "{":
            this.makeFontBigger();
            break;
        case "}":
            this.makeFontSmaller();
            break;
    }
};

Window_Base.prototype.processColorChange = function(colorIndex) {
    this.changeTextColor(ColorManager.textColor(colorIndex));
};

Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
    if (textState.drawing) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    }
    textState.x += ImageManager.iconWidth + 4;
};

Window_Base.prototype.makeFontBigger = function() {
    if (this.contents.fontSize <= 96) {
        this.contents.fontSize += 12;
    }
};

Window_Base.prototype.makeFontSmaller = function() {
    if (this.contents.fontSize >= 24) {
        this.contents.fontSize -= 12;
    }
};

Window_Base.prototype.calcTextHeight = function(textState) {
    const lineSpacing = this.lineHeight() - $gameSystem.mainFontSize();
    const lastFontSize = this.contents.fontSize;
    const lines = textState.text.slice(textState.index).split("\n");
    const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
    this.contents.fontSize = lastFontSize;
    return textHeight;
};

Window_Base.prototype.maxFontSizeInLine = function(line) {
    let maxFontSize = this.contents.fontSize;
    const regExp = /\x1b({|}|FS)(\[(\d+)])?/gi;
    for (;;) {
        const array = regExp.exec(line);
        if (!array) {
            break;
        }
        const code = String(array[1]).toUpperCase();
        if (code === "{") {
            this.makeFontBigger();
        } else if (code === "}") {
            this.makeFontSmaller();
        } else if (code === "FS") {
            this.contents.fontSize = parseInt(array[3]);
        }
        if (this.contents.fontSize > maxFontSize) {
            maxFontSize = this.contents.fontSize;
        }
    }
    return maxFontSize;
};

Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

// prettier-ignore
Window_Base.prototype.drawFace = function(
    faceName, faceIndex, x, y, width, height
) {
    width = width || ImageManager.faceWidth;
    height = height || ImageManager.faceHeight;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
    const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

// prettier-ignore
Window_Base.prototype.drawCharacter = function(
    characterName, characterIndex, x, y
) {
    const bitmap = ImageManager.loadCharacter(characterName);
    const big = ImageManager.isBigCharacter(characterName);
    const pw = bitmap.width / (big ? 3 : 12);
    const ph = bitmap.height / (big ? 4 : 8);
    const n = big ? 0: characterIndex;
    const sx = ((n % 4) * 3 + 1) * pw;
    const sy = Math.floor(n / 4) * 4 * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if (item) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x, iconY);
        this.drawText(item.name, x + textMargin, y, itemWidth);
    }
};

Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    const unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, "right");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
};

Window_Base.prototype.setBackgroundType = function(type) {
    if (type === 0) {
        this.opacity = 255;
    } else {
        this.opacity = 0;
    }
    if (type === 1) {
        this.showBackgroundDimmer();
    } else {
        this.hideBackgroundDimmer();
    }
};

Window_Base.prototype.showBackgroundDimmer = function() {
    if (!this._dimmerSprite) {
        this.createDimmerSprite();
    }
    const bitmap = this._dimmerSprite.bitmap;
    if (bitmap.width !== this.width || bitmap.height !== this.height) {
        this.refreshDimmerBitmap();
    }
    this._dimmerSprite.visible = true;
    this.updateBackgroundDimmer();
};

Window_Base.prototype.createDimmerSprite = function() {
    this._dimmerSprite = new Sprite();
    this._dimmerSprite.bitmap = new Bitmap(0, 0);
    this._dimmerSprite.x = -4;
    this.addChildToBack(this._dimmerSprite);
};

Window_Base.prototype.hideBackgroundDimmer = function() {
    if (this._dimmerSprite) {
        this._dimmerSprite.visible = false;
    }
};

Window_Base.prototype.updateBackgroundDimmer = function() {
    if (this._dimmerSprite) {
        this._dimmerSprite.opacity = this.openness;
    }
};

Window_Base.prototype.refreshDimmerBitmap = function() {
    if (this._dimmerSprite) {
        const bitmap = this._dimmerSprite.bitmap;
        const w = this.width > 0 ? this.width + 8 : 0;
        const h = this.height;
        const m = this.padding;
        const c1 = ColorManager.dimColor1();
        const c2 = ColorManager.dimColor2();
        bitmap.resize(w, h);
        bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
        bitmap.fillRect(0, m, w, h - m * 2, c1);
        bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
        this._dimmerSprite.setFrame(0, 0, w, h);
    }
};

Window_Base.prototype.playCursorSound = function() {
    SoundManager.playCursor();
};

Window_Base.prototype.playOkSound = function() {
    SoundManager.playOk();
};

Window_Base.prototype.playBuzzerSound = function() {
    SoundManager.playBuzzer();
};

