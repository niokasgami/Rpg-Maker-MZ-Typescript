
// SceneManager
//
// The static class that manages scene transitions.

function SceneManager() {
    throw new Error("This is a static class");
}

SceneManager._scene = null;
SceneManager._nextScene = null;
SceneManager._stack = [];
SceneManager._exiting = false;
SceneManager._previousScene = null;
SceneManager._previousClass = null;
SceneManager._backgroundBitmap = null;
SceneManager._smoothDeltaTime = 1;
SceneManager._elapsedTime = 0;

SceneManager.run = function(sceneClass) {
    try {
        this.initialize();
        this.goto(sceneClass);
        Graphics.startGameLoop();
    } catch (e) {
        this.catchException(e);
    }
};

SceneManager.initialize = function() {
    this.checkBrowser();
    this.checkPluginErrors();
    this.initGraphics();
    this.initAudio();
    this.initVideo();
    this.initInput();
    this.setupEventHandlers();
};

SceneManager.checkBrowser = function() {
    if (!Utils.canUseWebGL()) {
        throw new Error("Your browser does not support WebGL.");
    }
    if (!Utils.canUseWebAudioAPI()) {
        throw new Error("Your browser does not support Web Audio API.");
    }
    if (!Utils.canUseCssFontLoading()) {
        throw new Error("Your browser does not support CSS Font Loading.");
    }
    if (!Utils.canUseIndexedDB()) {
        throw new Error("Your browser does not support IndexedDB.");
    }
};

SceneManager.checkPluginErrors = function() {
    PluginManager.checkErrors();
};

SceneManager.initGraphics = function() {
    if (!Graphics.initialize()) {
        throw new Error("Failed to initialize graphics.");
    }
    Graphics.setTickHandler(this.update.bind(this));
};

SceneManager.initAudio = function() {
    WebAudio.initialize();
};

SceneManager.initVideo = function() {
    Video.initialize(Graphics.width, Graphics.height);
};

SceneManager.initInput = function() {
    Input.initialize();
    TouchInput.initialize();
};

SceneManager.setupEventHandlers = function() {
    window.addEventListener("error", this.onError.bind(this));
    window.addEventListener("unhandledrejection", this.onReject.bind(this));
    window.addEventListener("unload", this.onUnload.bind(this));
    document.addEventListener("keydown", this.onKeyDown.bind(this));
};

SceneManager.update = function(deltaTime) {
    try {
        const n = this.determineRepeatNumber(deltaTime);
        for (let i = 0; i < n; i++) {
            this.updateMain();
        }
    } catch (e) {
        this.catchException(e);
    }
};

SceneManager.determineRepeatNumber = function(deltaTime) {
    // [Note] We consider environments where the refresh rate is higher than
    //   60Hz, but ignore sudden irregular deltaTime.
    this._smoothDeltaTime *= 0.8;
    this._smoothDeltaTime += Math.min(deltaTime, 2) * 0.2;
    if (this._smoothDeltaTime >= 0.9) {
        this._elapsedTime = 0;
        return Math.round(this._smoothDeltaTime);
    } else {
        this._elapsedTime += deltaTime;
        if (this._elapsedTime >= 1) {
            this._elapsedTime -= 1;
            return 1;
        }
        return 0;
    }
};

SceneManager.terminate = function() {
    window.close();
};

SceneManager.onError = function(event) {
    console.error(event.message);
    console.error(event.filename, event.lineno);
    try {
        this.stop();
        Graphics.printError("Error", event.message, event);
        AudioManager.stopAll();
    } catch (e) {
        //
    }
};

SceneManager.onReject = function(event) {
    // Catch uncaught exception in Promise
    event.message = event.reason;
    this.onError(event);
};

SceneManager.onUnload = function() {
    ImageManager.clear();
    EffectManager.clear();
    AudioManager.stopAll();
};

SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
            case 116: // F5
                this.reloadGame();
                break;
            case 119: // F8
                this.showDevTools();
                break;
        }
    }
};

SceneManager.reloadGame = function() {
    if (Utils.isNwjs()) {
        chrome.runtime.reload();
    }
};

SceneManager.showDevTools = function() {
    if (Utils.isNwjs() && Utils.isOptionValid("test")) {
        nw.Window.get().showDevTools();
    }
};

