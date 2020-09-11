declare function Window_StatusBase(...args: any[]): void;
declare class Window_StatusBase {
    constructor(...args: any[]);
    constructor: typeof Window_StatusBase;
    initialize(rect: any): void;
    _additionalSprites: {};
    loadFaceImages(): void;
    refresh(): void;
    hideAdditionalSprites(): void;
    placeActorName(actor: any, x: any, y: any): void;
    placeStateIcon(actor: any, x: any, y: any): void;
    placeGauge(actor: any, type: any, x: any, y: any): void;
    createInnerSprite(key: any, spriteClass: any): any;
    placeTimeGauge(actor: any, x: any, y: any): void;
    placeBasicGauges(actor: any, x: any, y: any): void;
    gaugeLineHeight(): number;
    drawActorCharacter(actor: any, x: any, y: any): void;
    drawActorFace(actor: any, x: any, y: any, width: any, height: any): void;
    drawActorName(actor: any, x: any, y: any, width: any): void;
    drawActorClass(actor: any, x: any, y: any, width: any): void;
    drawActorNickname(actor: any, x: any, y: any, width: any): void;
    drawActorLevel(actor: any, x: any, y: any): void;
    drawActorIcons(actor: any, x: any, y: any, width: any): void;
    drawActorSimpleStatus(actor: any, x: any, y: any): void;
    actorSlotName(actor: any, index: any): any;
}
