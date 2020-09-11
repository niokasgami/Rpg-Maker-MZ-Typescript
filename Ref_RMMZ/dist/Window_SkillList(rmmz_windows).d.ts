declare function Window_SkillList(...args: any[]): void;
declare class Window_SkillList {
    constructor(...args: any[]);
    constructor: typeof Window_SkillList;
    initialize(rect: any): void;
    _actor: any;
    _stypeId: any;
    _data: any;
    setActor(actor: any): void;
    setStypeId(stypeId: any): void;
    maxCols(): number;
    colSpacing(): number;
    maxItems(): any;
    item(): any;
    itemAt(index: any): any;
    isCurrentItemEnabled(): any;
    includes(item: any): boolean;
    isEnabled(item: any): any;
    makeItemList(): void;
    selectLast(): void;
    drawItem(index: any): void;
    costWidth(): any;
    drawSkillCost(skill: any, x: any, y: any, width: any): void;
    updateHelp(): void;
    refresh(): void;
}
