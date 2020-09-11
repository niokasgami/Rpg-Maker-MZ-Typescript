
// Window_Message
//
// The window for displaying text messages.

function Window_Message() {
    this.initialize(...arguments);
}

Window_Message.prototype = Object.create(Window_Base.prototype);
Window_Message.prototype.constructor = Window_Message;

Window_Message.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.initMembers();
};

Window_Message.prototype.initMembers = function() {
    this._background = 0;
    this._positionType = 2;
    this._waitCount = 0;
    this._faceBitmap = null;
    this._textState = null;
    this._goldWindow = null;
    this._nameBoxWindow = null;
    this._choiceListWindow = null;
    this._numberInputWindow = null;
    this._eventItemWindow = null;
    this.clearFlags();
};

Window_Message.prototype.setGoldWindow = function(goldWindow) {
    this._goldWindow = goldWindow;
};

Window_Message.prototype.setNameBoxWindow = function(nameBoxWindow) {
    this._nameBoxWindow = nameBoxWindow;
};

Window_Message.prototype.setChoiceListWindow = function(choiceListWindow) {
    this._choiceListWindow = choiceListWindow;
};

Window_Message.prototype.setNumberInputWindow = function(numberInputWindow) {
    this._numberInputWindow = numberInputWindow;
};

Window_Message.prototype.setEventItemWindow = function(eventItemWindow) {
    this._eventItemWindow = eventItemWindow;
};

Window_Message.prototype.clearFlags = function() {
    this._showFast = false;
    this._lineShowFast = false;
    this._pauseSkip = false;
};

Window_Message.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    this.synchronizeNameBox();
    while (!this.isOpening() && !this.isClosing()) {
        if (this.updateWait()) {
            return;
        } else if (this.updateLoading()) {
            return;
        } else if (this.updateInput()) {
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            this.startMessage();
        } else {
            this.startInput();
            return;
        }
    }
};

Window_Message.prototype.checkToNotClose = function() {
    if (this.isOpen() && this.isClosing() && this.doesContinue()) {
        this.open();
    }
};

Window_Message.prototype.synchronizeNameBox = function() {
    this._nameBoxWindow.openness = this.openness;
};

Window_Message.prototype.canStart = function() {
    return $gameMessage.hasText() && !$gameMessage.scrollMode();
};

Window_Message.prototype.startMessage = function() {
    const text = $gameMessage.allText();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this._nameBoxWindow.start();
};

Window_Message.prototype.newLineX = function(textState) {
    const faceExists = $gameMessage.faceName() !== "";
    const faceWidth = ImageManager.faceWidth;
    const spacing = 20;
    const margin = faceExists ? faceWidth + spacing : 4;
    return textState.rtl ? this.innerWidth - margin : margin;
};

Window_Message.prototype.updatePlacement = function() {
    const goldWindow = this._goldWindow;
    this._positionType = $gameMessage.positionType();
    this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
    if (goldWindow) {
        goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - goldWindow.height;
    }
};

Window_Message.prototype.updateBackground = function() {
    this._background = $gameMessage.background();
    this.setBackgroundType(this._background);
};

Window_Message.prototype.terminateMessage = function() {
    this.close();
    this._goldWindow.close();
    $gameMessage.clear();
};

Window_Message.prototype.updateWait = function() {
    if (this._waitCount > 0) {
        this._waitCount--;
        return true;
    } else {
        return false;
    }
};

