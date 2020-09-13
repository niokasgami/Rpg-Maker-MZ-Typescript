declare namespace TouchInput {

    export const date: Date;

    export const wheelX: number;
    export const wheelY: number;

    export const inputX: number;
    export const inputY: number;

    export let keyRepeatInterval: number;
    export let keyRepeatWait: number;

    export let moveThreshold: number;

    export function initialize(): void;

    export function clear(): void;
    
    export function update(): void;

    export function isCancelled(): boolean;
    export function isClicked(): boolean;
    export function isHovered(): boolean;
    export function isLongPressed(): boolean;
    export function isMoved(): boolean;
    export function isPressed(): boolean;
    export function isReleased(): boolean;
    export function isRepeated(): boolean;
    export function isTriggered(): boolean;

}

export { TouchInput };