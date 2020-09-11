/**
 * The audio object of Web Audio API.
 *
 * @class
 * @param {string} url - The url of the audio file.
 */
declare function WebAudio(...args: any[]): void;
declare class WebAudio {
    /**
     * The audio object of Web Audio API.
     *
     * @class
     * @param {string} url - The url of the audio file.
     */
    constructor(...args: any[]);
    initialize(url: any): void;
    _url: any;
    clear(): void;
    _data: any;
    _fetchedSize: number;
    _fetchedData: any[];
    _buffers: any[];
    _sourceNodes: any[];
    _gainNode: any;
    _pannerNode: any;
    _totalTime: number;
    _sampleRate: number;
    _loop: number | boolean;
    _loopStart: number;
    _loopLength: number;
    _loopStartTime: number;
    _loopLengthTime: number;
    _startTime: number;
    _volume: number;
    _pitch: number;
    _pan: number;
    _endTimer: NodeJS.Timeout;
    _loadListeners: any[];
    _stopListeners: any[];
    _lastUpdateTime: any;
    _isLoaded: boolean;
    _isError: boolean;
    _isPlaying: boolean;
    _decoder: any;
    get url(): any;
    set volume(arg: number);
    get volume(): number;
    set pitch(arg: number);
    get pitch(): number;
    set pan(arg: number);
    get pan(): number;
    isReady(): boolean;
    isError(): boolean;
    isPlaying(): boolean;
    play(loop: boolean, offset: number): void;
    stop(): void;
    destroy(): void;
    fadeIn(duration: number): void;
    fadeOut(duration: number): void;
    seek(): number;
    addLoadListener(listner: Function): void;
    addStopListener(listner: Function): void;
    retry(): void;
    _startLoading(): void;
    _shouldUseDecoder(): boolean;
    _createDecoder(): void;
    _destroyDecoder(): void;
    _realUrl(): string;
    _startXhrLoading(url: any): void;
    _startFetching(url: any): void;
    _onXhrLoad(xhr: any): void;
    _onFetch(response: any): void;
    _onError(): void;
    _onFetchProcess(value: any): void;
    _updateBufferOnFetch(): void;
    _concatenateFetchedData(): void;
    _updateBuffer(): void;
    _readableBuffer(): any;
    _decodeAudioData(arrayBuffer: any): void;
    _onDecode(buffer: any): void;
    _refreshSourceNode(): void;
    _startPlaying(offset: any): void;
    _startAllSourceNodes(): void;
    _startSourceNode(index: any): void;
    _stopSourceNode(): void;
    _createPannerNode(): void;
    _createGainNode(): void;
    _createAllSourceNodes(): void;
    _createSourceNode(index: any): void;
    _removeNodes(): void;
    _createEndTimer(): void;
    _removeEndTimer(): void;
    _updatePanner(): void;
    _onLoad(): void;
    _readLoopComments(arrayBuffer: any): void;
    _readMetaData(view: any, index: any, size: any): void;
    _readFourCharacters(view: any, index: any): string;
}
declare namespace WebAudio {
    function initialize(): boolean;
    function setMasterVolume(value: number): void;
    function _createContext(): void;
    function _currentTime(): any;
    function _createMasterGainNode(): void;
    function _setupEventHandlers(): void;
    function _onUserGesture(): void;
    function _onVisibilityChange(): void;
    function _onHide(): void;
    function _onShow(): void;
    function _shouldMuteOnHide(): boolean;
    function _resetVolume(): void;
    function _fadeIn(duration: any): void;
    function _fadeOut(duration: any): void;
}
