
/**
 * The audio object of Web Audio API.
 *
 * @class
 * @param {string} url - The url of the audio file.
 */
function WebAudio() {
    this.initialize(...arguments);
}

WebAudio.prototype.initialize = function(url) {
    this.clear();
    this._url = url;
    this._startLoading();
};

/**
 * Initializes the audio system.
 *
 * @returns {boolean} True if the audio system is available.
 */
WebAudio.initialize = function() {
    this._context = null;
    this._masterGainNode = null;
    this._masterVolume = 1;
    this._createContext();
    this._createMasterGainNode();
    this._setupEventHandlers();
    return !!this._context;
};

/**
 * Sets the master volume for all audio.
 *
 * @param {number} value - The master volume (0 to 1).
 */
WebAudio.setMasterVolume = function(value) {
    this._masterVolume = value;
    this._resetVolume();
};

WebAudio._createContext = function() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContext();
    } catch (e) {
        this._context = null;
    }
};

WebAudio._currentTime = function() {
    return this._context ? this._context.currentTime : 0;
};

WebAudio._createMasterGainNode = function() {
    const context = this._context;
    if (context) {
        this._masterGainNode = context.createGain();
        this._resetVolume();
        this._masterGainNode.connect(context.destination);
    }
};

WebAudio._setupEventHandlers = function() {
    const onUserGesture = this._onUserGesture.bind(this);
    const onVisibilityChange = this._onVisibilityChange.bind(this);
    document.addEventListener("keydown", onUserGesture);
    document.addEventListener("mousedown", onUserGesture);
    document.addEventListener("touchend", onUserGesture);
    document.addEventListener("visibilitychange", onVisibilityChange);
};

WebAudio._onUserGesture = function() {
    const context = this._context;
    if (context && context.state === "suspended") {
        context.resume();
    }
};

WebAudio._onVisibilityChange = function() {
    if (document.visibilityState === "hidden") {
        this._onHide();
    } else {
        this._onShow();
    }
};

WebAudio._onHide = function() {
    if (this._shouldMuteOnHide()) {
        this._fadeOut(1);
    }
};

WebAudio._onShow = function() {
    if (this._shouldMuteOnHide()) {
        this._fadeIn(1);
    }
};

WebAudio._shouldMuteOnHide = function() {
    return Utils.isMobileDevice() && !window.navigator.standalone;
};

WebAudio._resetVolume = function() {
    if (this._masterGainNode) {
        const gain = this._masterGainNode.gain;
        const volume = this._masterVolume;
        const currentTime = this._currentTime();
        gain.setValueAtTime(volume, currentTime);
    }
};

WebAudio._fadeIn = function(duration) {
    if (this._masterGainNode) {
        const gain = this._masterGainNode.gain;
        const volume = this._masterVolume;
        const currentTime = this._currentTime();
        gain.setValueAtTime(0, currentTime);
        gain.linearRampToValueAtTime(volume, currentTime + duration);
    }
};

WebAudio._fadeOut = function(duration) {
    if (this._masterGainNode) {
        const gain = this._masterGainNode.gain;
        const volume = this._masterVolume;
        const currentTime = this._currentTime();
        gain.setValueAtTime(volume, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
};

/**
 * Clears the audio data.
 */
WebAudio.prototype.clear = function() {
    this.stop();
    this._data = null;
    this._fetchedSize = 0;
    this._fetchedData = [];
    this._buffers = [];
    this._sourceNodes = [];
    this._gainNode = null;
    this._pannerNode = null;
    this._totalTime = 0;
    this._sampleRate = 0;
    this._loop = 0;
    this._loopStart = 0;
    this._loopLength = 0;
    this._loopStartTime = 0;
    this._loopLengthTime = 0;
    this._startTime = 0;
    this._volume = 1;
    this._pitch = 1;
    this._pan = 0;
    this._endTimer = null;
    this._loadListeners = [];
    this._stopListeners = [];
    this._lastUpdateTime = 0;
    this._isLoaded = false;
    this._isError = false;
    this._isPlaying = false;
    this._decoder = null;
};

/**
 * The url of the audio file.
 *
 * @readonly
 * @type string
 * @name WebAudio#url
 */
Object.defineProperty(WebAudio.prototype, "url", {
    get: function() {
        return this._url;
    },
    configurable: true
});

/**
 * The volume of the audio.
 *
 * @type number
 * @name WebAudio#volume
 */
Object.defineProperty(WebAudio.prototype, "volume", {
    get: function() {
        return this._volume;
    },
    set: function(value) {
        this._volume = value;
        if (this._gainNode) {
            this._gainNode.gain.setValueAtTime(
                this._volume,
                WebAudio._currentTime()
            );
        }
    },
    configurable: true
});

/**
 * The pitch of the audio.
 *
 * @type number
 * @name WebAudio#pitch
 */
Object.defineProperty(WebAudio.prototype, "pitch", {
    get: function() {
        return this._pitch;
    },
    set: function(value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._loop, 0);
            }
        }
    },
    configurable: true
});

