/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import dts from "rollup-plugin-dts";
import banner from "rollup-plugin-banner";
var path = require("path");

const config = {
  name: "rmmz_API.d.ts",
  version: "1.0.0",
  author: "Nio Kasgami",
  dir: "dist/libs"
};
/**
 * @deprecated the structure will be changed from separated d.ts to one compiled d.ts
 */
// TODO : Implement a way to do multiple task.
/** 
const configs = [
  {
    external: ["pixi.js", "effekseer"],
    input: "./src/rpg_core/rpg_core.d.ts",
    output: [{
      file: "dist/libs/rpg_core.d.ts", format: "iife",
      name: "RPG_CORE", globals: { "pixi.js": "PIXI", "effekseer": "effekseer" }
    }],
    plugins: [dts(), banner({
      file: path.join(__dirname, "src/rpg_core/", 'header.txt'),
      encoding: 'utf-8' // default is utf-8
    })],
  },
];
*/

const main = [{
  external: ["pixi.js", "effekseer"],
  input: "./src/index.d.ts",
  output: [{
    file: path.join(__dirname, config.dir, `/${config.name}`),
    format: "es",
    globals: {
      "pixi.js": "PIXI",
      "effekseer": "effekseer"
    }
  }],
  plugins: [
    dts(), banner({
      file: path.join(__dirname, 'header.txt'),
      encoding: 'utf-8' // default is utf-8
    })
  ]
}]

export default main;