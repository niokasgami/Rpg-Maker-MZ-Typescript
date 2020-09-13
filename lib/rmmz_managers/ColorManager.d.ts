declare namespace ColorManager {

    export function loadWindowskin(): void;
    export function textColor(n: number): string;

    export function normalColor(): string;
    export function systemColor(): string;
    export function crisisColor(): string;
    export function deathColor(): string;
    export function gaugeBackColor(): string;
    export function hpGaugeColor1(): string;
    export function hpGaugeColor2(): string;
    export function mpGaugeColor1(): string;
    export function mpGaugeColor2(): string;
    export function mpCostColor(): string;
    export function powerUpColor(): string;
    export function powerDownColor(): string;
    export function ctGaugeColor1(): string;
    export function ctGaugeColor1(): string;
    export function tpGaugeColor1(): string;
    export function tpGaugeColor2(): string;
    export function tpCostColor(): string;
    export function pendingColor(): string;
    export function hpColor(actor: Game_Actor): string;
    export function mpColor(): string;
    export function tpColor(): string;
    export function paramchangeTextColor(change: number): string;
    export function damageColor(colorType: number): string;
    export function outlineColor(): string;
    export function dimColor1(): string;
    export function dimColor2(): string;
    export function itemBackColor1(): string;
    export function itemBackColor2(): string;

}

export { ColorManager };
