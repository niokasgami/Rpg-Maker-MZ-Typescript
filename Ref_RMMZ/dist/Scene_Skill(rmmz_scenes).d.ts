declare function Scene_Skill(...args: any[]): void;
declare class Scene_Skill {
    constructor(...args: any[]);
    constructor: typeof Scene_Skill;
    initialize(): void;
    create(): void;
    start(): void;
    createSkillTypeWindow(): void;
    _skillTypeWindow: Window_SkillType;
    skillTypeWindowRect(): Rectangle;
    createStatusWindow(): void;
    _statusWindow: Window_SkillStatus;
    statusWindowRect(): Rectangle;
    createItemWindow(): void;
    _itemWindow: Window_SkillList;
    itemWindowRect(): Rectangle;
    needsPageButtons(): boolean;
    arePageButtonsEnabled(): boolean;
    refreshActor(): void;
    user(): any;
    commandSkill(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    useItem(): void;
    onActorChange(): void;
}
