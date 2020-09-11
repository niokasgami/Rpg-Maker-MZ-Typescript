
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

function Game_Party() {
    this.initialize(...arguments);
}

Game_Party.prototype = Object.create(Game_Unit.prototype);
Game_Party.prototype.constructor = Game_Party;

Game_Party.ABILITY_ENCOUNTER_HALF = 0;
Game_Party.ABILITY_ENCOUNTER_NONE = 1;
Game_Party.ABILITY_CANCEL_SURPRISE = 2;
Game_Party.ABILITY_RAISE_PREEMPTIVE = 3;
Game_Party.ABILITY_GOLD_DOUBLE = 4;
Game_Party.ABILITY_DROP_ITEM_DOUBLE = 5;

Game_Party.prototype.initialize = function() {
    Game_Unit.prototype.initialize.call(this);
    this._gold = 0;
    this._steps = 0;
    this._lastItem = new Game_Item();
    this._menuActorId = 0;
    this._targetActorId = 0;
    this._actors = [];
    this.initAllItems();
};

Game_Party.prototype.initAllItems = function() {
    this._items = {};
    this._weapons = {};
    this._armors = {};
};

Game_Party.prototype.exists = function() {
    return this._actors.length > 0;
};

Game_Party.prototype.size = function() {
    return this.members().length;
};

Game_Party.prototype.isEmpty = function() {
    return this.size() === 0;
};

Game_Party.prototype.members = function() {
    return this.inBattle() ? this.battleMembers() : this.allMembers();
};

Game_Party.prototype.allMembers = function() {
    return this._actors.map(id => $gameActors.actor(id));
};

Game_Party.prototype.battleMembers = function() {
    return this.allMembers()
        .slice(0, this.maxBattleMembers())
        .filter(actor => actor.isAppeared());
};

Game_Party.prototype.maxBattleMembers = function() {
    return 4;
};

Game_Party.prototype.leader = function() {
    return this.battleMembers()[0];
};

Game_Party.prototype.removeInvalidMembers = function() {
    for (const actorId of this._actors) {
        if (!$dataActors[actorId]) {
            this._actors.remove(actorId);
        }
    }
};

Game_Party.prototype.reviveBattleMembers = function() {
    for (const actor of this.battleMembers()) {
        if (actor.isDead()) {
            actor.setHp(1);
        }
    }
};

Game_Party.prototype.items = function() {
    return Object.keys(this._items).map(id => $dataItems[id]);
};

Game_Party.prototype.weapons = function() {
    return Object.keys(this._weapons).map(id => $dataWeapons[id]);
};

Game_Party.prototype.armors = function() {
    return Object.keys(this._armors).map(id => $dataArmors[id]);
};

Game_Party.prototype.equipItems = function() {
    return this.weapons().concat(this.armors());
};

Game_Party.prototype.allItems = function() {
    return this.items().concat(this.equipItems());
};

Game_Party.prototype.itemContainer = function(item) {
    if (!item) {
        return null;
    } else if (DataManager.isItem(item)) {
        return this._items;
    } else if (DataManager.isWeapon(item)) {
        return this._weapons;
    } else if (DataManager.isArmor(item)) {
        return this._armors;
    } else {
        return null;
    }
};

Game_Party.prototype.setupStartingMembers = function() {
    this._actors = [];
    for (const actorId of $dataSystem.partyMembers) {
        if ($gameActors.actor(actorId)) {
            this._actors.push(actorId);
        }
    }
};

Game_Party.prototype.name = function() {
    const numBattleMembers = this.battleMembers().length;
    if (numBattleMembers === 0) {
        return "";
    } else if (numBattleMembers === 1) {
        return this.leader().name();
    } else {
        return TextManager.partyName.format(this.leader().name());
    }
};

Game_Party.prototype.setupBattleTest = function() {
    this.setupBattleTestMembers();
    this.setupBattleTestItems();
};

Game_Party.prototype.setupBattleTestMembers = function() {
    for (const battler of $dataSystem.testBattlers) {
        const actor = $gameActors.actor(battler.actorId);
        if (actor) {
            actor.changeLevel(battler.level, false);
            actor.initEquips(battler.equips);
            actor.recoverAll();
            this.addActor(battler.actorId);
        }
    }
};

