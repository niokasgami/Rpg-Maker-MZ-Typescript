import * as PIXI from "pixi.js";

declare class WindowLayer extends PIXI.Container {

    constructor();
    
    public render(renderer: PIXI.Renderer): void;
    public update(): void;

}

export { WindowLayer };
