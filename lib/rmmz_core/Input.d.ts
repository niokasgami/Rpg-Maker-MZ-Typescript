import { RPG } from "./RPG";

declare namespace Input {

    export const date: number;
    export const dir4: number;
    export const dir8: number;
    
    export let gamepadMapper: RPG.InputGamepad;
    export let keyMapper: RPG.InputKey;
    export let keyRepeatInterval: number;
    export let keyRepeatWait: number;

    export function clear(): void;
    export function initialize(): void;
    export function isLongPressed(keyname: string): boolean;
    export function isPressed(keyName: string): boolean;
    export function isRepeated(keyName: string): boolean;
    export function isTriggered(keyName: string): boolean;
    export function update(): void;

}

export { Input };
