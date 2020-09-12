declare class SoundManager {

    public static preloadImportantSounds(): void;
    public static loadSystemSound(n: number): void;
    public static playSystemSound(n: number): void;

    public static playCursor(): void;
    public static playOk(): void;
    public static playCancel(): void;
    public static playBuzzer(): void;
    public static playEquip(): void;
    public static playSave(): void;
    public static playLoad(): void;
    public static playBattleStart(): void;
    public static playEscape(): void;
    public static playEnemyAttack(): void;
    public static playEnemyCollapse(): void;
    public static playBossCollapse1(): void;
    public static playBossCollapse2(): void;
    public static playActorDamage(): void;
    public static playActorCollapse(): void;
    public static playRecovery(): void;
    public static playMiss(): void;
    public static playEvasion(): void;
    public static playMagicEvasion(): void;
    public static playReflection(): void;
    public static playShop(): void;
    public static playUseSkill(): void;

}

export { SoundManager }