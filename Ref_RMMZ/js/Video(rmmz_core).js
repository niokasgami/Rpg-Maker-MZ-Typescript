
/**
 * The static class that handles video playback.
 *
 * @namespace
 */
function Video() {
    throw new Error("This is a static class");
}

/**
 * Initializes the video system.
 *
 * @param {number} width - The width of the video.
 * @param {number} height - The height of the video.
 */
Video.initialize = function(width, height) {
    this._element = null;
    this._loading = false;
    this._volume = 1;
    this._createElement();
    this._setupEventHandlers();
    this.resize(width, height);
};

/**
 * Changes the display size of the video.
 *
 * @param {number} width - The width of the video.
 * @param {number} height - The height of the video.
 */
Video.resize = function(width, height) {
    if (this._element) {
        this._element.style.width = width + "px";
        this._element.style.height = height + "px";
    }
};

/**
 * Starts playback of a video.
 *
 * @param {string} src - The url of the video.
 */
Video.play = function(src) {
    this._element.src = src;
    this._element.onloadeddata = this._onLoad.bind(this);
    this._element.onerror = this._onError.bind(this);
    this._element.onended = this._onEnd.bind(this);
    this._element.load();
    this._loading = true;
};

/**
 * Checks whether the video is playing.
 *
 * @returns {boolean} True if the video is playing.
 */
Video.isPlaying = function() {
    return this._loading || this._isVisible();
};

/**
 * Sets the volume for videos.
 *
 * @param {number} volume - The volume for videos (0 to 1).
 */
Video.setVolume = function(volume) {
    this._volume = volume;
    if (this._element) {
        this._element.volume = this._volume;
    }
};

Video._createElement = function() {
    this._element = document.createElement("video");
    this._element.id = "gameVideo";
    this._element.style.position = "absolute";
    this._element.style.margin = "auto";
    this._element.style.top = 0;
    this._element.style.left = 0;
    this._element.style.right = 0;
    this._element.style.bottom = 0;
    this._element.style.opacity = 0;
    this._element.style.zIndex = 2;
    this._element.setAttribute("playsinline", "");
    this._element.oncontextmenu = () => false;
    document.body.appendChild(this._element);
};

Video._onLoad = function() {
    this._element.volume = this._volume;
    this._element.play();
    this._updateVisibility(true);
    this._loading = false;
};

Video._onError = function() {
    this._updateVisibility(false);
    const retry = () => {
        this._element.load();
    };
    throw ["LoadError", this._element.src, retry];
};

Video._onEnd = function() {
    this._updateVisibility(false);
};

Video._updateVisibility = function(videoVisible) {
    if (videoVisible) {
        Graphics.hideScreen();
    } else {
        Graphics.showScreen();
    }
    this._element.style.opacity = videoVisible ? 1 : 0;
};

Video._isVisible = function() {
    return this._element.style.opacity > 0;
};

Video._setupEventHandlers = function() {
    const onUserGesture = this._onUserGesture.bind(this);
    document.addEventListener("keydown", onUserGesture);
    document.addEventListener("mousedown", onUserGesture);
    document.addEventListener("touchend", onUserGesture);
};

Video._onUserGesture = function() {
    if (!this._element.src && this._element.paused) {
        this._element.play().catch(() => 0);
    }
};

