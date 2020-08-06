import dts from "rollup-plugin-dts";
import banner from "rollup-plugin-banner";
var path = require("path");

// TODO : Implement a way to do multiple task.
const config = [
  {
    external: ["pixi.js", "effekseer"],
    input: "./src/rpg_core/rpg_core.d.ts",
    output: [{ file: "dist/libs/rpg_core.d.ts", format: "iife",
    name: "RPG_CORE", globals: {"pixi.js": "PIXI", "effekseer": "effekseer"} }],
    plugins: [dts(), banner({
      file: path.join(__dirname,"src/rpg_core/", 'header.txt'),
      encoding: 'utf-8' // default is utf-8
    })],
  },
];

export default config;