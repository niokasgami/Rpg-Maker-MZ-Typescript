declare function Sprite_Actor(...args: any[]): void;
declare class Sprite_Actor {
    constructor(...args: any[]);
    constructor: typeof Sprite_Actor;
    initialize(battler: any): void;
    initMembers(): void;
    _battlerName: any;
    _motion: any;
    _motionCount: number;
    _pattern: any;
    mainSprite(): Sprite;
    createMainSprite(): void;
    _mainSprite: Sprite;
    createShadowSprite(): void;
    _shadowSprite: Sprite;
    createWeaponSprite(): void;
    _weaponSprite: Sprite_Weapon;
    createStateSprite(): void;
    _stateSprite: Sprite_StateOverlay;
    setBattler(battler: any): void;
    _actor: any;
    moveToStartPosition(): void;
    setActorHome(index: any): void;
    update(): void;
    updateShadow(): void;
    updateMain(): void;
    setupMotion(): void;
    setupWeaponAnimation(): void;
    startMotion(motionType: any): void;
    updateTargetPosition(): void;
    shouldStepForward(): any;
    updateBitmap(): void;
    updateFrame(): void;
    updateMove(): void;
    updateMotion(): void;
    updateMotionCount(): void;
    motionSpeed(): number;
    refreshMotion(): void;
    startEntryMotion(): void;
    stepForward(): void;
    stepBack(): void;
    retreat(): void;
    onMoveEnd(): void;
    damageOffsetX(): number;
    damageOffsetY(): any;
}
declare namespace Sprite_Actor {
    namespace MOTIONS {
        namespace walk {
            const index: number;
            const loop: boolean;
        }
        namespace wait {
            const index_1: number;
            export { index_1 as index };
            const loop_1: boolean;
            export { loop_1 as loop };
        }
        namespace chant {
            const index_2: number;
            export { index_2 as index };
            const loop_2: boolean;
            export { loop_2 as loop };
        }
        namespace guard {
            const index_3: number;
            export { index_3 as index };
            const loop_3: boolean;
            export { loop_3 as loop };
        }
        namespace damage {
            const index_4: number;
            export { index_4 as index };
            const loop_4: boolean;
            export { loop_4 as loop };
        }
        namespace evade {
            const index_5: number;
            export { index_5 as index };
            const loop_5: boolean;
            export { loop_5 as loop };
        }
        namespace thrust {
            const index_6: number;
            export { index_6 as index };
            const loop_6: boolean;
            export { loop_6 as loop };
        }
        namespace swing {
            const index_7: number;
            export { index_7 as index };
            const loop_7: boolean;
            export { loop_7 as loop };
        }
        namespace missile {
            const index_8: number;
            export { index_8 as index };
            const loop_8: boolean;
            export { loop_8 as loop };
        }
        namespace skill {
            const index_9: number;
            export { index_9 as index };
            const loop_9: boolean;
            export { loop_9 as loop };
        }
        namespace spell {
            const index_10: number;
            export { index_10 as index };
            const loop_10: boolean;
            export { loop_10 as loop };
        }
        namespace item {
            const index_11: number;
            export { index_11 as index };
            const loop_11: boolean;
            export { loop_11 as loop };
        }
        namespace escape {
            const index_12: number;
            export { index_12 as index };
            const loop_12: boolean;
            export { loop_12 as loop };
        }
        namespace victory {
            const index_13: number;
            export { index_13 as index };
            const loop_13: boolean;
            export { loop_13 as loop };
        }
        namespace dying {
            const index_14: number;
            export { index_14 as index };
            const loop_14: boolean;
            export { loop_14 as loop };
        }
        namespace abnormal {
            const index_15: number;
            export { index_15 as index };
            const loop_15: boolean;
            export { loop_15 as loop };
        }
        namespace sleep {
            const index_16: number;
            export { index_16 as index };
            const loop_16: boolean;
            export { loop_16 as loop };
        }
        namespace dead {
            const index_17: number;
            export { index_17 as index };
            const loop_17: boolean;
            export { loop_17 as loop };
        }
    }
}
