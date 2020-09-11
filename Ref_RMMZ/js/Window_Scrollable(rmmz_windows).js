
// Window_Scrollable
//
// The window class with scroll functions.

function Window_Scrollable() {
    this.initialize(...arguments);
}

Window_Scrollable.prototype = Object.create(Window_Base.prototype);
Window_Scrollable.prototype.constructor = Window_Scrollable;

Window_Scrollable.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._scrollX = 0;
    this._scrollY = 0;
    this._scrollBaseX = 0;
    this._scrollBaseY = 0;
    this.clearScrollStatus();
};

Window_Scrollable.prototype.clearScrollStatus = function() {
    this._scrollTargetX = 0;
    this._scrollTargetY = 0;
    this._scrollDuration = 0;
    this._scrollAccelX = 0;
    this._scrollAccelY = 0;
    this._scrollTouching = false;
    this._scrollLastTouchX = 0;
    this._scrollLastTouchY = 0;
    this._scrollLastCursorVisible = false;
};

Window_Scrollable.prototype.scrollX = function() {
    return this._scrollX;
};

Window_Scrollable.prototype.scrollY = function() {
    return this._scrollY;
};

Window_Scrollable.prototype.scrollBaseX = function() {
    return this._scrollBaseX;
};

Window_Scrollable.prototype.scrollBaseY = function() {
    return this._scrollBaseY;
};

Window_Scrollable.prototype.scrollTo = function(x, y) {
    const scrollX = x.clamp(0, this.maxScrollX());
    const scrollY = y.clamp(0, this.maxScrollY());
    if (this._scrollX !== scrollX || this._scrollY !== scrollY) {
        this._scrollX = scrollX;
        this._scrollY = scrollY;
        this.updateOrigin();
    }
};

Window_Scrollable.prototype.scrollBy = function(x, y) {
    this.scrollTo(this._scrollX + x, this._scrollY + y);
};

Window_Scrollable.prototype.smoothScrollTo = function(x, y) {
    this._scrollTargetX = x.clamp(0, this.maxScrollX());
    this._scrollTargetY = y.clamp(0, this.maxScrollY());
    this._scrollDuration = Input.keyRepeatInterval;
};

Window_Scrollable.prototype.smoothScrollBy = function(x, y) {
    if (this._scrollDuration === 0) {
        this._scrollTargetX = this.scrollX();
        this._scrollTargetY = this.scrollY();
    }
    this.smoothScrollTo(this._scrollTargetX + x, this._scrollTargetY + y);
};

Window_Scrollable.prototype.setScrollAccel = function(x, y) {
    this._scrollAccelX = x;
    this._scrollAccelY = y;
};

Window_Scrollable.prototype.overallWidth = function() {
    return this.innerWidth;
};

Window_Scrollable.prototype.overallHeight = function() {
    return this.innerHeight;
};

Window_Scrollable.prototype.maxScrollX = function() {
    return Math.max(0, this.overallWidth() - this.innerWidth);
};

Window_Scrollable.prototype.maxScrollY = function() {
    return Math.max(0, this.overallHeight() - this.innerHeight);
};

Window_Scrollable.prototype.scrollBlockWidth = function() {
    return this.itemWidth();
};

Window_Scrollable.prototype.scrollBlockHeight = function() {
    return this.itemHeight();
};

Window_Scrollable.prototype.smoothScrollDown = function(n) {
    this.smoothScrollBy(0, this.itemHeight() * n);
};

Window_Scrollable.prototype.smoothScrollUp = function(n) {
    this.smoothScrollBy(0, -this.itemHeight() * n);
};

Window_Scrollable.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.processWheelScroll();
    this.processTouchScroll();
    this.updateSmoothScroll();
    this.updateScrollAccel();
    this.updateArrows();
    this.updateOrigin();
};

Window_Scrollable.prototype.processWheelScroll = function() {
    if (this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.smoothScrollDown(1);
        }
        if (TouchInput.wheelY <= -threshold) {
            this.smoothScrollUp(1);
        }
    }
};

