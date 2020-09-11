
/**
 * The static class that handles input data from the mouse and touchscreen.
 *
 * @namespace
 */
function TouchInput() {
    throw new Error("This is a static class");
}

/**
 * Initializes the touch system.
 */
TouchInput.initialize = function() {
    this.clear();
    this._setupEventHandlers();
};

/**
 * The wait time of the pseudo key repeat in frames.
 *
 * @type number
 */
TouchInput.keyRepeatWait = 24;

/**
 * The interval of the pseudo key repeat in frames.
 *
 * @type number
 */
TouchInput.keyRepeatInterval = 6;

/**
 * The threshold number of pixels to treat as moved.
 *
 * @type number
 */
TouchInput.moveThreshold = 10;

/**
 * Clears all the touch data.
 */
TouchInput.clear = function() {
    this._mousePressed = false;
    this._screenPressed = false;
    this._pressedTime = 0;
    this._clicked = false;
    this._newState = this._createNewState();
    this._currentState = this._createNewState();
    this._x = 0;
    this._y = 0;
    this._triggerX = 0;
    this._triggerY = 0;
    this._moved = false;
    this._date = 0;
};

/**
 * Updates the touch data.
 */
TouchInput.update = function() {
    this._currentState = this._newState;
    this._newState = this._createNewState();
    this._clicked = this._currentState.released && !this._moved;
    if (this.isPressed()) {
        this._pressedTime++;
    }
};

/**
 * Checks whether the mouse button or touchscreen has been pressed and
 * released at the same position.
 *
 * @returns {boolean} True if the mouse button or touchscreen is clicked.
 */
TouchInput.isClicked = function() {
    return this._clicked;
};

/**
 * Checks whether the mouse button or touchscreen is currently pressed down.
 *
 * @returns {boolean} True if the mouse button or touchscreen is pressed.
 */
TouchInput.isPressed = function() {
    return this._mousePressed || this._screenPressed;
};

/**
 * Checks whether the left mouse button or touchscreen is just pressed.
 *
 * @returns {boolean} True if the mouse button or touchscreen is triggered.
 */
TouchInput.isTriggered = function() {
    return this._currentState.triggered;
};

/**
 * Checks whether the left mouse button or touchscreen is just pressed
 * or a pseudo key repeat occurred.
 *
 * @returns {boolean} True if the mouse button or touchscreen is repeated.
 */
TouchInput.isRepeated = function() {
    return (
        this.isPressed() &&
        (this._currentState.triggered ||
            (this._pressedTime >= this.keyRepeatWait &&
                this._pressedTime % this.keyRepeatInterval === 0))
    );
};

/**
 * Checks whether the left mouse button or touchscreen is kept depressed.
 *
 * @returns {boolean} True if the left mouse button or touchscreen is long-pressed.
 */
TouchInput.isLongPressed = function() {
    return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
};

/**
 * Checks whether the right mouse button is just pressed.
 *
 * @returns {boolean} True if the right mouse button is just pressed.
 */
TouchInput.isCancelled = function() {
    return this._currentState.cancelled;
};

/**
 * Checks whether the mouse or a finger on the touchscreen is moved.
 *
 * @returns {boolean} True if the mouse or a finger on the touchscreen is moved.
 */
TouchInput.isMoved = function() {
    return this._currentState.moved;
};

/**
 * Checks whether the mouse is moved without pressing a button.
 *
 * @returns {boolean} True if the mouse is hovered.
 */
TouchInput.isHovered = function() {
    return this._currentState.hovered;
};

/**
 * Checks whether the left mouse button or touchscreen is released.
 *
 * @returns {boolean} True if the mouse button or touchscreen is released.
 */
TouchInput.isReleased = function() {
    return this._currentState.released;
};

/**
 * The horizontal scroll amount.
 *
 * @readonly
 * @type number
 * @name TouchInput.wheelX
 */
Object.defineProperty(TouchInput, "wheelX", {
    get: function() {
        return this._currentState.wheelX;
    },
    configurable: true
});

/**
 * The vertical scroll amount.
 *
 * @readonly
 * @type number
 * @name TouchInput.wheelY
 */
Object.defineProperty(TouchInput, "wheelY", {
    get: function() {
        return this._currentState.wheelY;
    },
    configurable: true
});

/**
 * The x coordinate on the canvas area of the latest touch event.
 *
 * @readonly
 * @type number
 * @name TouchInput.x
 */
Object.defineProperty(TouchInput, "x", {
    get: function() {
        return this._x;
    },
    configurable: true
});

/**
 * The y coordinate on the canvas area of the latest touch event.
 *
 * @readonly
 * @type number
 * @name TouchInput.y
 */
