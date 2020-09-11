
// Window_SkillType
//
// The window for selecting a skill type on the skill screen.

function Window_SkillType() {
    this.initialize(...arguments);
}

Window_SkillType.prototype = Object.create(Window_Command.prototype);
Window_SkillType.prototype.constructor = Window_SkillType;

Window_SkillType.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this._actor = null;
};

Window_SkillType.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.selectLast();
    }
};

Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        const skillTypes = this._actor.skillTypes();
        for (const stypeId of skillTypes) {
            const name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, "skill", true, stypeId);
        }
    }
};

Window_SkillType.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._skillWindow) {
        this._skillWindow.setStypeId(this.currentExt());
    }
};

Window_SkillType.prototype.setSkillWindow = function(skillWindow) {
    this._skillWindow = skillWindow;
};

Window_SkillType.prototype.selectLast = function() {
    const skill = this._actor.lastMenuSkill();
    if (skill) {
        this.selectExt(skill.stypeId);
    } else {
        this.forceSelect(0);
    }
};

