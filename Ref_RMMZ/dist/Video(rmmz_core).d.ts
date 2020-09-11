/**
 * The static class that handles video playback.
 *
 * @namespace
 */
declare function Video(): void;
declare namespace Video {
    function initialize(width: number, height: number): void;
    function resize(width: number, height: number): void;
    function play(src: string): void;
    function isPlaying(): boolean;
    function setVolume(volume: number): void;
    function _createElement(): void;
    function _onLoad(): void;
    function _onError(): never;
    function _onEnd(): void;
    function _updateVisibility(videoVisible: any): void;
    function _isVisible(): boolean;
    function _setupEventHandlers(): void;
    function _onUserGesture(): void;
}
