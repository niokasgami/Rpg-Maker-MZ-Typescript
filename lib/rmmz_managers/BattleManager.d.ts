import { Game_Actor, Game_Action } from '../rmmz_objects';

import { Spriteset_Battle } from "../rmmz_sprites";

import { Window_BattleLog } from '../rmmz_windows';

declare namespace BattleManager {

    enum Result {
        Victory = 0,
        Abort = 1,
        Defeat = 2
    }

    export function setup(troopId: number, canEscape: boolean, canLose: boolean): void;
    export function initMembers(): void;
    export function isTpb(): boolean; 
    export function isActiveTpb(): boolean; 
    export function isBattleTest(): boolean;

    export function setBattleTest(battleTest: boolean): void;
    export function setEventCallback(callback: (result: BattleManager.Result) => void): void;
    export function setLogWindow(logWindow: Window_BattleLog): void;
    export function setSpriteset(spriteset: Spriteset_Battle): void;

    export function onEncounter(): void;

    export function ratePreemptive(): number;
    export function rateSurprise(): number;

    export function saveBgmAndBgs(): void;
    export function playBattleBgm(): void;
    export function playVictoryMe(): void;
    export function playDefeatMe(): void;
    export function replayBgmAndBgs(): void;

    export function makeEscapeRatio(): void;

    export function update(timeActive: number): void;

    export function updatePhase(timeActive: number): void;
    export function updateEvent(): void;
    export function updateEventMain(): boolean;

    export function isBusy(): boolean;

    export function updateTpbInput(): void;

    export function checkTpbInputClose(): void;
    export function checkTpbInputOpen(): void;

    export function isPartyTpbInputtable(): boolean;
    
    export function needsActorInputCancel(): boolean;

    export function isTpbMainPhase(): boolean;
    export function isInputting(): boolean;
    export function isInTurn(): boolean;

    export function isTurnEnd(): boolean;
    export function isAborting(): boolean;
    export function isBattleEnd(): boolean;

    export function canEscape(): boolean;
    export function canLose(): boolean;

    export function isEscaped(): boolean;

    export function actor(): Game_Actor;

    export function startBattle(): void;

    export function displayStartMessages(): void;

    export function startInput(): void;

    export function inputtingAction(): Game_Action;

    export function selectNextCommand(): void;

    export function selectNextActor(): void;
    export function selectPreviousCommand(): void;
    export function selectPreviousActor(): void;

    export function changeCurrentActor(forward: boolean): void;

    export function startActorInput(): void;

    export function finishActorInput(): void;
    export function cancelActorInput(): void;

    export function updateStart(): void;

    export function startTurn(): void;

    export function updateTurn(timeActive: boolean): void;
    export function updateTpb(): void;
    export function updateAllTpbBattlers(): void;
    export function updateTpbBattler(battler): void;

    export function checkTpbTurnEnd(): void;

    export function processTurn(): void;

    export function endBattlerActions(battler): void;

    export function endTurn(): void;

    export function endAllBattlersTurn(): void;

    export function displayBattlerStatus(battler: Game_Battler, current: boolean): void;

    export function updateTurnEnd(): void;

    export function getNextSubject(): Game_Battler | null;

    export function allBattleMembers(): Game_Battler[];

    export function makeActionOrders(): void;

    export function startAction(): void;
    export function updateAction(): void;
    export function endAction(): void;

    export function invokeAction(subject: Game_Battler, target: Game_Battler): void;
    export function invokeNormalAction(subject: Game_Battler, target: Game_Battler): void;
    export function invokeCounterAttack(subject: Game_Battler, target: Game_Battler): void;
    export function invokeMagicReflection(subject: Game_Battler, target: Game_Battler): void;

    export function applySubstitute(target: Game_Battler): Game_Battler;
    export function checkSubstitute(target: Game_Battler): boolean;

    export function isActionForced(): boolean;

    export function forceAction(battler: Game_Battler): void;

    export function processForcedAction(): void;

    export function abort(): void;

    export function checkBattleEnd(): boolean;
    export function checkAbort(): boolean;

    export function processVictory(): void;
    export function processEscape(): boolean;

    export function onEscapeSuccess(): void;
    export function onEscapeFailure(): void;

    export function processAbort(): void;
    export function processDefeat(): void;

    export function endBattle(result: BattleManager.Result): void;

    export function updateBattleEnd(): void;

    export function makeRewards(): void;

    export function displayVictoryMessage(): void;
    export function displayDefeatMessage(): void;
    export function displayEscapeSuccessMessage(): void;
    export function displayEscapeFailureMessage();
    export function displayRewards(): void;
    export function displayExp(): void;
    export function displayGold(): void;
    export function displayDropItems(): void;

    export function gainRewards(): void;
    export function gainExp(): void;
    export function gainGold(): void;
    export function gainDropItems(): void;

}

export { BattleManager };
