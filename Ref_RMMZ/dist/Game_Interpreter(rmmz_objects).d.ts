declare function Game_Interpreter(...args: any[]): void;
declare class Game_Interpreter {
    constructor(...args: any[]);
    initialize(depth: any): void;
    _depth: any;
    _branch: {};
    _indent: any;
    _frameCount: any;
    _freezeChecker: number;
    checkOverflow(): void;
    clear(): void;
    _mapId: any;
    _eventId: any;
    _list: any;
    _index: any;
    _waitCount: any;
    _waitMode: any;
    _comments: string | any[];
    _characterId: any;
    _childInterpreter: Game_Interpreter;
    setup(list: any, eventId: any): void;
    loadImages(): void;
    eventId(): any;
    isOnCurrentMap(): boolean;
    setupReservedCommonEvent(): boolean;
    isRunning(): boolean;
    update(): void;
    updateChild(): boolean;
    updateWait(): boolean;
    updateWaitCount(): boolean;
    updateWaitMode(): boolean;
    setWaitMode(waitMode: any): void;
    wait(duration: any): void;
    fadeSpeed(): number;
    executeCommand(): boolean;
    checkFreeze(): boolean;
    terminate(): void;
    skipBranch(): void;
    currentCommand(): any;
    nextEventCode(): any;
    iterateActorId(param: any, callback: any): void;
    iterateActorEx(param1: any, param2: any, callback: any): void;
    iterateActorIndex(param: any, callback: any): void;
    iterateEnemyIndex(param: any, callback: any): void;
    iterateBattler(param1: any, param2: any, callback: any): void;
    character(param: any): any;
    operateValue(operation: any, operandType: any, operand: any): any;
    changeHp(target: any, value: any, allowDeath: any): void;
    command101(params: any): boolean;
    command102(params: any): boolean;
    setupChoices(params: any): void;
    command402(params: any): boolean;
    command403(): boolean;
    command103(params: any): boolean;
    setupNumInput(params: any): void;
    command104(params: any): boolean;
    setupItemChoice(params: any): void;
    command105(params: any): boolean;
    command108(params: any): boolean;
    command111(params: any): boolean;
    command411(): boolean;
    command112(): boolean;
    command413(): boolean;
    command113(): boolean;
    command115(): boolean;
    command117(params: any): boolean;
    setupChild(list: any, eventId: any): void;
    command118(): boolean;
    command119(params: any): boolean;
    jumpTo(index: any): void;
    command121(params: any): boolean;
    command122(params: any): boolean;
    gameDataOperand(type: any, param1: any, param2: any): any;
    operateVariable(variableId: any, operationType: any, value: any): void;
    command123(params: any): boolean;
    command124(params: any): boolean;
    command125(params: any): boolean;
    command126(params: any): boolean;
    command127(params: any): boolean;
    command128(params: any): boolean;
    command129(params: any): boolean;
    command132(params: any): boolean;
    command133(params: any): boolean;
    command134(params: any): boolean;
    command135(params: any): boolean;
    command136(params: any): boolean;
    command137(params: any): boolean;
    command138(params: any): boolean;
    command139(params: any): boolean;
    command140(params: any): boolean;
    command201(params: any): boolean;
    command202(params: any): boolean;
    command203(params: any): boolean;
    command204(params: any): boolean;
    command205(params: any): boolean;
    command206(): boolean;
    command211(params: any): boolean;
    command212(params: any): boolean;
    command213(params: any): boolean;
    command214(): boolean;
    command216(params: any): boolean;
    command217(): boolean;
    command221(): boolean;
    command222(): boolean;
    command223(params: any): boolean;
    command224(params: any): boolean;
    command225(params: any): boolean;
    command230(params: any): boolean;
    command231(params: any): boolean;
    command232(params: any): boolean;
    picturePoint(params: any): Point;
    command233(params: any): boolean;
    command234(params: any): boolean;
    command235(params: any): boolean;
    command236(params: any): boolean;
    command241(params: any): boolean;
    command242(params: any): boolean;
    command243(): boolean;
    command244(): boolean;
    command245(params: any): boolean;
    command246(params: any): boolean;
    command249(params: any): boolean;
    command250(params: any): boolean;
    command251(): boolean;
    command261(params: any): boolean;
    videoFileExt(): ".webm" | ".mp4";
    command281(params: any): boolean;
    command282(params: any): boolean;
    command283(params: any): boolean;
    command284(params: any): boolean;
    command285(params: any): boolean;
    command301(params: any): boolean;
    command601(): boolean;
    command602(): boolean;
    command603(): boolean;
    command302(params: any): boolean;
    command303(params: any): boolean;
    command311(params: any): boolean;
    command312(params: any): boolean;
    command326(params: any): boolean;
    command313(params: any): boolean;
    command314(params: any): boolean;
    command315(params: any): boolean;
    command316(params: any): boolean;
    command317(params: any): boolean;
    command318(params: any): boolean;
    command319(params: any): boolean;
    command320(params: any): boolean;
    command321(params: any): boolean;
    command322(params: any): boolean;
    command323(params: any): boolean;
    command324(params: any): boolean;
    command325(params: any): boolean;
    command331(params: any): boolean;
    command332(params: any): boolean;
    command342(params: any): boolean;
    command333(params: any): boolean;
    command334(params: any): boolean;
    command335(params: any): boolean;
    command336(params: any): boolean;
    command337(params: any): boolean;
    command339(params: any): boolean;
    command340(): boolean;
    command351(): boolean;
    command352(): boolean;
    command353(): boolean;
    command354(): boolean;
    command355(): boolean;
    command356(params: any): boolean;
    pluginCommand(): void;
    command357(params: any): boolean;
}