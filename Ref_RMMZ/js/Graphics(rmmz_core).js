
/**
 * The static class that carries out graphics processing.
 *
 * @namespace
 */
function Graphics() {
    throw new Error("This is a static class");
}

/**
 * Initializes the graphics system.
 *
 * @returns {boolean} True if the graphics system is available.
 */
Graphics.initialize = function() {
    this._width = 0;
    this._height = 0;
    this._defaultScale = 1;
    this._realScale = 1;
    this._errorPrinter = null;
    this._tickHandler = null;
    this._canvas = null;
    this._fpsCounter = null;
    this._loadingSpinner = null;
    this._stretchEnabled = this._defaultStretchMode();
    this._app = null;
    this._effekseer = null;
    this._wasLoading = false;

    /**
     * The total frame count of the game screen.
     *
     * @type number
     * @name Graphics.frameCount
     */
    this.frameCount = 0;

    /**
     * The width of the window display area.
     *
     * @type number
     * @name Graphics.boxWidth
     */
    this.boxWidth = this._width;

    /**
     * The height of the window display area.
     *
     * @type number
     * @name Graphics.boxHeight
     */
    this.boxHeight = this._height;

    this._updateRealScale();
    this._createAllElements();
    this._disableContextMenu();
    this._setupEventHandlers();
    this._createPixiApp();
    this._createEffekseerContext();

    return !!this._app;
};

/**
 * The PIXI.Application object.
 *
 * @readonly
 * @type PIXI.Application
 * @name Graphics.app
 */
Object.defineProperty(Graphics, "app", {
    get: function() {
        return this._app;
    },
    configurable: true
});

/**
 * The context object of Effekseer.
 *
 * @readonly
 * @type EffekseerContext
 * @name Graphics.effekseer
 */
Object.defineProperty(Graphics, "effekseer", {
    get: function() {
        return this._effekseer;
    },
    configurable: true
});

/**
 * Register a handler for tick events.
 *
 * @param {function} handler - The listener function to be added for updates.
 */
Graphics.setTickHandler = function(handler) {
    this._tickHandler = handler;
};

/**
 * Starts the game loop.
 */
Graphics.startGameLoop = function() {
    if (this._app) {
        this._app.start();
    }
};

/**
 * Stops the game loop.
 */
Graphics.stopGameLoop = function() {
    if (this._app) {
        this._app.stop();
    }
};

/**
 * Sets the stage to be rendered.
 *
 * @param {Stage} stage - The stage object to be rendered.
 */
Graphics.setStage = function(stage) {
    if (this._app) {
        this._app.stage = stage;
    }
};

/**
 * Shows the loading spinner.
 */
Graphics.startLoading = function() {
    if (!document.getElementById("loadingSpinner")) {
        document.body.appendChild(this._loadingSpinner);
    }
};

/**
 * Erases the loading spinner.
 *
 * @returns {boolean} True if the loading spinner was active.
 */
Graphics.endLoading = function() {
    if (document.getElementById("loadingSpinner")) {
        document.body.removeChild(this._loadingSpinner);
        return true;
    } else {
        return false;
    }
};

/**
 * Displays the error text to the screen.
 *
 * @param {string} name - The name of the error.
 * @param {string} message - The message of the error.
 * @param {Error} [error] - The error object.
 */
Graphics.printError = function(name, message, error = null) {
    if (!this._errorPrinter) {
        this._createErrorPrinter();
    }
    this._errorPrinter.innerHTML = this._makeErrorHtml(name, message, error);
    this._wasLoading = this.endLoading();
    this._applyCanvasFilter();
};

/**
 * Displays a button to try to reload resources.
 *
 * @param {function} retry - The callback function to be called when the button
 *                           is pressed.
 */
