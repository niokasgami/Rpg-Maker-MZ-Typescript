
// Window_Selectable
//
// The window class with cursor movement functions.

function Window_Selectable() {
    this.initialize(...arguments);
}

Window_Selectable.prototype = Object.create(Window_Scrollable.prototype);
Window_Selectable.prototype.constructor = Window_Selectable;

Window_Selectable.prototype.initialize = function(rect) {
    Window_Scrollable.prototype.initialize.call(this, rect);
    this._index = -1;
    this._cursorFixed = false;
    this._cursorAll = false;
    this._helpWindow = null;
    this._handlers = {};
    this._doubleTouch = false;
    this._canRepeat = true;
    this.deactivate();
};

Window_Selectable.prototype.index = function() {
    return this._index;
};

Window_Selectable.prototype.cursorFixed = function() {
    return this._cursorFixed;
};

Window_Selectable.prototype.setCursorFixed = function(cursorFixed) {
    this._cursorFixed = cursorFixed;
};

Window_Selectable.prototype.cursorAll = function() {
    return this._cursorAll;
};

Window_Selectable.prototype.setCursorAll = function(cursorAll) {
    this._cursorAll = cursorAll;
};

Window_Selectable.prototype.maxCols = function() {
    return 1;
};

Window_Selectable.prototype.maxItems = function() {
    return 0;
};

Window_Selectable.prototype.colSpacing = function() {
    return 8;
};

Window_Selectable.prototype.rowSpacing = function() {
    return 4;
};

Window_Selectable.prototype.itemWidth = function() {
    return Math.floor(this.innerWidth / this.maxCols());
};

Window_Selectable.prototype.itemHeight = function() {
    return Window_Scrollable.prototype.itemHeight.call(this) + 8;
};

Window_Selectable.prototype.contentsHeight = function() {
    return this.innerHeight + this.itemHeight();
};

Window_Selectable.prototype.maxRows = function() {
    return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
};

Window_Selectable.prototype.overallHeight = function() {
    return this.maxRows() * this.itemHeight();
};

Window_Selectable.prototype.activate = function() {
    Window_Scrollable.prototype.activate.call(this);
    this.reselect();
};

Window_Selectable.prototype.deactivate = function() {
    Window_Scrollable.prototype.deactivate.call(this);
    this.reselect();
};

Window_Selectable.prototype.select = function(index) {
    this._index = index;
    this.refreshCursor();
    this.callUpdateHelp();
};

Window_Selectable.prototype.forceSelect = function(index) {
    this.select(index);
    this.ensureCursorVisible(false);
};

Window_Selectable.prototype.smoothSelect = function(index) {
    this.select(index);
    this.ensureCursorVisible(true);
};

Window_Selectable.prototype.deselect = function() {
    this.select(-1);
};

Window_Selectable.prototype.reselect = function() {
    this.select(this._index);
    this.ensureCursorVisible(true);
    this.cursorVisible = true;
};

Window_Selectable.prototype.row = function() {
    return Math.floor(this.index() / this.maxCols());
};

Window_Selectable.prototype.topRow = function() {
    return Math.floor(this.scrollY() / this.itemHeight());
};

Window_Selectable.prototype.maxTopRow = function() {
    return Math.max(0, this.maxRows() - this.maxPageRows());
};

Window_Selectable.prototype.setTopRow = function(row) {
    this.scrollTo(this.scrollX(), row * this.itemHeight());
};

Window_Selectable.prototype.maxPageRows = function() {
    return Math.floor(this.innerHeight / this.itemHeight());
};

Window_Selectable.prototype.maxPageItems = function() {
    return this.maxPageRows() * this.maxCols();
};

Window_Selectable.prototype.maxVisibleItems = function() {
    const visibleRows = Math.ceil(this.contentsHeight() / this.itemHeight());
    return visibleRows * this.maxCols();
};

Window_Selectable.prototype.isHorizontal = function() {
    return this.maxPageRows() === 1;
};

Window_Selectable.prototype.topIndex = function() {
    return this.topRow() * this.maxCols();
};

Window_Selectable.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

Window_Selectable.prototype.itemRectWithPadding = function(index) {
    const rect = this.itemRect(index);
    const padding = this.itemPadding();
    rect.x += padding;
    rect.width -= padding * 2;
    return rect;
};

Window_Selectable.prototype.itemLineRect = function(index) {
    const rect = this.itemRectWithPadding(index);
    const padding = (rect.height - this.lineHeight()) / 2;
    rect.y += padding;
    rect.height -= padding * 2;
    return rect;
};

