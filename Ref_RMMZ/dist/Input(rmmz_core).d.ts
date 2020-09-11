/**
 * The static class that handles input data from the keyboard and gamepads.
 *
 * @namespace
 */
declare function Input(): void;
declare namespace Input {
    function initialize(): void;
    const keyRepeatWait: number;
    const keyRepeatInterval: number;
    const keyMapper: any;
    const gamepadMapper: any;
    function clear(): void;
    function update(): void;
    function isPressed(keyName: string): boolean;
    function isTriggered(keyName: string): boolean;
    function isRepeated(keyName: string): boolean;
    function isLongPressed(keyName: string): boolean;
    const dir4: any;
    const dir8: any;
    const date: any;
    function virtualClick(buttonName: any): void;
    function _setupEventHandlers(): void;
    function _onKeyDown(event: any): void;
    function _shouldPreventDefault(keyCode: any): boolean;
    function _onKeyUp(event: any): void;
    function _onLostFocus(): void;
    function _pollGamepads(): void;
    function _updateGamepadState(gamepad: any): void;
    function _updateDirection(): void;
    function _signX(): number;
    function _signY(): number;
    function _makeNumpadDirection(x: any, y: any): any;
    function _isEscapeCompatible(keyName: any): boolean;
}
