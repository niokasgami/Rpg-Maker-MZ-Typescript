
// Game_Unit
//
// The superclass of Game_Party and Game_Troop.

function Game_Unit() {
    this.initialize(...arguments);
}

Game_Unit.prototype.initialize = function() {
    this._inBattle = false;
};

Game_Unit.prototype.inBattle = function() {
    return this._inBattle;
};

Game_Unit.prototype.members = function() {
    return [];
};

Game_Unit.prototype.aliveMembers = function() {
    return this.members().filter(member => member.isAlive());
};

Game_Unit.prototype.deadMembers = function() {
    return this.members().filter(member => member.isDead());
};

Game_Unit.prototype.movableMembers = function() {
    return this.members().filter(member => member.canMove());
};

Game_Unit.prototype.clearActions = function() {
    for (const member of this.members()) {
        member.clearActions();
    }
};

Game_Unit.prototype.agility = function() {
    const members = this.members();
    const sum = members.reduce((r, member) => r + member.agi, 0);
    return Math.max(1, sum / Math.max(1, members.length));
};

Game_Unit.prototype.tgrSum = function() {
    return this.aliveMembers().reduce((r, member) => r + member.tgr, 0);
};

Game_Unit.prototype.randomTarget = function() {
    let tgrRand = Math.random() * this.tgrSum();
    let target = null;
    for (const member of this.aliveMembers()) {
        tgrRand -= member.tgr;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    }
    return target;
};

Game_Unit.prototype.randomDeadTarget = function() {
    const members = this.deadMembers();
    return members.length ? members[Math.randomInt(members.length)] : null;
};

Game_Unit.prototype.smoothTarget = function(index) {
    const member = this.members()[Math.max(0, index)];
    return member && member.isAlive() ? member : this.aliveMembers()[0];
};

Game_Unit.prototype.smoothDeadTarget = function(index) {
    const member = this.members()[Math.max(0, index)];
    return member && member.isDead() ? member : this.deadMembers()[0];
};

Game_Unit.prototype.clearResults = function() {
    for (const member of this.members()) {
        member.clearResult();
    }
};

Game_Unit.prototype.onBattleStart = function(advantageous) {
    for (const member of this.members()) {
        member.onBattleStart(advantageous);
    }
    this._inBattle = true;
};

Game_Unit.prototype.onBattleEnd = function() {
    this._inBattle = false;
    for (const member of this.members()) {
        member.onBattleEnd();
    }
};

Game_Unit.prototype.makeActions = function() {
    for (const member of this.members()) {
        member.makeActions();
    }
};

Game_Unit.prototype.select = function(activeMember) {
    for (const member of this.members()) {
        if (member === activeMember) {
            member.select();
        } else {
            member.deselect();
        }
    }
};

Game_Unit.prototype.isAllDead = function() {
    return this.aliveMembers().length === 0;
};

Game_Unit.prototype.substituteBattler = function() {
    for (const member of this.members()) {
        if (member.isSubstitute()) {
            return member;
        }
    }
    return null;
};

Game_Unit.prototype.tpbBaseSpeed = function() {
    const members = this.members();
    return Math.max(...members.map(member => member.tpbBaseSpeed()));
};

Game_Unit.prototype.tpbReferenceTime = function() {
    return BattleManager.isActiveTpb() ? 240 : 60;
};

Game_Unit.prototype.updateTpb = function() {
    for (const member of this.members()) {
        member.updateTpb();
    }
};

