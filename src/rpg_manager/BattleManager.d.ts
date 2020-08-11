import {CurrentAudio} from "./AudioManager";

declare class BattleManager {

    private static _phase: string;
    private static _inputting: boolean;
    private static _canEscape: boolean;
    private static _canLose: boolean;
    private static _battleTest: boolean;
    private static _eventCallback: boolean;
    private static _preemptive: boolean;
    private static _surprise: boolean;
    private static _currentActor: unknown // TODO fix the typing.
    private static _actionForceBattler: unknown // TODO fix typing.
    private static _mapBgm: CurrentAudio;
    private static _mapBgs: CurrentAudio;
    private static _actionBattlers = [];
    private static _subject = null;
    private static _action = null;
    private static _targets = [];
    private static _logWindow = null;
    private static _spriteset = null;
    private static _escapeRatio = 0;
    private static _escaped = false;
    private static _rewards = {};
    private static _tpbNeedsPartyCommand = true;
    
}