Window_Message.prototype.updateLoading = function() {
    if (this._faceBitmap) {
        if (this._faceBitmap.isReady()) {
            this.drawMessageFace();
            this._faceBitmap = null;
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

Window_Message.prototype.updateInput = function() {
    if (this.isAnySubWindowActive()) {
        return true;
    }
    if (this.pause) {
        if (this.isTriggered()) {
            Input.update();
            this.pause = false;
            if (!this._textState) {
                this.terminateMessage();
            }
        }
        return true;
    }
    return false;
};

Window_Message.prototype.isAnySubWindowActive = function() {
    return (
        this._choiceListWindow.active ||
        this._numberInputWindow.active ||
        this._eventItemWindow.active
    );
};

Window_Message.prototype.updateMessage = function() {
    const textState = this._textState;
    if (textState) {
        while (!this.isEndOfText(textState)) {
            if (this.needsNewPage(textState)) {
                this.newPage(textState);
            }
            this.updateShowFast();
            this.processCharacter(textState);
            if (this.shouldBreakHere(textState)) {
                break;
            }
        }
        this.flushTextState(textState);
        if (this.isEndOfText(textState) && !this.pause) {
            this.onEndOfText();
        }
        return true;
    } else {
        return false;
    }
};

Window_Message.prototype.shouldBreakHere = function(textState) {
    if (this.canBreakHere(textState)) {
        if (!this._showFast && !this._lineShowFast) {
            return true;
        }
        if (this.pause || this._waitCount > 0) {
            return true;
        }
    }
    return false;
};

Window_Message.prototype.canBreakHere = function(textState) {
    if (!this.isEndOfText(textState)) {
        const c = textState.text[textState.index];
        if (c.charCodeAt(0) >= 0xdc00 && c.charCodeAt(0) <= 0xdfff) {
            // surrogate pair
            return false;
        }
        if (textState.rtl && c.charCodeAt(0) > 0x20) {
            return false;
        }
    }
    return true;
};

Window_Message.prototype.onEndOfText = function() {
    if (!this.startInput()) {
        if (!this._pauseSkip) {
            this.startPause();
        } else {
            this.terminateMessage();
        }
    }
    this._textState = null;
};

Window_Message.prototype.startInput = function() {
    if ($gameMessage.isChoice()) {
        this._choiceListWindow.start();
        return true;
    } else if ($gameMessage.isNumberInput()) {
        this._numberInputWindow.start();
        return true;
    } else if ($gameMessage.isItemChoice()) {
        this._eventItemWindow.start();
        return true;
    } else {
        return false;
    }
};

Window_Message.prototype.isTriggered = function() {
    return (
        Input.isRepeated("ok") ||
        Input.isRepeated("cancel") ||
        TouchInput.isRepeated()
    );
};

Window_Message.prototype.doesContinue = function() {
    return (
        $gameMessage.hasText() &&
        !$gameMessage.scrollMode() &&
        !this.areSettingsChanged()
    );
};

Window_Message.prototype.areSettingsChanged = function() {
    return (
        this._background !== $gameMessage.background() ||
        this._positionType !== $gameMessage.positionType()
    );
};

Window_Message.prototype.updateShowFast = function() {
    if (this.isTriggered()) {
        this._showFast = true;
    }
};

Window_Message.prototype.newPage = function(textState) {
    this.contents.clear();
    this.resetFontSettings();
    this.clearFlags();
    this.updateSpeakerName();
    this.loadMessageFace();
    textState.x = textState.startX;
    textState.y = 0;
    textState.height = this.calcTextHeight(textState);
};

Window_Message.prototype.updateSpeakerName = function() {
    this._nameBoxWindow.setName($gameMessage.speakerName());
};

Window_Message.prototype.loadMessageFace = function() {
    this._faceBitmap = ImageManager.loadFace($gameMessage.faceName());
};

Window_Message.prototype.drawMessageFace = function() {
    const faceName = $gameMessage.faceName();
    const faceIndex = $gameMessage.faceIndex();
    const rtl = $gameMessage.isRTL();
    const width = ImageManager.faceWidth;
    const height = this.innerHeight;
    const x = rtl ? this.innerWidth - width - 4 : 4;
    this.drawFace(faceName, faceIndex, x, 0, width, height);
};

Window_Message.prototype.processControlCharacter = function(textState, c) {
    Window_Base.prototype.processControlCharacter.call(this, textState, c);
    if (c === "\f") {
        this.processNewPage(textState);
    }
};

Window_Message.prototype.processNewLine = function(textState) {
    this._lineShowFast = false;
    Window_Base.prototype.processNewLine.call(this, textState);
    if (this.needsNewPage(textState)) {
        this.startPause();
    }
};

Window_Message.prototype.processNewPage = function(textState) {
    if (textState.text[textState.index] === "\n") {
        textState.index++;
    }
    textState.y = this.contents.height;
    this.startPause();
};

Window_Message.prototype.isEndOfText = function(textState) {
    return textState.index >= textState.text.length;
};

Window_Message.prototype.needsNewPage = function(textState) {
    return (
        !this.isEndOfText(textState) &&
        textState.y + textState.height > this.contents.height
    );
};

Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
        case "$":
            this._goldWindow.open();
            break;
        case ".":
            this.startWait(15);
            break;
        case "|":
            this.startWait(60);
            break;
        case "!":
            this.startPause();
            break;
        case ">":
            this._lineShowFast = true;
            break;
        case "<":
            this._lineShowFast = false;
            break;
        case "^":
            this._pauseSkip = true;
            break;
        default:
            Window_Base.prototype.processEscapeCharacter.call(
                this,
                code,
                textState
            );
            break;
    }
};

Window_Message.prototype.startWait = function(count) {
    this._waitCount = count;
};

Window_Message.prototype.startPause = function() {
    this.startWait(10);
    this.pause = true;
};

