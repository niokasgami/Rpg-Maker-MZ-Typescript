import { RPG } from "../RPG";

declare namespace Game_Interpreter {

    export interface Command {
        code: number;
        parameters: any[];
        indent: number;
    }

}

declare class Game_Interpreter {

    constructor(depth: number);
    
    public checkOverflow(): void;
    public clear(): void;
    public setup(list: Game_Interpreter.Command[], eventId: number): void;
    public loadImages(): void;
    public eventId(): number;
    public isOnCurrentMap(): boolean;
    public setupReservedCommonEvent(): boolean;
    public isRunning(): boolean;
    public update(): void;
    public updateChild(): boolean;
    public updateWait(): boolean;
    public updateWaitCount(): boolean;
    public updateWaitMode(): boolean;
    public setWaitMode(waitMode: string): void;
    public wait(duration: number): void;
    public fadeSpeed(): number;
    public executeCommand(): boolean;
    public checkFreeze(): boolean;
    public terminate(): void;
    public skipBranch(): void;
    public currentCommand(): Game_Interpreter.Command;
    public nextEventCode(): number;
    public iterateActorId(param: number, callback: (actor: Game_Actor) => void): void;
    public iterateActorEx(param1: number, param2: number, callback: (actor: Game_Actor) => void): void;
    public iterateActorIndex(param: number, callback: (actor: Game_Actor) => void): void;
    public iterateEnemyIndex(param: number, callback: (enemy: Game_Enemy) => void): void;
    public iterateBattler(param1: number, param2: number, callback: (battler: Game_Battler) => void): void;
    public character(param: number): Game_Character?;
    public operateValue(operation: number, operandType: number, operand: number): number;
    public changeHp(target: Game_Battler, value: number, allowDeath: boolean): void;
    public command101(params: any[]): boolean;
    public command102(params: any[]): boolean;
  
    public setupChoices(params): void;

    public command402(params: any[]): boolean;
    public command403(): boolean;

    public command103(params: any[]): boolean;

    public setupNumInput(params: any[]): void;

    public command104(params: any[]): boolean;

    public setupItemChoice(params: any[]): void;

    public command105(params: any[]): boolean;
    public command108(params: any[]): boolean;
    public command111(params: any[]): boolean;

    public command411(params: any[]): boolean;

    public command112(): boolean;

    public command413(): boolean;

    public command113(): boolean;
    public command115(): boolean;
    public command117(params: any[]): boolean;

    public setupChild(list: Game_Interpreter.Command[], eventId: number): void;

    public command118(): boolean;
    public command119(params: any[]): boolean;

    public jumpTo(index: number): void;

    public command121(params: any[]): boolean;
    public command122(params: any[]): boolean;

    public gameDataOperand(type: number, param1: number, param2: number): number;
    public operateVariable(variableId: number, operationType: number, value: number): void;

    public command123(params: any[]): boolean;
    public command124(params: any[]): boolean;
    public command125(params: any[]): boolean;
    public command126(params: any[]): boolean;
    public command127(params: any[]): boolean;
    public command128(params: any[]): boolean;
    public command129(params: any[]): boolean;
    public command132(params: any[]): boolean;
    public command133(params: any[]): boolean;
    public command134(params: any[]): boolean;
    public command135(params: any[]): boolean;
    public command136(params: any[]): boolean;
    public command137(params: any[]): boolean;
    public command138(params: any[]): boolean;
    public command139(params: any[]): boolean;
    public command140(params: any[]): boolean;

    public command201(params: any[]): boolean;
    public command202(params: any[]): boolean;
    public command203(params: any[]): boolean;
    public command204(params: any[]): boolean;
    public command205(params: any[]): boolean;
    public command206(): boolean;
    public command211(params: any[]): boolean;
    public command212(params: any[]): boolean;
    public command213(params: any[]): boolean;
    public command214(): boolean;
    public command216(params: any[]): boolean;
    public command217(): boolean;
    public command221(): boolean;
    public command222(): boolean;
    public command223(params: any[]): boolean;
    public command224(params: any[]): boolean;
    public command225(params: any[]): boolean;
    public command230(params: any[]): boolean;
    public command231(params: any[]): boolean;
    public command232(params: any[]): boolean;

    public picturePoint(params: any[]): Point;

    public command233(params: any[]): boolean;
    public command234(params: any[]): boolean;
    public command235(params: any[]): boolean;
    public command236(params: any[]): boolean;
    public command241(params: any[]): boolean;
    public command242(params: any[]): boolean;
    public command243(): boolean;
    public command244(): boolean;
    public command245(params: any[]): boolean;
    public command246(params: any[]): boolean;
    public command249(params: any[]): boolean;
    public command250(params: any[]): boolean;
    public command251(): boolean;
    public command261(params: any[]): boolean;

    public videoFileExt(): string;

    public command281(params: any[]): boolean;
    public command282(params: any[]): boolean;
    public command283(params: any[]): boolean;
    public command284(params: any[]): boolean;
    public command285(params: any[]): boolean;

    public command301(params: any[]): boolean;

    public command601(): boolean;
    public command602(): boolean;
    public command603(): boolean;

    public command302(params: any[]): boolean;
    public command303(params: any[]): boolean;
    public command311(params: any[]): boolean;
    public command312(params: any[]): boolean;
    public command326(params: any[]): boolean;
    public command313(params: any[]): boolean;
    public command314(params: any[]): boolean;
    public command315(params: any[]): boolean;
    public command316(params: any[]): boolean;
    public command317(params: any[]): boolean;
    public command318(params: any[]): boolean;
    public command319(params: any[]): boolean;
    public command320(params: any[]): boolean;
    public command321(params: any[]): boolean;
    public command322(params: any[]): boolean;
    public command323(params: any[]): boolean;
    public command324(params: any[]): boolean;
    public command325(params: any[]): boolean;
    public command331(params: any[]): boolean;
    public command332(params: any[]): boolean;
    public command342(params: any[]): boolean;
    public command333(params: any[]): boolean;
    public command334(params: any[]): boolean;
    public command335(params: any[]): boolean;
    public command336(params: any[]): boolean;
    public command337(params: any[]): boolean;
    public command339(params: any[]): boolean;
    public command340(): boolean;
    public command351(): boolean;
    public command352(): boolean;
    public command353(): boolean;
    public command354(): boolean;
    public command355(): boolean;
    public command356(params: any[]): boolean;

    public pluginCommand(): void;

    public command357(params: any[]): boolean;

}

export { Game_Interpreter };