Game_Party.prototype.setupBattleTestItems = function() {
    for (const item of $dataItems) {
        if (item && item.name.length > 0) {
            this.gainItem(item, this.maxItems(item));
        }
    }
};

Game_Party.prototype.highestLevel = function() {
    return Math.max(...this.members().map(actor => actor.level));
};

Game_Party.prototype.addActor = function(actorId) {
    if (!this._actors.includes(actorId)) {
        this._actors.push(actorId);
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        $gameTemp.requestBattleRefresh();
        if (this.inBattle()) {
            const actor = $gameActors.actor(actorId);
            if (this.battleMembers().includes(actor)) {
                actor.onBattleStart();
            }
        }
    }
};

Game_Party.prototype.removeActor = function(actorId) {
    if (this._actors.includes(actorId)) {
        const actor = $gameActors.actor(actorId);
        const wasBattleMember = this.battleMembers().includes(actor);
        this._actors.remove(actorId);
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        $gameTemp.requestBattleRefresh();
        if (this.inBattle() && wasBattleMember) {
            actor.onBattleEnd();
        }
    }
};

Game_Party.prototype.gold = function() {
    return this._gold;
};

Game_Party.prototype.gainGold = function(amount) {
    this._gold = (this._gold + amount).clamp(0, this.maxGold());
};

Game_Party.prototype.loseGold = function(amount) {
    this.gainGold(-amount);
};

Game_Party.prototype.maxGold = function() {
    return 99999999;
};

Game_Party.prototype.steps = function() {
    return this._steps;
};

Game_Party.prototype.increaseSteps = function() {
    this._steps++;
};

Game_Party.prototype.numItems = function(item) {
    const container = this.itemContainer(item);
    return container ? container[item.id] || 0 : 0;
};

Game_Party.prototype.maxItems = function(/*item*/) {
    return 99;
};

Game_Party.prototype.hasMaxItems = function(item) {
    return this.numItems(item) >= this.maxItems(item);
};

Game_Party.prototype.hasItem = function(item, includeEquip) {
    if (this.numItems(item) > 0) {
        return true;
    } else if (includeEquip && this.isAnyMemberEquipped(item)) {
        return true;
    } else {
        return false;
    }
};

Game_Party.prototype.isAnyMemberEquipped = function(item) {
    return this.members().some(actor => actor.equips().includes(item));
};

Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    const container = this.itemContainer(item);
    if (container) {
        const lastNumber = this.numItems(item);
        const newNumber = lastNumber + amount;
        container[item.id] = newNumber.clamp(0, this.maxItems(item));
        if (container[item.id] === 0) {
            delete container[item.id];
        }
        if (includeEquip && newNumber < 0) {
            this.discardMembersEquip(item, -newNumber);
        }
        $gameMap.requestRefresh();
    }
};

Game_Party.prototype.discardMembersEquip = function(item, amount) {
    let n = amount;
    for (const actor of this.members()) {
        while (n > 0 && actor.isEquipped(item)) {
            actor.discardEquip(item);
            n--;
        }
    }
};

Game_Party.prototype.loseItem = function(item, amount, includeEquip) {
    this.gainItem(item, -amount, includeEquip);
};

Game_Party.prototype.consumeItem = function(item) {
    if (DataManager.isItem(item) && item.consumable) {
        this.loseItem(item, 1);
    }
};

Game_Party.prototype.canUse = function(item) {
    return this.members().some(actor => actor.canUse(item));
};

Game_Party.prototype.canInput = function() {
    return this.members().some(actor => actor.canInput());
};

Game_Party.prototype.isAllDead = function() {
    if (Game_Unit.prototype.isAllDead.call(this)) {
        return this.inBattle() || !this.isEmpty();
    } else {
        return false;
    }
};

Game_Party.prototype.onPlayerWalk = function() {
    for (const actor of this.members()) {
        actor.onPlayerWalk();
    }
};

Game_Party.prototype.menuActor = function() {
    let actor = $gameActors.actor(this._menuActorId);
    if (!this.members().includes(actor)) {
        actor = this.members()[0];
    }
    return actor;
};

