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
    private static _actionBattlers: unknown[];
    private static _subject: unknown;
    private static _action: unknown;
    private static _targets: unknown[];
    private static _logWindow: unknown;
    private static _spriteset;
    private static _escapeRatio: number;
    private static _escaped: boolean;
    private static _rewards: Record<string, unknown>;
    private static _tpbNeedsPartyCommand: boolean;
    
}