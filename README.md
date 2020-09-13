[source]: https://github.com/niokasgami/Rpg-Maker-MZ-Typescript

![banner](./typescript.jpg)

![Node.js Package](https://github.com/masked-rpgmaker/Rpg-Maker-MZ-Typescript/workflows/Node.js%20Package/badge.svg)


# Introduction

This project provides type definitions for the whole MZ codebase allowing the programmer to create plugins for rpg maker MZ using Typescript.

This is a fork of [Nio Kasgami's repository][source], but adapted to be
used as an NPM dependency. **All credit for the type definitions goes to Nio
Kasgami and their contributors.** If you'd like to support the project, please
head to the original repository.


# Getting Started

The project can be installed via NPM, both via the default NPM registry and the
Github NPM Registry:

    npm install rmmz@npm:@masked-rpgmaker/rpg-maker-mz-typescript

All types are available from the top-level module:

```ts
import { DataManager, $gameParty, Game_Character } from 'rmmz';
```

Alternatively, you might import each module separately:

```ts
import * as core from 'rmmz/rmmz_core';
import * as objects from 'rmmz/rmmz_objects';
// ...
```


# Contributing

If you're interested in providing new type definitions, please give preference
to doing so on the [source repository][source] from Nio Kasgami. 

We'll work to integrate any new type definitions added to their repository on
our side.

If you have any suggestions specific to this fork, please open an issue
following our templates and/or open a pull request.


# Terms of Use

Please read the [license information](./LICENSE.md) for this repository.

