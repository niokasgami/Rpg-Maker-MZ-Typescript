/** 
 * Declaration file for rpg maker MZ 
 * @name rpg_core
 * @author nio kasgami
 * @version 1.00
 * 
*/
import {Graphics} from "./Graphics";
import {Input} from "./Input";
import { Array, Math, Number, String } from "./jsExtensions";
import {JsonEx} from "./JsonEx";
import {TouchInput} from "./TouchInput";
import {Utils} from "./Utils";
import {Video} from "./Video";
import { Bitmap } from "./Bitmap";
import { ColorFilter } from "./ColorFilter";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { ScreenSprite } from "./ScreenSprite";
import { Sprite } from "./Sprite";
import { Stage } from "./Stage";
import {Tilemap} from "./Tilemap";
import {TillingSprite} from "./TillingSprite";
import {Weather} from "./Weather";
import {WebAudio} from "./WebAudio";
import {Window} from "./Window";
import {WindowLayer} from "./WindowLayer"
import {RPG} from "./RPG";




declare module "rpg_core" {
    export {
        Graphics,
        Input,
        Array,
        Math,
        Number,
        String,
        JsonEx,
        TouchInput,
        Utils, 
        Video,
        Bitmap,
        ColorFilter,
        Point,
        Rectangle,
        ScreenSprite,
        Sprite,
        Stage,
        Tilemap,
        TillingSprite,
        Weather,
        WebAudio,
        Window,
        WindowLayer,
        RPG
    }
}
