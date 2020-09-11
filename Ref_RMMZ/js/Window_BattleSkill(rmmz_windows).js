
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

function Window_BattleSkill() {
    this.initialize(...arguments);
}

Window_BattleSkill.prototype = Object.create(Window_SkillList.prototype);
Window_BattleSkill.prototype.constructor = Window_BattleSkill;

Window_BattleSkill.prototype.initialize = function(rect) {
    Window_SkillList.prototype.initialize.call(this, rect);
    this.hide();
};

Window_BattleSkill.prototype.show = function() {
    this.selectLast();
    this.showHelpWindow();
    Window_SkillList.prototype.show.call(this);
};

Window_BattleSkill.prototype.hide = function() {
    this.hideHelpWindow();
    Window_SkillList.prototype.hide.call(this);
};

