import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";

/**
 * Window_ShopNumber
 * 
 * The window for inputting quantity of items to buy or sell on the shop
 * screen.
 */
declare class Window_ShopNumber extends Window_Selectable {
    constructor(rect: Rectangle);
    public isScrollEnabled(): boolean;
    public number(): number;
    public setup(item: Record<string, any>, max: number, price: number): void;
    public setCurrencyUnit(currencyUnit: string): void;
    public createButtons(): void;
    public placeButtons(): void;
    public totalButtonWidth(): number;
    public buttonSpacing(): number;
    public refresh(): void;
    public drawCurrentItemName(): void;
    public drawMultiplicationSign(): void;
    public multiplicationSign(): string;
    public multiplicationSignX(): number;
    public drawNumber(): void;
    public drawHorzLine(): void;
    public drawTotalPrice(): void;
    public itemNameY(): number;
    public totalPriceY(): number;
    public buttonY(): number;
    public cursorWidth(): number;
    public cursorX(): number;
    public maxDigits(): number;
    public update(): void;
    public playOkSound(): void;
    public processNumberChange(): void;
    public changeNumber(amount: number): void;
    public itemRect(): Rectangle;
    public isTouchOkEnabled(): boolean;
    public onButtonUp(): void;
    public onButtonUp2(): void;
    public onButtonDown(): void;
    public onButtonDown2(): void;
    public onButtonOk(): void;
}

export { Window_ShopNumber }