Window_Scrollable.prototype.processTouchScroll = function() {
    if (this.isTouchScrollEnabled()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this.onTouchScrollStart();
        }
        if (this._scrollTouching) {
            if (TouchInput.isReleased()) {
                this.onTouchScrollEnd();
            } else if (TouchInput.isMoved()) {
                this.onTouchScroll();
            }
        }
    }
};

Window_Scrollable.prototype.isWheelScrollEnabled = function() {
    return this.isScrollEnabled();
};

Window_Scrollable.prototype.isTouchScrollEnabled = function() {
    return this.isScrollEnabled();
};

Window_Scrollable.prototype.isScrollEnabled = function() {
    return true;
};

Window_Scrollable.prototype.isTouchedInsideFrame = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.innerRect.contains(localPos.x, localPos.y);
};

Window_Scrollable.prototype.onTouchScrollStart = function() {
    this._scrollTouching = true;
    this._scrollLastTouchX = TouchInput.x;
    this._scrollLastTouchY = TouchInput.y;
    this._scrollLastCursorVisible = this.cursorVisible;
    this.setScrollAccel(0, 0);
};

Window_Scrollable.prototype.onTouchScroll = function() {
    const accelX = this._scrollLastTouchX - TouchInput.x;
    const accelY = this._scrollLastTouchY - TouchInput.y;
    this.setScrollAccel(accelX, accelY);
    this._scrollLastTouchX = TouchInput.x;
    this._scrollLastTouchY = TouchInput.y;
    this.cursorVisible = false;
};

Window_Scrollable.prototype.onTouchScrollEnd = function() {
    this._scrollTouching = false;
    this.cursorVisible = this._scrollLastCursorVisible;
};

Window_Scrollable.prototype.updateSmoothScroll = function() {
    if (this._scrollDuration > 0) {
        const d = this._scrollDuration;
        const deltaX = (this._scrollTargetX - this._scrollX) / d;
        const deltaY = (this._scrollTargetY - this._scrollY) / d;
        this.scrollBy(deltaX, deltaY);
        this._scrollDuration--;
    }
};

Window_Scrollable.prototype.updateScrollAccel = function() {
    if (this._scrollAccelX !== 0 || this._scrollAccelY !== 0) {
        this.scrollBy(this._scrollAccelX, this._scrollAccelY);
        this._scrollAccelX *= 0.92;
        this._scrollAccelY *= 0.92;
        if (Math.abs(this._scrollAccelX) < 1) {
            this._scrollAccelX = 0;
        }
        if (Math.abs(this._scrollAccelY) < 1) {
            this._scrollAccelY = 0;
        }
    }
};

Window_Scrollable.prototype.updateArrows = function() {
    this.downArrowVisible = this._scrollY < this.maxScrollY();
    this.upArrowVisible = this._scrollY > 0;
};

Window_Scrollable.prototype.updateOrigin = function() {
    const blockWidth = this.scrollBlockWidth() || 1;
    const blockHeight = this.scrollBlockHeight() || 1;
    const baseX = this._scrollX - (this._scrollX % blockWidth);
    const baseY = this._scrollY - (this._scrollY % blockHeight);
    if (baseX !== this._scrollBaseX || baseY !== this._scrollBaseY) {
        this.updateScrollBase(baseX, baseY);
        this.paint();
    }
    this.origin.x = this._scrollX % blockWidth;
    this.origin.y = this._scrollY % blockHeight;
};

Window_Scrollable.prototype.updateScrollBase = function(baseX, baseY) {
    const deltaX = baseX - this._scrollBaseX;
    const deltaY = baseY - this._scrollBaseY;
    this._scrollBaseX = baseX;
    this._scrollBaseY = baseY;
    this.moveCursorBy(-deltaX, -deltaY);
    this.moveInnerChildrenBy(-deltaX, -deltaY);
};

Window_Scrollable.prototype.paint = function() {
    // to be overridden
};