/**
 * The pan of the audio.
 *
 * @type number
 * @name WebAudio#pan
 */
Object.defineProperty(WebAudio.prototype, "pan", {
    get: function() {
        return this._pan;
    },
    set: function(value) {
        this._pan = value;
        this._updatePanner();
    },
    configurable: true
});

/**
 * Checks whether the audio data is ready to play.
 *
 * @returns {boolean} True if the audio data is ready to play.
 */
WebAudio.prototype.isReady = function() {
    return this._buffers && this._buffers.length > 0;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @returns {boolean} True if a loading error has occurred.
 */
WebAudio.prototype.isError = function() {
    return this._isError;
};

/**
 * Checks whether the audio is playing.
 *
 * @returns {boolean} True if the audio is playing.
 */
WebAudio.prototype.isPlaying = function() {
    return this._isPlaying;
};

/**
 * Plays the audio.
 *
 * @param {boolean} loop - Whether the audio data play in a loop.
 * @param {number} offset - The start position to play in seconds.
 */
WebAudio.prototype.play = function(loop, offset) {
    this._loop = loop;
    if (this.isReady()) {
        offset = offset || 0;
        this._startPlaying(offset);
    } else if (WebAudio._context) {
        this.addLoadListener(() => this.play(loop, offset));
    }
    this._isPlaying = true;
};

/**
 * Stops the audio.
 */
WebAudio.prototype.stop = function() {
    this._isPlaying = false;
    this._removeEndTimer();
    this._removeNodes();
    this._loadListeners = [];
    if (this._stopListeners) {
        while (this._stopListeners.length > 0) {
            const listner = this._stopListeners.shift();
            listner();
        }
    }
};

/**
 * Destroys the audio.
 */
WebAudio.prototype.destroy = function() {
    this._destroyDecoder();
    this.clear();
};

/**
 * Performs the audio fade-in.
 *
 * @param {number} duration - Fade-in time in seconds.
 */
WebAudio.prototype.fadeIn = function(duration) {
    if (this.isReady()) {
        if (this._gainNode) {
            const gain = this._gainNode.gain;
            const currentTime = WebAudio._currentTime();
            gain.setValueAtTime(0, currentTime);
            gain.linearRampToValueAtTime(this._volume, currentTime + duration);
        }
    } else {
        this.addLoadListener(() => this.fadeIn(duration));
    }
};

/**
 * Performs the audio fade-out.
 *
 * @param {number} duration - Fade-out time in seconds.
 */
WebAudio.prototype.fadeOut = function(duration) {
    if (this._gainNode) {
        const gain = this._gainNode.gain;
        const currentTime = WebAudio._currentTime();
        gain.setValueAtTime(this._volume, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
    this._isPlaying = false;
    this._loadListeners = [];
};

/**
 * Gets the seek position of the audio.
 */
WebAudio.prototype.seek = function() {
    if (WebAudio._context) {
        let pos = (WebAudio._currentTime() - this._startTime) * this._pitch;
        if (this._loopLengthTime > 0) {
            while (pos >= this._loopStartTime + this._loopLengthTime) {
                pos -= this._loopLengthTime;
            }
        }
        return pos;
    } else {
        return 0;
    }
};

/**
 * Adds a callback function that will be called when the audio data is loaded.
 *
 * @param {function} listner - The callback function.
 */
WebAudio.prototype.addLoadListener = function(listner) {
    this._loadListeners.push(listner);
};

/**
 * Adds a callback function that will be called when the playback is stopped.
 *
 * @param {function} listner - The callback function.
 */
WebAudio.prototype.addStopListener = function(listner) {
    this._stopListeners.push(listner);
};

/**
 * Tries to load the audio again.
 */
WebAudio.prototype.retry = function() {
    this._startLoading();
    if (this._isPlaying) {
        this.play(this._loop, 0);
    }
};

WebAudio.prototype._startLoading = function() {
    if (WebAudio._context) {
        const url = this._realUrl();
        if (Utils.isLocal()) {
            this._startXhrLoading(url);
        } else {
            this._startFetching(url);
        }
        const currentTime = WebAudio._currentTime();
        this._lastUpdateTime = currentTime - 0.5;
        this._isError = false;
        this._isLoaded = false;
        this._destroyDecoder();
        if (this._shouldUseDecoder()) {
            this._createDecoder();
        }
    }
};

WebAudio.prototype._shouldUseDecoder = function() {
    return !Utils.canPlayOgg() && typeof VorbisDecoder === "function";
};

WebAudio.prototype._createDecoder = function() {
    this._decoder = new VorbisDecoder(
        WebAudio._context,
        this._onDecode.bind(this),
        this._onError.bind(this)
    );
};

WebAudio.prototype._destroyDecoder = function() {
    if (this._decoder) {
        this._decoder.destroy();
        this._decoder = null;
    }
};

WebAudio.prototype._realUrl = function() {
    return this._url + (Utils.hasEncryptedAudio() ? "_" : "");
};

WebAudio.prototype._startXhrLoading = function(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = () => this._onXhrLoad(xhr);
    xhr.onerror = this._onError.bind(this);
    xhr.send();
};

WebAudio.prototype._startFetching = function(url) {
    const options = { credentials: "same-origin" };
    fetch(url, options)
        .then(response => this._onFetch(response))
        .catch(() => this._onError());
};

WebAudio.prototype._onXhrLoad = function(xhr) {
    if (xhr.status < 400) {
        this._data = new Uint8Array(xhr.response);
        this._isLoaded = true;
        this._updateBuffer();
    } else {
        this._onError();
    }
};

WebAudio.prototype._onFetch = function(response) {
    if (response.ok) {
        const reader = response.body.getReader();
        const readChunk = ({ done, value }) => {
            if (done) {
                this._isLoaded = true;
                if (this._fetchedSize > 0) {
                    this._concatenateFetchedData();
                    this._updateBuffer();
                    this._data = null;
                }
                return 0;
            } else {
                this._onFetchProcess(value);
                return reader.read().then(readChunk);
            }
        };
        reader
            .read()
            .then(readChunk)
            .catch(() => this._onError());
    } else {
        this._onError();
    }
};

WebAudio.prototype._onError = function() {
    if (this._sourceNodes.length > 0) {
        this._stopSourceNode();
    }
    this._data = null;
    this._isError = true;
};

WebAudio.prototype._onFetchProcess = function(value) {
    this._fetchedSize += value.length;
    this._fetchedData.push(value);
    this._updateBufferOnFetch();
};

WebAudio.prototype._updateBufferOnFetch = function() {
    const currentTime = WebAudio._currentTime();
    const deltaTime = currentTime - this._lastUpdateTime;
    const currentData = this._data;
    const currentSize = currentData ? currentData.length : 0;
    if (deltaTime >= 1 && currentSize + this._fetchedSize >= 200000) {
        this._concatenateFetchedData();
        this._updateBuffer();
        this._lastUpdateTime = currentTime;
    }
};

WebAudio.prototype._concatenateFetchedData = function() {
    const currentData = this._data;
    const currentSize = currentData ? currentData.length : 0;
    const newData = new Uint8Array(currentSize + this._fetchedSize);
    let pos = 0;
    if (currentData) {
        newData.set(currentData);
        pos += currentSize;
    }
    for (const value of this._fetchedData) {
        newData.set(value, pos);
        pos += value.length;
    }
    this._data = newData;
    this._fetchedData = [];
    this._fetchedSize = 0;
};

WebAudio.prototype._updateBuffer = function() {
    const arrayBuffer = this._readableBuffer();
    this._readLoopComments(arrayBuffer);
    this._decodeAudioData(arrayBuffer);
};

WebAudio.prototype._readableBuffer = function() {
    if (Utils.hasEncryptedAudio()) {
        return Utils.decryptArrayBuffer(this._data.buffer);
    } else {
        return this._data.buffer;
    }
};

WebAudio.prototype._decodeAudioData = function(arrayBuffer) {
    if (this._shouldUseDecoder()) {
        if (this._decoder) {
            this._decoder.send(arrayBuffer, this._isLoaded);
        }
    } else {
        // [Note] Make a temporary copy of arrayBuffer because
        //   decodeAudioData() detaches it.
        WebAudio._context
            .decodeAudioData(arrayBuffer.slice())
            .then(buffer => this._onDecode(buffer))
            .catch(() => this._onError());
    }
};

WebAudio.prototype._onDecode = function(buffer) {
    if (!this._shouldUseDecoder()) {
        this._buffers = [];
        this._totalTime = 0;
    }
    this._buffers.push(buffer);
    this._totalTime += buffer.duration;
    if (this._loopLength > 0 && this._sampleRate > 0) {
        this._loopStartTime = this._loopStart / this._sampleRate;
        this._loopLengthTime = this._loopLength / this._sampleRate;
    } else {
        this._loopStartTime = 0;
        this._loopLengthTime = this._totalTime;
    }
    if (this._sourceNodes.length > 0) {
        this._refreshSourceNode();
    }
    this._onLoad();
};

WebAudio.prototype._refreshSourceNode = function() {
    if (this._shouldUseDecoder()) {
        const index = this._buffers.length - 1;
        this._createSourceNode(index);
        if (this._isPlaying) {
            this._startSourceNode(index);
        }
    } else {
        this._stopSourceNode();
        this._createAllSourceNodes();
        if (this._isPlaying) {
            this._startAllSourceNodes();
        }
    }
    if (this._isPlaying) {
        this._removeEndTimer();
        this._createEndTimer();
    }
};

WebAudio.prototype._startPlaying = function(offset) {
    if (this._loopLengthTime > 0) {
        while (offset >= this._loopStartTime + this._loopLengthTime) {
            offset -= this._loopLengthTime;
        }
    }
    this._startTime = WebAudio._currentTime() - offset / this._pitch;
    this._removeEndTimer();
    this._removeNodes();
    this._createPannerNode();
    this._createGainNode();
    this._createAllSourceNodes();
    this._startAllSourceNodes();
    this._createEndTimer();
};

WebAudio.prototype._startAllSourceNodes = function() {
    for (let i = 0; i < this._sourceNodes.length; i++) {
        this._startSourceNode(i);
    }
};

WebAudio.prototype._startSourceNode = function(index) {
    const sourceNode = this._sourceNodes[index];
    const seekPos = this.seek();
    const currentTime = WebAudio._currentTime();
    const loop = this._loop;
    const loopStart = this._loopStartTime;
    const loopLength = this._loopLengthTime;
    const loopEnd = loopStart + loopLength;
    const pitch = this._pitch;
    let chunkStart = 0;
    for (let i = 0; i < index; i++) {
        chunkStart += this._buffers[i].duration;
    }
    const chunkEnd = chunkStart + sourceNode.buffer.duration;
    let when = 0;
    let offset = 0;
    let duration = sourceNode.buffer.duration;
    if (seekPos >= chunkStart && seekPos < chunkEnd - 0.01) {
        when = currentTime;
        offset = seekPos - chunkStart;
    } else {
        when = currentTime + (chunkStart - seekPos) / pitch;
        offset = 0;
        if (loop) {
            if (when < currentTime - 0.01) {
                when += loopLength / pitch;
            }
            if (seekPos >= loopStart && chunkStart < loopStart) {
                when += (loopStart - chunkStart) / pitch;
                offset = loopStart - chunkStart;
            }
        }
    }
    if (loop && loopEnd < chunkEnd) {
        duration = loopEnd - chunkStart - offset;
    }
    if (this._shouldUseDecoder()) {
        if (when >= currentTime && offset < duration) {
            sourceNode.loop = false;
            sourceNode.start(when, offset, duration);
            if (loop && chunkEnd > loopStart) {
                sourceNode.onended = () => {
                    this._createSourceNode(index);
                    this._startSourceNode(index);
                };
            }
        }
    } else {
        if (when >= currentTime && offset < sourceNode.buffer.duration) {
            sourceNode.start(when, offset);
        }
    }
    chunkStart += sourceNode.buffer.duration;
};

WebAudio.prototype._stopSourceNode = function() {
    for (const sourceNode of this._sourceNodes) {
        try {
            sourceNode.onended = null;
            sourceNode.stop();
        } catch (e) {
            // Ignore InvalidStateError
        }
    }
};

WebAudio.prototype._createPannerNode = function() {
    this._pannerNode = WebAudio._context.createPanner();
    this._pannerNode.panningModel = "equalpower";
    this._pannerNode.connect(WebAudio._masterGainNode);
    this._updatePanner();
};

WebAudio.prototype._createGainNode = function() {
    const currentTime = WebAudio._currentTime();
    this._gainNode = WebAudio._context.createGain();
    this._gainNode.gain.setValueAtTime(this._volume, currentTime);
    this._gainNode.connect(this._pannerNode);
};

WebAudio.prototype._createAllSourceNodes = function() {
    for (let i = 0; i < this._buffers.length; i++) {
        this._createSourceNode(i);
    }
};

WebAudio.prototype._createSourceNode = function(index) {
    const sourceNode = WebAudio._context.createBufferSource();
    const currentTime = WebAudio._currentTime();
    sourceNode.buffer = this._buffers[index];
    sourceNode.loop = this._loop && this._isLoaded;
    sourceNode.loopStart = this._loopStartTime;
    sourceNode.loopEnd = this._loopStartTime + this._loopLengthTime;
    sourceNode.playbackRate.setValueAtTime(this._pitch, currentTime);
    sourceNode.connect(this._gainNode);
    this._sourceNodes[index] = sourceNode;
};

WebAudio.prototype._removeNodes = function() {
    if (this._sourceNodes && this._sourceNodes.length > 0) {
        this._stopSourceNode();
        this._sourceNodes = [];
        this._gainNode = null;
        this._pannerNode = null;
    }
};

WebAudio.prototype._createEndTimer = function() {
    if (this._sourceNodes.length > 0 && !this._loop) {
        const endTime = this._startTime + this._totalTime / this._pitch;
        const delay = endTime - WebAudio._currentTime();
        this._endTimer = setTimeout(this.stop.bind(this), delay * 1000);
    }
};

WebAudio.prototype._removeEndTimer = function() {
    if (this._endTimer) {
        clearTimeout(this._endTimer);
        this._endTimer = null;
    }
};

WebAudio.prototype._updatePanner = function() {
    if (this._pannerNode) {
        const x = this._pan;
        const z = 1 - Math.abs(x);
        this._pannerNode.setPosition(x, 0, z);
    }
};

WebAudio.prototype._onLoad = function() {
    while (this._loadListeners.length > 0) {
        const listner = this._loadListeners.shift();
        listner();
    }
};

WebAudio.prototype._readLoopComments = function(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    let index = 0;
    while (index < view.byteLength - 30) {
        if (this._readFourCharacters(view, index) !== "OggS") {
            break;
        }
        index += 26;
        const numSegments = view.getUint8(index++);
        const segments = [];
        for (let i = 0; i < numSegments; i++) {
            segments.push(view.getUint8(index++));
        }
        const packets = [];
        while (segments.length > 0) {
            let packetSize = 0;
            while (segments[0] === 255) {
                packetSize += segments.shift();
            }
            if (segments.length > 0) {
                packetSize += segments.shift();
            }
            packets.push(packetSize);
        }
        let vorbisHeaderFound = false;
        for (const size of packets) {
            if (this._readFourCharacters(view, index + 1) === "vorb") {
                const headerType = view.getUint8(index);
                if (headerType === 1) {
                    this._sampleRate = view.getUint32(index + 12, true);
                } else if (headerType === 3) {
                    this._readMetaData(view, index, size);
                }
                vorbisHeaderFound = true;
            }
            index += size;
        }
        if (!vorbisHeaderFound) {
            break;
        }
    }
};

WebAudio.prototype._readMetaData = function(view, index, size) {
    for (let i = index; i < index + size - 10; i++) {
        if (this._readFourCharacters(view, i) === "LOOP") {
            let text = "";
            while (view.getUint8(i) > 0) {
                text += String.fromCharCode(view.getUint8(i++));
            }
            if (text.match(/LOOPSTART=([0-9]+)/)) {
                this._loopStart = parseInt(RegExp.$1);
            }
            if (text.match(/LOOPLENGTH=([0-9]+)/)) {
                this._loopLength = parseInt(RegExp.$1);
            }
            if (text === "LOOPSTART" || text === "LOOPLENGTH") {
                let text2 = "";
                i += 16;
                while (view.getUint8(i) > 0) {
                    text2 += String.fromCharCode(view.getUint8(i++));
                }
                if (text === "LOOPSTART") {
                    this._loopStart = parseInt(text2);
                } else {
                    this._loopLength = parseInt(text2);
                }
            }
        }
    }
};

WebAudio.prototype._readFourCharacters = function(view, index) {
    let string = "";
    if (index <= view.byteLength - 4) {
        for (let i = 0; i < 4; i++) {
            string += String.fromCharCode(view.getUint8(index + i));
        }
    }
    return string;
};

