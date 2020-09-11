
// Window_SkillStatus
//
// The window for displaying the skill user's status on the skill screen.

function Window_SkillStatus() {
    this.initialize(...arguments);
}

Window_SkillStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_SkillStatus.prototype.constructor = Window_SkillStatus;

Window_SkillStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
};

Window_SkillStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_SkillStatus.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    if (this._actor) {
        const x = this.colSpacing() / 2;
        const h = this.innerHeight;
        const y = h / 2 - this.lineHeight() * 1.5;
        this.drawActorFace(this._actor, x + 1, 0, 144, h);
        this.drawActorSimpleStatus(this._actor, x + 180, y);
    }
};

