declare namespace SoundManager {

    export function preloadImportantSounds(): void;
    export function loadSystemSound(n: number): void;
    export function playSystemSound(n: number): void;

    export function playCursor(): void;
    export function playOk(): void;
    export function playCancel(): void;
    export function playBuzzer(): void;
    export function playEquip(): void;
    export function playSave(): void;
    export function playLoad(): void;
    export function playBattleStart(): void;
    export function playEscape(): void;
    export function playEnemyAttack(): void;
    export function playEnemyCollapse(): void;
    export function playBossCollapse1(): void;
    export function playBossCollapse2(): void;
    export function playActorDamage(): void;
    export function playActorCollapse(): void;
    export function playRecovery(): void;
    export function playMiss(): void;
    export function playEvasion(): void;
    export function playMagicEvasion(): void;
    export function playReflection(): void;
    export function playShop(): void;
    export function playUseSkill(): void;

}

export { SoundManager };
