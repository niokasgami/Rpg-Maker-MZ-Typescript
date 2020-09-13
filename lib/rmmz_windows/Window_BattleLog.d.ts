import { Rectangle } from "../rmmz_core";

import { Spriteset_Battle } from "../rmmz_sprites";

import {
    Game_Battler,
    Game_Action,
    Game_Actor,
    Game_Enemy,
    Game_BattlerBase
} from "../rmmz_objects";

import { Window_Base } from ".";

// TODO this class was very hard to determine types for, will need to look
// over it again very carfeully to be sure it is correct.
/**
 * Window_BattleLog
 * 
 * The window for displaying battle progress. No frame is displayed, but it is
 * handled as a window for convenience.
 */
declare class Window_BattleLog extends Window_Base {

    constructor(rect: Rectangle);

    public setSpriteset(spriteset: Spriteset_Battle): void;
    public maxLines(): number;
    public numLines(): number;
    public messageSpeed(): number;
    public isBusy(): boolean;
    
    public update(): void;
    public updateWait(): boolean;
    public updateWaitCount(): boolean;
    public updateWaitMode(): boolean;
    
    public setWaitMode(waitMode: string): void;
    public callNextMethod(): void;
    public isFastForward(): boolean;
    
    /**
     * Adds a method and any accompanying parameters to the list of methods that
     * need to be called. The method needs to be a member of this object, and the
     * parameters must be applicable to the method.
     * 
     * @param methodName The name of a method to call.
     * @param args The arguments to pass to the method, if any.
     */
    public push<K extends keyof this, F extends (...args: unknown[]) => unknown>(
        methodName: K,
        ...args: this[K] extends F ? Parameters<this[K]> : never
    ): this[K] extends F ? void : never;
   
    public clear(): void;
    
    public wait(): void;
    public waitForEffect(): void;
    public waitForMovement(): void;
    
    public addText(text: string): void;
    public pushBaseLine(): void;
    public popBaseLine(): void;
   
    public waitForNewLine(): void;
    
    public popupDamage(target: Game_Battler): void;
    
    public performActionStart(subject: Game_Battler, action: Game_Action): void;
    public performAction(subject: Game_Battler, action: Game_Action): void;
    public performActionEnd(subject: Game_Battler): void;
    public performDamage(target: Game_Battler): void;
    public performMiss(target: Game_Battler): void;
    public performRecovery(target: Game_Battler): void;
    public performEvasion(target: Game_Battler): void;
    public performMagicEvasion(target: Game_Battler): void;
    public performCounter(target: Game_Battler): void;
    public performReflection(target: Game_Battler): void;
    public performSubstitute(substitute: Game_Battler, target: Game_Battler): void;
    public performCollapse(target: Game_Battler): void;
    
    // TODO double check type of subject/targets for animation methods.
    public showAnimation(subject: Game_BattlerBase, targets: Game_BattlerBase[], animationId: number): void;
    public showAttackAnimation(subject: Game_BattlerBase, targets: Game_BattlerBase[]): void;
    public showActorAttackAnimation(subject: Game_Actor, targets: Game_BattlerBase[]): void;
    public showEnemyAttackAnimation(/* subject, targets */): void;
    public showNormalAnimation(targets: Game_BattlerBase[], animationId: number, mirror: boolean): void;
    
    public refresh(): void;
    
    public drawBackground(): void;
    public backRect(): Rectangle;
    public lineRect(index: number): Rectangle;
    public backColor(): string;
    public backPaintOpacity(): number;
    public drawLineText(index: number): void;
    public startTurn(): void;
    public startAction(subject: Game_Battler, action: Game_Action, targets: Game_BattlerBase[]): void;
    public endAction(subject: Game_Battler): void;
    
    // TODO it seems like subject should be Game_Battler (superclass of actor and enemy)
    // but subject must have the name() method, which is not defined in superclass.
    public displayCurrentState(subject: Game_Actor | Game_Enemy): void;
    public displayRegeneration(subject: Game_Battler): void;
    public displayAction(subject: Game_Actor | Game_Enemy, item: Record<string, any>): void;
    public displayItemMessage(fmt: string, subject: Game_Actor | Game_Enemy, item: Record<string, any>): void;
    public displayCounter(target: Game_Battler): void;
    public displayReflection(target: Game_Battler): void;
    public displaySubstitute(substitute: Game_Battler, target: Game_Battler): void;
    public displayActionResults(subject: Game_Battler, target: Game_BattlerBase): void;
    public displayFailure(target: Game_BattlerBase): void;
    public displayCritical(target: Game_BattlerBase): void;
    public displayDamage(target: Game_BattlerBase): void;
    public displayMiss(target: Game_BattlerBase): void;
    public displayEvasion(target: Game_BattlerBase): void;
    public displayHpDamage(target: Game_BattlerBase): void;
    public displayMpDamage(target: Game_BattlerBase): void;
    public displayTpDamage(target: Game_BattlerBase): void;
    public displayAffectedStatus(target: Game_BattlerBase): void;
    public displayAutoAffectedStatus(target: Game_BattlerBase): void;
    public displayChangedStates(target: Game_BattlerBase): void;
    public displayAddedStates(target: Game_BattlerBase): void;
    public displayRemovedStates(target: Game_BattlerBase): void;
    public displayChangedBuffs(target: Game_BattlerBase): void;
    public displayBuffs(target: Game_BattlerBase, buffs: number[], fmt: string): void;

    public makeHpDamageText(target: Game_Actor | Game_Enemy): string;
    public makeMpDamageText(target: Game_Actor | Game_Enemy): string;
    public makeTpDamageText(target: Game_Actor | Game_Enemy): string;
}

export { Window_BattleLog }