Game_Party.prototype.setMenuActor = function(actor) {
    this._menuActorId = actor.actorId();
};

Game_Party.prototype.makeMenuActorNext = function() {
    let index = this.members().indexOf(this.menuActor());
    if (index >= 0) {
        index = (index + 1) % this.members().length;
        this.setMenuActor(this.members()[index]);
    } else {
        this.setMenuActor(this.members()[0]);
    }
};

Game_Party.prototype.makeMenuActorPrevious = function() {
    let index = this.members().indexOf(this.menuActor());
    if (index >= 0) {
        index = (index + this.members().length - 1) % this.members().length;
        this.setMenuActor(this.members()[index]);
    } else {
        this.setMenuActor(this.members()[0]);
    }
};

Game_Party.prototype.targetActor = function() {
    let actor = $gameActors.actor(this._targetActorId);
    if (!this.members().includes(actor)) {
        actor = this.members()[0];
    }
    return actor;
};

Game_Party.prototype.setTargetActor = function(actor) {
    this._targetActorId = actor.actorId();
};

Game_Party.prototype.lastItem = function() {
    return this._lastItem.object();
};

Game_Party.prototype.setLastItem = function(item) {
    this._lastItem.setObject(item);
};

Game_Party.prototype.swapOrder = function(index1, index2) {
    const temp = this._actors[index1];
    this._actors[index1] = this._actors[index2];
    this._actors[index2] = temp;
    $gamePlayer.refresh();
};

Game_Party.prototype.charactersForSavefile = function() {
    return this.battleMembers().map(actor => [
        actor.characterName(),
        actor.characterIndex()
    ]);
};

Game_Party.prototype.facesForSavefile = function() {
    return this.battleMembers().map(actor => [
        actor.faceName(),
        actor.faceIndex()
    ]);
};

Game_Party.prototype.partyAbility = function(abilityId) {
    return this.battleMembers().some(actor => actor.partyAbility(abilityId));
};

Game_Party.prototype.hasEncounterHalf = function() {
    return this.partyAbility(Game_Party.ABILITY_ENCOUNTER_HALF);
};

Game_Party.prototype.hasEncounterNone = function() {
    return this.partyAbility(Game_Party.ABILITY_ENCOUNTER_NONE);
};

Game_Party.prototype.hasCancelSurprise = function() {
    return this.partyAbility(Game_Party.ABILITY_CANCEL_SURPRISE);
};

Game_Party.prototype.hasRaisePreemptive = function() {
    return this.partyAbility(Game_Party.ABILITY_RAISE_PREEMPTIVE);
};

Game_Party.prototype.hasGoldDouble = function() {
    return this.partyAbility(Game_Party.ABILITY_GOLD_DOUBLE);
};

Game_Party.prototype.hasDropItemDouble = function() {
    return this.partyAbility(Game_Party.ABILITY_DROP_ITEM_DOUBLE);
};

Game_Party.prototype.ratePreemptive = function(troopAgi) {
    let rate = this.agility() >= troopAgi ? 0.05 : 0.03;
    if (this.hasRaisePreemptive()) {
        rate *= 4;
    }
    return rate;
};

Game_Party.prototype.rateSurprise = function(troopAgi) {
    let rate = this.agility() >= troopAgi ? 0.03 : 0.05;
    if (this.hasCancelSurprise()) {
        rate = 0;
    }
    return rate;
};

Game_Party.prototype.performVictory = function() {
    for (const actor of this.members()) {
        actor.performVictory();
    }
};

Game_Party.prototype.performEscape = function() {
    for (const actor of this.members()) {
        actor.performEscape();
    }
};

Game_Party.prototype.removeBattleStates = function() {
    for (const actor of this.members()) {
        actor.removeBattleStates();
    }
};

Game_Party.prototype.requestMotionRefresh = function() {
    for (const actor of this.members()) {
        actor.requestMotionRefresh();
    }
};

Game_Party.prototype.onEscapeFailure = function() {
    for (const actor of this.members()) {
        actor.onEscapeFailure();
    }
};

