declare function Sprite_Weapon(...args: any[]): void;
declare class Sprite_Weapon {
    constructor(...args: any[]);
    constructor: typeof Sprite_Weapon;
    initialize(): void;
    initMembers(): void;
    _weaponImageId: any;
    _animationCount: number;
    _pattern: number;
    x: number;
    setup(weaponImageId: any): void;
    update(): void;
    animationWait(): number;
    updatePattern(): void;
    loadBitmap(): void;
    bitmap: any;
    updateFrame(): void;
    isPlaying(): boolean;
}