SceneManager.catchException = function(e) {
    if (e instanceof Error) {
        this.catchNormalError(e);
    } else if (e instanceof Array && e[0] === "LoadError") {
        this.catchLoadError(e);
    } else {
        this.catchUnknownError(e);
    }
    this.stop();
};

SceneManager.catchNormalError = function(e) {
    Graphics.printError(e.name, e.message, e);
    AudioManager.stopAll();
    console.error(e.stack);
};

SceneManager.catchLoadError = function(e) {
    const url = e[1];
    const retry = e[2];
    Graphics.printError("Failed to load", url);
    if (retry) {
        Graphics.showRetryButton(() => {
            retry();
            SceneManager.resume();
        });
    } else {
        AudioManager.stopAll();
    }
};

SceneManager.catchUnknownError = function(e) {
    Graphics.printError("UnknownError", String(e));
    AudioManager.stopAll();
};

SceneManager.updateMain = function() {
    this.updateFrameCount();
    this.updateInputData();
    this.updateEffekseer();
    this.changeScene();
    this.updateScene();
};

SceneManager.updateFrameCount = function() {
    Graphics.frameCount++;
};

SceneManager.updateInputData = function() {
    Input.update();
    TouchInput.update();
};

SceneManager.updateEffekseer = function() {
    if (Graphics.effekseer) {
        Graphics.effekseer.update();
    }
};

SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        if (this._scene) {
            this._scene.terminate();
            this.onSceneTerminate();
        }
        this._scene = this._nextScene;
        this._nextScene = null;
        if (this._scene) {
            this._scene.create();
            this.onSceneCreate();
        }
        if (this._exiting) {
            this.terminate();
        }
    }
};

SceneManager.updateScene = function() {
    if (this._scene) {
        if (this._scene.isStarted()) {
            if (this.isGameActive()) {
                this._scene.update();
            }
        } else if (this._scene.isReady()) {
            this.onBeforeSceneStart();
            this._scene.start();
            this.onSceneStart();
        }
    }
};

SceneManager.isGameActive = function() {
    // [Note] We use "window.top" to support an iframe.
    try {
        return window.top.document.hasFocus();
    } catch (e) {
        // SecurityError
        return true;
    }
};

SceneManager.onSceneTerminate = function() {
    this._previousScene = this._scene;
    this._previousClass = this._scene.constructor;
    Graphics.setStage(null);
};

SceneManager.onSceneCreate = function() {
    Graphics.startLoading();
};

SceneManager.onBeforeSceneStart = function() {
    if (this._previousScene) {
        this._previousScene.destroy();
        this._previousScene = null;
    }
    if (Graphics.effekseer) {
        Graphics.effekseer.stopAll();
    }
};

SceneManager.onSceneStart = function() {
    Graphics.endLoading();
    Graphics.setStage(this._scene);
};

SceneManager.isSceneChanging = function() {
    return this._exiting || !!this._nextScene;
};

SceneManager.isCurrentSceneBusy = function() {
    return this._scene && this._scene.isBusy();
};

SceneManager.isNextScene = function(sceneClass) {
    return this._nextScene && this._nextScene.constructor === sceneClass;
};

SceneManager.isPreviousScene = function(sceneClass) {
    return this._previousClass === sceneClass;
};

SceneManager.goto = function(sceneClass) {
    if (sceneClass) {
        this._nextScene = new sceneClass();
    }
    if (this._scene) {
        this._scene.stop();
    }
};

SceneManager.push = function(sceneClass) {
    this._stack.push(this._scene.constructor);
    this.goto(sceneClass);
};

SceneManager.pop = function() {
    if (this._stack.length > 0) {
        this.goto(this._stack.pop());
    } else {
        this.exit();
    }
};

SceneManager.exit = function() {
    this.goto(null);
    this._exiting = true;
};

SceneManager.clearStack = function() {
    this._stack = [];
};

SceneManager.stop = function() {
    Graphics.stopGameLoop();
};

SceneManager.prepareNextScene = function() {
    this._nextScene.prepare(...arguments);
};

SceneManager.snap = function() {
    return Bitmap.snap(this._scene);
};

SceneManager.snapForBackground = function() {
    if (this._backgroundBitmap) {
        this._backgroundBitmap.destroy();
    }
    this._backgroundBitmap = this.snap();
};

SceneManager.backgroundBitmap = function() {
    return this._backgroundBitmap;
};

SceneManager.resume = function() {
    TouchInput.update();
    Graphics.startGameLoop();
};