Object.defineProperty(TouchInput, "y", {
    get: function() {
        return this._y;
    },
    configurable: true
});

/**
 * The time of the last input in milliseconds.
 *
 * @readonly
 * @type number
 * @name TouchInput.date
 */
Object.defineProperty(TouchInput, "date", {
    get: function() {
        return this._date;
    },
    configurable: true
});

TouchInput._createNewState = function() {
    return {
        triggered: false,
        cancelled: false,
        moved: false,
        hovered: false,
        released: false,
        wheelX: 0,
        wheelY: 0
    };
};

TouchInput._setupEventHandlers = function() {
    const pf = { passive: false };
    document.addEventListener("mousedown", this._onMouseDown.bind(this));
    document.addEventListener("mousemove", this._onMouseMove.bind(this));
    document.addEventListener("mouseup", this._onMouseUp.bind(this));
    document.addEventListener("wheel", this._onWheel.bind(this), pf);
    document.addEventListener("touchstart", this._onTouchStart.bind(this), pf);
    document.addEventListener("touchmove", this._onTouchMove.bind(this), pf);
    document.addEventListener("touchend", this._onTouchEnd.bind(this));
    document.addEventListener("touchcancel", this._onTouchCancel.bind(this));
    window.addEventListener("blur", this._onLostFocus.bind(this));
};

TouchInput._onMouseDown = function(event) {
    if (event.button === 0) {
        this._onLeftButtonDown(event);
    } else if (event.button === 1) {
        this._onMiddleButtonDown(event);
    } else if (event.button === 2) {
        this._onRightButtonDown(event);
    }
};

TouchInput._onLeftButtonDown = function(event) {
    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._mousePressed = true;
        this._pressedTime = 0;
        this._onTrigger(x, y);
    }
};

TouchInput._onMiddleButtonDown = function(/*event*/) {
    //
};

TouchInput._onRightButtonDown = function(event) {
    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._onCancel(x, y);
    }
};

TouchInput._onMouseMove = function(event) {
    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);
    if (this._mousePressed) {
        this._onMove(x, y);
    } else if (Graphics.isInsideCanvas(x, y)) {
        this._onHover(x, y);
    }
};

TouchInput._onMouseUp = function(event) {
    if (event.button === 0) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = false;
        this._onRelease(x, y);
    }
};

TouchInput._onWheel = function(event) {
    this._newState.wheelX += event.deltaX;
    this._newState.wheelY += event.deltaY;
    event.preventDefault();
};

TouchInput._onTouchStart = function(event) {
    for (const touch of event.changedTouches) {
        const x = Graphics.pageToCanvasX(touch.pageX);
        const y = Graphics.pageToCanvasY(touch.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._screenPressed = true;
            this._pressedTime = 0;
            if (event.touches.length >= 2) {
                this._onCancel(x, y);
            } else {
                this._onTrigger(x, y);
            }
            event.preventDefault();
        }
    }
    if (window.cordova || window.navigator.standalone) {
        event.preventDefault();
    }
};

TouchInput._onTouchMove = function(event) {
    for (const touch of event.changedTouches) {
        const x = Graphics.pageToCanvasX(touch.pageX);
        const y = Graphics.pageToCanvasY(touch.pageY);
        this._onMove(x, y);
    }
};

TouchInput._onTouchEnd = function(event) {
    for (const touch of event.changedTouches) {
        const x = Graphics.pageToCanvasX(touch.pageX);
        const y = Graphics.pageToCanvasY(touch.pageY);
        this._screenPressed = false;
        this._onRelease(x, y);
    }
};

TouchInput._onTouchCancel = function(/*event*/) {
    this._screenPressed = false;
};

TouchInput._onLostFocus = function() {
    this.clear();
};

TouchInput._onTrigger = function(x, y) {
    this._newState.triggered = true;
    this._x = x;
    this._y = y;
    this._triggerX = x;
    this._triggerY = y;
    this._moved = false;
    this._date = Date.now();
};

TouchInput._onCancel = function(x, y) {
    this._newState.cancelled = true;
    this._x = x;
    this._y = y;
};

TouchInput._onMove = function(x, y) {
    const dx = Math.abs(x - this._triggerX);
    const dy = Math.abs(y - this._triggerY);
    if (dx > this.moveThreshold || dy > this.moveThreshold) {
        this._moved = true;
    }
    if (this._moved) {
        this._newState.moved = true;
        this._x = x;
        this._y = y;
    }
};

TouchInput._onHover = function(x, y) {
    this._newState.hovered = true;
    this._x = x;
    this._y = y;
};

TouchInput._onRelease = function(x, y) {
    this._newState.released = true;
    this._x = x;
    this._y = y;
};

