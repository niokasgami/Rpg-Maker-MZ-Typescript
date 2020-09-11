
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

function Window_ActorCommand() {
    this.initialize(...arguments);
}

Window_ActorCommand.prototype = Object.create(Window_Command.prototype);
Window_ActorCommand.prototype.constructor = Window_ActorCommand;

Window_ActorCommand.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};

Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        this.addAttackCommand();
        this.addSkillCommands();
        this.addGuardCommand();
        this.addItemCommand();
    }
};

Window_ActorCommand.prototype.addAttackCommand = function() {
    this.addCommand(TextManager.attack, "attack", this._actor.canAttack());
};

Window_ActorCommand.prototype.addSkillCommands = function() {
    const skillTypes = this._actor.skillTypes();
    for (const stypeId of skillTypes) {
        const name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, "skill", true, stypeId);
    }
};

Window_ActorCommand.prototype.addGuardCommand = function() {
    this.addCommand(TextManager.guard, "guard", this._actor.canGuard());
};

Window_ActorCommand.prototype.addItemCommand = function() {
    this.addCommand(TextManager.item, "item");
};

Window_ActorCommand.prototype.setup = function(actor) {
    this._actor = actor;
    this.refresh();
    this.selectLast();
    this.activate();
    this.open();
};

Window_ActorCommand.prototype.actor = function() {
    return this._actor;
};

Window_ActorCommand.prototype.processOk = function() {
    if (this._actor) {
        if (ConfigManager.commandRemember) {
            this._actor.setLastCommandSymbol(this.currentSymbol());
        } else {
            this._actor.setLastCommandSymbol("");
        }
    }
    Window_Command.prototype.processOk.call(this);
};

Window_ActorCommand.prototype.selectLast = function() {
    this.forceSelect(0);
    if (this._actor && ConfigManager.commandRemember) {
        const symbol = this._actor.lastCommandSymbol();
        this.selectSymbol(symbol);
        if (symbol === "skill") {
            const skill = this._actor.lastBattleSkill();
            if (skill) {
                this.selectExt(skill.stypeId);
            }
        }
    }
};