Graphics.showRetryButton = function(retry) {
    const button = document.createElement("button");
    button.id = "retryButton";
    button.innerHTML = "Retry";
    // [Note] stopPropagation() is required for iOS Safari.
    button.ontouchstart = e => e.stopPropagation();
    button.onclick = () => {
        Graphics.eraseError();
        retry();
    };
    this._errorPrinter.appendChild(button);
    button.focus();
};

/**
 * Erases the loading error text.
 */
Graphics.eraseError = function() {
    if (this._errorPrinter) {
        this._errorPrinter.innerHTML = this._makeErrorHtml();
        if (this._wasLoading) {
            this.startLoading();
        }
    }
    this._clearCanvasFilter();
};

/**
 * Converts an x coordinate on the page to the corresponding
 * x coordinate on the canvas area.
 *
 * @param {number} x - The x coordinate on the page to be converted.
 * @returns {number} The x coordinate on the canvas area.
 */
Graphics.pageToCanvasX = function(x) {
    if (this._canvas) {
        const left = this._canvas.offsetLeft;
        return Math.round((x - left) / this._realScale);
    } else {
        return 0;
    }
};

/**
 * Converts a y coordinate on the page to the corresponding
 * y coordinate on the canvas area.
 *
 * @param {number} y - The y coordinate on the page to be converted.
 * @returns {number} The y coordinate on the canvas area.
 */
Graphics.pageToCanvasY = function(y) {
    if (this._canvas) {
        const top = this._canvas.offsetTop;
        return Math.round((y - top) / this._realScale);
    } else {
        return 0;
    }
};

/**
 * Checks whether the specified point is inside the game canvas area.
 *
 * @param {number} x - The x coordinate on the canvas area.
 * @param {number} y - The y coordinate on the canvas area.
 * @returns {boolean} True if the specified point is inside the game canvas area.
 */
Graphics.isInsideCanvas = function(x, y) {
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
};

/**
 * Shows the game screen.
 */
Graphics.showScreen = function() {
    this._canvas.style.opacity = 1;
};

/**
 * Hides the game screen.
 */
Graphics.hideScreen = function() {
    this._canvas.style.opacity = 0;
};

/**
 * Changes the size of the game screen.
 *
 * @param {number} width - The width of the game screen.
 * @param {number} height - The height of the game screen.
 */
Graphics.resize = function(width, height) {
    this._width = width;
    this._height = height;
    this._updateAllElements();
};

/**
 * The width of the game screen.
 *
 * @type number
 * @name Graphics.width
 */