Window_Selectable.prototype.setHelpWindow = function(helpWindow) {
    this._helpWindow = helpWindow;
    this.callUpdateHelp();
};

Window_Selectable.prototype.showHelpWindow = function() {
    if (this._helpWindow) {
        this._helpWindow.show();
    }
};

Window_Selectable.prototype.hideHelpWindow = function() {
    if (this._helpWindow) {
        this._helpWindow.hide();
    }
};

Window_Selectable.prototype.setHandler = function(symbol, method) {
    this._handlers[symbol] = method;
};

Window_Selectable.prototype.isHandled = function(symbol) {
    return !!this._handlers[symbol];
};

Window_Selectable.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol]();
    }
};

Window_Selectable.prototype.isOpenAndActive = function() {
    return this.isOpen() && this.visible && this.active;
};

Window_Selectable.prototype.isCursorMovable = function() {
    return (
        this.isOpenAndActive() &&
        !this._cursorFixed &&
        !this._cursorAll &&
        this.maxItems() > 0
    );
};

Window_Selectable.prototype.cursorDown = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.smoothSelect((index + maxCols) % maxItems);
    }
};

Window_Selectable.prototype.cursorUp = function(wrap) {
    const index = Math.max(0, this.index());
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    if (index >= maxCols || (wrap && maxCols === 1)) {
        this.smoothSelect((index - maxCols + maxItems) % maxItems);
    }
};

Window_Selectable.prototype.cursorRight = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    const horizontal = this.isHorizontal();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && horizontal))) {
        this.smoothSelect((index + 1) % maxItems);
    }
};

Window_Selectable.prototype.cursorLeft = function(wrap) {
    const index = Math.max(0, this.index());
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    const horizontal = this.isHorizontal();
    if (maxCols >= 2 && (index > 0 || (wrap && horizontal))) {
        this.smoothSelect((index - 1 + maxItems) % maxItems);
    }
};

Window_Selectable.prototype.cursorPagedown = function() {
    const index = this.index();
    const maxItems = this.maxItems();
    if (this.topRow() + this.maxPageRows() < this.maxRows()) {
        this.smoothScrollDown(this.maxPageRows());
        this.select(Math.min(index + this.maxPageItems(), maxItems - 1));
    }
};

Window_Selectable.prototype.cursorPageup = function() {
    const index = this.index();
    if (this.topRow() > 0) {
        this.smoothScrollUp(this.maxPageRows());
        this.select(Math.max(index - this.maxPageItems(), 0));
    }
};

Window_Selectable.prototype.isScrollEnabled = function() {
    return this.active || this.index() < 0;
};

Window_Selectable.prototype.update = function() {
    this.processCursorMove();
    this.processHandling();
    this.processTouch();
    Window_Scrollable.prototype.update.call(this);
};

Window_Selectable.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        if (Input.isRepeated("down")) {
            this.cursorDown(Input.isTriggered("down"));
        }
        if (Input.isRepeated("up")) {
            this.cursorUp(Input.isTriggered("up"));
        }
        if (Input.isRepeated("right")) {
            this.cursorRight(Input.isTriggered("right"));
        }
        if (Input.isRepeated("left")) {
            this.cursorLeft(Input.isTriggered("left"));
        }
        if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
            this.cursorPagedown();
        }
        if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

Window_Selectable.prototype.processHandling = function() {
    if (this.isOpenAndActive()) {
        if (this.isOkEnabled() && this.isOkTriggered()) {
            return this.processOk();
        }
        if (this.isCancelEnabled() && this.isCancelTriggered()) {
            return this.processCancel();
        }
        if (this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
            return this.processPagedown();
        }
        if (this.isHandled("pageup") && Input.isTriggered("pageup")) {
            return this.processPageup();
        }
    }
};

Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
            this.onTouchSelect(false);
        } else if (TouchInput.isTriggered()) {
            this.onTouchSelect(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
};

Window_Selectable.prototype.isHoverEnabled = function() {
    return true;
};

Window_Selectable.prototype.onTouchSelect = function(trigger) {
    this._doubleTouch = false;
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        const hitIndex = this.hitIndex();
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                this._doubleTouch = true;
            }
            this.select(hitIndex);
        }
        if (trigger && this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

Window_Selectable.prototype.onTouchOk = function() {
    if (this.isTouchOkEnabled()) {
        const hitIndex = this.hitIndex();
        if (this._cursorFixed) {
            if (hitIndex === this.index()) {
                this.processOk();
            }
        } else if (hitIndex >= 0) {
            this.processOk();
        }
    }
};

Window_Selectable.prototype.onTouchCancel = function() {
    if (this.isCancelEnabled()) {
        this.processCancel();
    }
};

Window_Selectable.prototype.hitIndex = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
};

