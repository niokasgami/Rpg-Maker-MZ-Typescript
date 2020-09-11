declare function Scene_ItemBase(...args: any[]): void;
declare class Scene_ItemBase {
    constructor(...args: any[]);
    constructor: typeof Scene_ItemBase;
    initialize(): void;
    create(): void;
    createActorWindow(): void;
    _actorWindow: Window_MenuActor;
    actorWindowRect(): Rectangle;
    item(): any;
    user(): any;
    isCursorLeft(): boolean;
    showActorWindow(): void;
    hideActorWindow(): void;
    isActorWindowActive(): any;
    onActorOk(): void;
    onActorCancel(): void;
    determineItem(): void;
    useItem(): void;
    activateItemWindow(): void;
    itemTargetActors(): any;
    canUse(): any;
    isItemEffectsValid(): any;
    applyItem(): void;
    checkCommonEvent(): void;
}
