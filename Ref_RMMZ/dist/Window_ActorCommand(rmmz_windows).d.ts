declare function Window_ActorCommand(...args: any[]): void;
declare class Window_ActorCommand {
    constructor(...args: any[]);
    constructor: typeof Window_ActorCommand;
    initialize(rect: any): void;
    openness: number;
    _actor: any;
    makeCommandList(): void;
    addAttackCommand(): void;
    addSkillCommands(): void;
    addGuardCommand(): void;
    addItemCommand(): void;
    setup(actor: any): void;
    actor(): any;
    processOk(): void;
    selectLast(): void;
}
