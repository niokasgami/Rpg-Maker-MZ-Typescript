import * as ParticleSystem from "pixi-particles";
import * as PIXI from "pixi.js";
import { Sprite } from "../../rpg_core/Sprite";

/**
 *@experimental this class is still in development as an integrated particles tool.
 *
 * @class Particles
 * @extends {ParticleSystem.Emitter}
 */
class Particles  {

    private _emitter: ParticleSystem.Emitter;
    constructor(container: PIXI.Container, sprite: Sprite[]){
        this._emitter = null;
    }
}