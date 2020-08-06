# Rpg-Maker-MZ-Typescript
The typescript definitions files for MZ

###Introductions
This project document the whole MZ codebase allowing programmer to create plugins for rpg maker MZ using typescript.

###How to use it?
Just download the project and get the files from dist/libs 
There's a totals of 7 files (including the external library)
There's two way of using it : 

 by using the bundled files and calling the file globally or using the import features such as 
 ```js
        import {Sprite} from "./lib/rpg_core";
 ```
 
 Please take now that in the forseen futur the file will be created as an distributable npm project and the core file will be declared as ambient module.

 ### Plugin Environment
 The plugin environment is still a work in progress but will be worked once the definitions files will be released. It will use rollup.js to build your plugins. An integration with gulp is also planned.

 ### Contributing
You can contribute to the project by any means! Although, there's specific rules to follow : 

All class must be declared then exported 
 ```ts
     declare class Dummy {} 
     export {Dummy}
 ```
 due to the fact the project use rollup to bundle the files.
 All the appropriate files must be imported into the main file relative to the folder.
 i.e : rpg_core.d.ts , rpg_object.d.ts etc
 the structure is at follow : 
 ```ts
 import {Class} from "./module";

declare module "rpg_core" {
    export {
        Class,
    }
}
 ```
#### do and don't 

Do not references separated module directly from separated folder
```ts 
 import {Game_Temp} from "../rpg_object/Game_Temp";
 ```
 It will provoke bundling error. Take in consideration when working on plugins it is fine to use the separated module. Using the bundled file is less typing though.

 do references separated module like this when doing the rpg declaration files: 
 ```ts
 import {Game_Temp} from "../bundled/rpg_object";
 ```

## build the files 
Simply do rollup configfilename for the time being. In the futur their will be a NPM script command to just build the whole library in one call.