Window_Selectable.prototype.hitTest = function(x, y) {
    if (this.innerRect.contains(x, y)) {
        const cx = this.origin.x + x - this.padding;
        const cy = this.origin.y + y - this.padding;
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                const rect = this.itemRect(index);
                if (rect.contains(cx, cy)) {
                    return index;
                }
            }
        }
    }
    return -1;
};

Window_Selectable.prototype.isTouchOkEnabled = function() {
    return (
        this.isOkEnabled() &&
        (this._cursorFixed || this._cursorAll || this._doubleTouch)
    );
};

Window_Selectable.prototype.isOkEnabled = function() {
    return this.isHandled("ok");
};

Window_Selectable.prototype.isCancelEnabled = function() {
    return this.isHandled("cancel");
};

Window_Selectable.prototype.isOkTriggered = function() {
    return this._canRepeat ? Input.isRepeated("ok") : Input.isTriggered("ok");
};

Window_Selectable.prototype.isCancelTriggered = function() {
    return Input.isRepeated("cancel");
};

Window_Selectable.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

Window_Selectable.prototype.callOkHandler = function() {
    this.callHandler("ok");
};

Window_Selectable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};

Window_Selectable.prototype.callCancelHandler = function() {
    this.callHandler("cancel");
};

Window_Selectable.prototype.processPageup = function() {
    this.updateInputData();
    this.deactivate();
    this.callHandler("pageup");
};

Window_Selectable.prototype.processPagedown = function() {
    this.updateInputData();
    this.deactivate();
    this.callHandler("pagedown");
};

Window_Selectable.prototype.updateInputData = function() {
    Input.update();
    TouchInput.update();
    this.clearScrollStatus();
};

Window_Selectable.prototype.ensureCursorVisible = function(smooth) {
    if (this._cursorAll) {
        this.scrollTo(0, 0);
    } else if (this.innerHeight > 0 && this.row() >= 0) {
        const scrollY = this.scrollY();
        const itemTop = this.row() * this.itemHeight();
        const itemBottom = itemTop + this.itemHeight();
        const scrollMin = itemBottom - this.innerHeight;
        if (scrollY > itemTop) {
            if (smooth) {
                this.smoothScrollTo(0, itemTop);
            } else {
                this.scrollTo(0, itemTop);
            }
        } else if (scrollY < scrollMin) {
            if (smooth) {
                this.smoothScrollTo(0, scrollMin);
            } else {
                this.scrollTo(0, scrollMin);
            }
        }
    }
};

Window_Selectable.prototype.callUpdateHelp = function() {
    if (this.active && this._helpWindow) {
        this.updateHelp();
    }
};

Window_Selectable.prototype.updateHelp = function() {
    this._helpWindow.clear();
};

Window_Selectable.prototype.setHelpWindowItem = function(item) {
    if (this._helpWindow) {
        this._helpWindow.setItem(item);
    }
};

Window_Selectable.prototype.isCurrentItemEnabled = function() {
    return true;
};

Window_Selectable.prototype.drawAllItems = function() {
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

Window_Selectable.prototype.drawItem = function(/*index*/) {
    //
};

Window_Selectable.prototype.clearItem = function(index) {
    const rect = this.itemRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.contentsBack.clearRect(rect.x, rect.y, rect.width, rect.height);
};

Window_Selectable.prototype.drawItemBackground = function(index) {
    const rect = this.itemRect(index);
    this.drawBackgroundRect(rect);
};

Window_Selectable.prototype.drawBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contentsBack.strokeRect(x, y, w, h, c1);
};

Window_Selectable.prototype.redrawItem = function(index) {
    if (index >= 0) {
        this.clearItem(index);
        this.drawItemBackground(index);
        this.drawItem(index);
    }
};

Window_Selectable.prototype.redrawCurrentItem = function() {
    this.redrawItem(this.index());
};

Window_Selectable.prototype.refresh = function() {
    this.paint();
};

Window_Selectable.prototype.paint = function() {
    if (this.contents) {
        this.contents.clear();
        this.contentsBack.clear();
        this.drawAllItems();
    }
};

Window_Selectable.prototype.refreshCursor = function() {
    if (this._cursorAll) {
        this.refreshCursorForAll();
    } else if (this.index() >= 0) {
        const rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

Window_Selectable.prototype.refreshCursorForAll = function() {
    const maxItems = this.maxItems();
    if (maxItems > 0) {
        const rect = this.itemRect(0);
        rect.enlarge(this.itemRect(maxItems - 1));
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

