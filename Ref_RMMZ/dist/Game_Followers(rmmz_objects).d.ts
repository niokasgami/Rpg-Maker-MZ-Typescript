declare function Game_Followers(...args: any[]): void;
declare class Game_Followers {
    constructor(...args: any[]);
    initialize(): void;
    _visible: any;
    _gathering: boolean;
    _data: any[];
    setup(): void;
    isVisible(): any;
    show(): void;
    hide(): void;
    data(): any;
    reverseData(): any;
    follower(index: any): any;
    refresh(): void;
    update(): void;
    updateMove(): void;
    jumpAll(): void;
    synchronize(x: any, y: any, d: any): void;
    gather(): void;
    areGathering(): boolean;
    visibleFollowers(): any[];
    areMoving(): boolean;
    areGathered(): boolean;
    isSomeoneCollided(x: any, y: any): boolean;
}