Object.defineProperty(Graphics, "width", {
    get: function() {
        return this._width;
    },
    set: function(value) {
        if (this._width !== value) {
            this._width = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * The height of the game screen.
 *
 * @type number
 * @name Graphics.height
 */
Object.defineProperty(Graphics, "height", {
    get: function() {
        return this._height;
    },
    set: function(value) {
        if (this._height !== value) {
            this._height = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * The default zoom scale of the game screen.
 *
 * @type number
 * @name Graphics.defaultScale
 */
Object.defineProperty(Graphics, "defaultScale", {
    get: function() {
        return this._defaultScale;
    },
    set: function(value) {
        if (this._defaultScale !== value) {
            this._defaultScale = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

Graphics._createAllElements = function() {
    this._createErrorPrinter();
    this._createCanvas();
    this._createLoadingSpinner();
    this._createFPSCounter();
};

Graphics._updateAllElements = function() {
    this._updateRealScale();
    this._updateErrorPrinter();
    this._updateCanvas();
    this._updateVideo();
};

Graphics._onTick = function(deltaTime) {
    this._fpsCounter.startTick();
    if (this._tickHandler) {
        this._tickHandler(deltaTime);
    }
    if (this._canRender()) {
        this._app.render();
    }
    this._fpsCounter.endTick();
};

Graphics._canRender = function() {
    return !!this._app.stage;
};

Graphics._updateRealScale = function() {
    if (this._stretchEnabled && this._width > 0 && this._height > 0) {
        const h = this._stretchWidth() / this._width;
        const v = this._stretchHeight() / this._height;
        this._realScale = Math.min(h, v);
        window.scrollTo(0, 0);
    } else {
        this._realScale = this._defaultScale;
    }
};

Graphics._stretchWidth = function() {
    if (Utils.isMobileDevice()) {
        return document.documentElement.clientWidth;
    } else {
        return window.innerWidth;
    }
};

Graphics._stretchHeight = function() {
    if (Utils.isMobileDevice()) {
        // [Note] Mobile browsers often have special operations at the top and
        //   bottom of the screen.
        const rate = Utils.isLocal() ? 1.0 : 0.9;
        return document.documentElement.clientHeight * rate;
    } else {
        return window.innerHeight;
    }
};

Graphics._makeErrorHtml = function(name, message /*, error*/) {
    const nameDiv = document.createElement("div");
    const messageDiv = document.createElement("div");
    nameDiv.id = "errorName";
    messageDiv.id = "errorMessage";
    nameDiv.innerHTML = Utils.escapeHtml(name || "");
    messageDiv.innerHTML = Utils.escapeHtml(message || "");
    return nameDiv.outerHTML + messageDiv.outerHTML;
};

Graphics._defaultStretchMode = function() {
    return Utils.isNwjs() || Utils.isMobileDevice();
};

Graphics._createErrorPrinter = function() {
    this._errorPrinter = document.createElement("div");
    this._errorPrinter.id = "errorPrinter";
    this._errorPrinter.innerHTML = this._makeErrorHtml();
    document.body.appendChild(this._errorPrinter);
};

Graphics._updateErrorPrinter = function() {
    const width = 640 * this._realScale;
    const height = 100 * this._realScale;
    this._errorPrinter.style.width = width + "px";
    this._errorPrinter.style.height = height + "px";
};

Graphics._createCanvas = function() {
    this._canvas = document.createElement("canvas");
    this._canvas.id = "gameCanvas";
    this._updateCanvas();
    document.body.appendChild(this._canvas);
};

Graphics._updateCanvas = function() {
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.zIndex = 1;
    this._centerElement(this._canvas);
};

Graphics._updateVideo = function() {
    const width = this._width * this._realScale;
    const height = this._height * this._realScale;
    Video.resize(width, height);
};

Graphics._createLoadingSpinner = function() {
    const loadingSpinner = document.createElement("div");
    const loadingSpinnerImage = document.createElement("div");
    loadingSpinner.id = "loadingSpinner";
    loadingSpinnerImage.id = "loadingSpinnerImage";
    loadingSpinner.appendChild(loadingSpinnerImage);
    this._loadingSpinner = loadingSpinner;
};

Graphics._createFPSCounter = function() {
    this._fpsCounter = new Graphics.FPSCounter();
};

Graphics._centerElement = function(element) {
    const width = element.width * this._realScale;
    const height = element.height * this._realScale;
    element.style.position = "absolute";
    element.style.margin = "auto";
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + "px";
    element.style.height = height + "px";
};

Graphics._disableContextMenu = function() {
    const elements = document.body.getElementsByTagName("*");
    const oncontextmenu = () => false;
    for (const element of elements) {
        element.oncontextmenu = oncontextmenu;
    }
};

Graphics._applyCanvasFilter = function() {
    if (this._canvas) {
        this._canvas.style.opacity = 0.5;
        this._canvas.style.filter = "blur(8px)";
        this._canvas.style.webkitFilter = "blur(8px)";
    }
};

Graphics._clearCanvasFilter = function() {
    if (this._canvas) {
        this._canvas.style.opacity = 1;
        this._canvas.style.filter = "";
        this._canvas.style.webkitFilter = "";
    }
};

Graphics._setupEventHandlers = function() {
    window.addEventListener("resize", this._onWindowResize.bind(this));
    document.addEventListener("keydown", this._onKeyDown.bind(this));
};

Graphics._onWindowResize = function() {
    this._updateAllElements();
};

Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
            case 113: // F2
                event.preventDefault();
                this._switchFPSCounter();
                break;
            case 114: // F3
                event.preventDefault();
                this._switchStretchMode();
                break;
            case 115: // F4
                event.preventDefault();
                this._switchFullScreen();
                break;
        }
    }
};

Graphics._switchFPSCounter = function() {
    this._fpsCounter.switchMode();
};

Graphics._switchStretchMode = function() {
    this._stretchEnabled = !this._stretchEnabled;
    this._updateAllElements();
};

Graphics._switchFullScreen = function() {
    if (this._isFullScreen()) {
        this._cancelFullScreen();
    } else {
        this._requestFullScreen();
    }
};

Graphics._isFullScreen = function() {
    return (
        document.fullScreenElement ||
        document.mozFullScreen ||
        document.webkitFullscreenElement
    );
};

Graphics._requestFullScreen = function() {
    const element = document.body;
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
};

Graphics._cancelFullScreen = function() {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};

Graphics._createPixiApp = function() {
    try {
        this._setupPixi();
        this._app = new PIXI.Application({
            view: this._canvas,
            autoStart: false
        });
        this._app.ticker.remove(this._app.render, this._app);
        this._app.ticker.add(this._onTick, this);
    } catch (e) {
        this._app = null;
    }
};

Graphics._setupPixi = function() {
    PIXI.utils.skipHello();
    PIXI.settings.GC_MAX_IDLE = 600;
};

Graphics._createEffekseerContext = function() {
    if (this._app && window.effekseer) {
        try {
            this._effekseer = effekseer.createContext();
            if (this._effekseer) {
                this._effekseer.init(this._app.renderer.gl);
            }
        } catch (e) {
            this._app = null;
        }
    }
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// FPSCounter
//
// This is based on Darsain's FPSMeter which is under the MIT license.
// The original can be found at https://github.com/Darsain/fpsmeter.

Graphics.FPSCounter = function() {
    this.initialize(...arguments);
};

Graphics.FPSCounter.prototype.initialize = function() {
    this._tickCount = 0;
    this._frameTime = 100;
    this._frameStart = 0;
    this._lastLoop = performance.now() - 100;
    this._showFps = true;
    this.fps = 0;
    this.duration = 0;
    this._createElements();
    this._update();
};

Graphics.FPSCounter.prototype.startTick = function() {
    this._frameStart = performance.now();
};

Graphics.FPSCounter.prototype.endTick = function() {
    const time = performance.now();
    const thisFrameTime = time - this._lastLoop;
    this._frameTime += (thisFrameTime - this._frameTime) / 12;
    this.fps = 1000 / this._frameTime;
    this.duration = Math.max(0, time - this._frameStart);
    this._lastLoop = time;
    if (this._tickCount++ % 15 === 0) {
        this._update();
    }
};

Graphics.FPSCounter.prototype.switchMode = function() {
    if (this._boxDiv.style.display === "none") {
        this._boxDiv.style.display = "block";
        this._showFps = true;
    } else if (this._showFps) {
        this._showFps = false;
    } else {
        this._boxDiv.style.display = "none";
    }
    this._update();
};

Graphics.FPSCounter.prototype._createElements = function() {
    this._boxDiv = document.createElement("div");
    this._labelDiv = document.createElement("div");
    this._numberDiv = document.createElement("div");
    this._boxDiv.id = "fpsCounterBox";
    this._labelDiv.id = "fpsCounterLabel";
    this._numberDiv.id = "fpsCounterNumber";
    this._boxDiv.style.display = "none";
    this._boxDiv.appendChild(this._labelDiv);
    this._boxDiv.appendChild(this._numberDiv);
    document.body.appendChild(this._boxDiv);
};

Graphics.FPSCounter.prototype._update = function() {
    const count = this._showFps ? this.fps : this.duration;
    this._labelDiv.textContent = this._showFps ? "FPS" : "ms";
    this._numberDiv.textContent = count.toFixed(0);
};

