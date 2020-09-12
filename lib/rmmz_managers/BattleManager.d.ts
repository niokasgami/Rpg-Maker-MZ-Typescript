import { CurrentAudio } from "./AudioManager";

import { Game_Actor } from '../rmmz_objects/Game_Actor';
import { Game_Action } from '../rmmz_objects/Game_Action';

import { Spriteset_Battle } from "../rmmz_sprites/Spriteset_Battle";

import { Window_BattleLog } from '../rmmz_windows/Window_BattleLog';

declare class BattleManager {

    private static _phase: string;
    private static _inputting: boolean;
    private static _canEscape: boolean;
    private static _canLose: boolean;
    private static _battleTest: boolean;
    private static _eventCallback: boolean;
    private static _preemptive: boolean;
    private static _surprise: boolean;
    private static _currentActor: Game_Actor;
    private static _actionForceBattler: Game_Action;
    private static _mapBgm: CurrentAudio;
    private static _mapBgs: CurrentAudio;

    private static _actionBattlers: Game_Battler[];

    private static _subject: Game_Battler;
    private static _action: Game_Action;

    private static _targets: Game_Battler[];
    private static _logWindow: Window_BattleLog;
    
    private static _spriteset: Spriteset_Battle;
    private static _escapeRatio: number;
    private static _escaped: boolean;
    private static _rewards: Record<string, unknown>;
    private static _tpbNeedsPartyCommand: boolean;

}