declare function Window_BattleEnemy(...args: any[]): void;
declare class Window_BattleEnemy {
    constructor(...args: any[]);
    constructor: typeof Window_BattleEnemy;
    initialize(rect: any): void;
    _enemies: any;
    maxCols(): number;
    maxItems(): any;
    enemy(): any;
    enemyIndex(): any;
    drawItem(index: any): void;
    show(): void;
    hide(): void;
    refresh(): void;
    select(index: any): void;
    processTouch(): void;
}
