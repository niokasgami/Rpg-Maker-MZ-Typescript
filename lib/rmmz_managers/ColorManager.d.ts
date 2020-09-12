import { Bitmap } from "../rmmz_core/Bitmap";


declare class ColorManager {

    private static _windowskin: Bitmap;

    public static loadWindowskin(): void;
    public static textColor(n: number): string;

    public static normalColor(): string;
    public static systemColor(): string;
    public static crisisColor(): string;
    public static deathColor(): string;
    public static gaugeBackColor(): string;
    public static hpGaugeColor1(): string;
    public static hpGaugeColor2(): string;
    public static mpGaugeColor1(): string;
    public static mpGaugeColor2(): string;
    public static mpCostColor(): string;
    public static powerUpColor(): string;
    public static powerDownColor(): string;
    public static ctGaugeColor1(): string;
    public static ctGaugeColor1(): string;
    public static tpGaugeColor1(): string;
    public static tpGaugeColor2(): string;
    public static tpCostColor(): string;
    public static pendingColor(): string;
    public static hpColor(actor: Game_Actor): string;
    public static mpColor(): string;
    public static tpColor(): string;
    public static paramchangeTextColor(change: number): string;
    public static damageColor(colorType: number): string;
    public static outlineColor(): string;
    public static dimColor1(): string;
    public static dimColor2(): string;
    public static itemBackColor1(): string;
    public static itemBackColor2(): string;
}

export { ColorManager }