
// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.

function Window_BattleActor() {
    this.initialize(...arguments);
}

Window_BattleActor.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActor.prototype.constructor = Window_BattleActor;

Window_BattleActor.prototype.initialize = function(rect) {
    Window_BattleStatus.prototype.initialize.call(this, rect);
    this.openness = 255;
    this.hide();
};

Window_BattleActor.prototype.show = function() {
    this.forceSelect(0);
    $gameTemp.clearTouchState();
    Window_BattleStatus.prototype.show.call(this);
};

Window_BattleActor.prototype.hide = function() {
    Window_BattleStatus.prototype.hide.call(this);
    $gameParty.select(null);
};

Window_BattleActor.prototype.select = function(index) {
    Window_BattleStatus.prototype.select.call(this, index);
    $gameParty.select(this.actor(index));
};

Window_BattleActor.prototype.processTouch = function() {
    Window_BattleStatus.prototype.processTouch.call(this);
    if (this.isOpenAndActive()) {
        const target = $gameTemp.touchTarget();
        if (target) {
            const members = $gameParty.battleMembers();
            if (members.includes(target)) {
                this.select(members.indexOf(target));
                if ($gameTemp.touchState() === "click") {
                    this.processOk();
                }
            }
            $gameTemp.clearTouchState();
        }
    }
};

