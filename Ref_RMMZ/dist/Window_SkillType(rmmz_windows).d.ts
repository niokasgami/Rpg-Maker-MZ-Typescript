declare function Window_SkillType(...args: any[]): void;
declare class Window_SkillType {
    constructor(...args: any[]);
    constructor: typeof Window_SkillType;
    initialize(rect: any): void;
    _actor: any;
    setActor(actor: any): void;
    makeCommandList(): void;
    update(): void;
    setSkillWindow(skillWindow: any): void;
    _skillWindow: any;
    selectLast(): void;
}
