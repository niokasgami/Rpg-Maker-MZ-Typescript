import { Window_Selectable } from "./Window_Selectable";
import { Rectangle } from "../rmmz_core/Rectangle";
import { Game_Actor } from "../rmmz_core/Game_Actor";

/**
 * Window_StatusBase
 * 
 * The superclass of windows for displaying actor status.
 */
declare class Window_StatusBase extends Window_Selectable {
    constructor(rect: Rectangle);

    public loadFaceImages(): void;
    public refresh(): void;
    public hideAdditionalSprites(): void;
    public placeActorName(actor: Game_Actor, x: number, y: number): void;
    public placeStateIcon(actor: Game_Actor, x: number, y: number): void;
    public placeGauge(actor: Game_Actor, type: string, x: number, y: number): void;

    // This method will usually return an object created with 'new spriteClass()',
    // but will return an existing Sprite if it finds one, which can be any kind of 'Sprite'
    public createInnerSprite(key: string, spriteClass: new() => Sprite): Sprite;

    public placeTimeGauge(actor: Game_Actor, x: number, y: number): void;
    public placeBasicGauges(actor: Game_Actor, x: number, y: number): void;
    public gaugeLineHeight(): number;
    public drawActorCharacter(actor: Game_Actor, x: number, y: number): void;
    public drawActorFace(actor: Game_Actor, x: number, y: number, width: number, height: number): void;
    public drawActorName(actor: Game_Actor, x: number, y: number, width: number): void;
    public drawActorClass(actor: Game_Actor, x: number, y: number, width: number): void;
    public drawActorNickname(actor: Game_Actor, x: number, y: number, width: number): void;
    public drawActorLevel(actor: Game_Actor, x: number, y: number): void;
    public drawActorIcons(actor: Game_Actor, x: number, y: number, width: number): void;
    public drawActorSimpleStatus(actor: Game_Actor, x: number, y: number): void;
    public actorSlotName(actor: Game_Actor, index: number): string;
}

export { Window_StatusBase }