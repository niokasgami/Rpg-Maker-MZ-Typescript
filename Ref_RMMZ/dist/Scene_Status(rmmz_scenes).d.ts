declare function Scene_Status(...args: any[]): void;
declare class Scene_Status {
    constructor(...args: any[]);
    constructor: typeof Scene_Status;
    initialize(): void;
    create(): void;
    helpAreaHeight(): number;
    createProfileWindow(): void;
    _profileWindow: Window_Help;
    profileWindowRect(): Rectangle;
    createStatusWindow(): void;
    _statusWindow: Window_Status;
    statusWindowRect(): Rectangle;
    createStatusParamsWindow(): void;
    _statusParamsWindow: Window_StatusParams;
    statusParamsWindowRect(): Rectangle;
    createStatusEquipWindow(): void;
    _statusEquipWindow: Window_StatusEquip;
    statusEquipWindowRect(): Rectangle;
    statusParamsWidth(): number;
    statusParamsHeight(): any;
    profileHeight(): any;
    start(): void;
    needsPageButtons(): boolean;
    refreshActor(): void;
    onActorChange(): void;
}
