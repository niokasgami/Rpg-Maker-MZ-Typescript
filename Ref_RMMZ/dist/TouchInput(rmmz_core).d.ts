/**
 * The static class that handles input data from the mouse and touchscreen.
 *
 * @namespace
 */
declare function TouchInput(): void;
declare namespace TouchInput {
    function initialize(): void;
    const keyRepeatWait: number;
    const keyRepeatInterval: number;
    const moveThreshold: number;
    function clear(): void;
    function update(): void;
    function isClicked(): boolean;
    function isPressed(): boolean;
    function isTriggered(): boolean;
    function isRepeated(): boolean;
    function isLongPressed(): boolean;
    function isCancelled(): boolean;
    function isMoved(): boolean;
    function isHovered(): boolean;
    function isReleased(): boolean;
    const wheelX: any;
    const wheelY: any;
    const x: any;
    const y: any;
    const date: any;
    function _createNewState(): {
        triggered: boolean;
        cancelled: boolean;
        moved: boolean;
        hovered: boolean;
        released: boolean;
        wheelX: number;
        wheelY: number;
    };
    function _setupEventHandlers(): void;
    function _onMouseDown(event: any): void;
    function _onLeftButtonDown(event: any): void;
    function _onMiddleButtonDown(): void;
    function _onRightButtonDown(event: any): void;
    function _onMouseMove(event: any): void;
    function _onMouseUp(event: any): void;
    function _onWheel(event: any): void;
    function _onTouchStart(event: any): void;
    function _onTouchMove(event: any): void;
    function _onTouchEnd(event: any): void;
    function _onTouchCancel(): void;
    function _onLostFocus(): void;
    function _onTrigger(x: any, y: any): void;
    function _onCancel(x: any, y: any): void;
    function _onMove(x: any, y: any): void;
    function _onHover(x: any, y: any): void;
    function _onRelease(x: any, y: any): void;
}
