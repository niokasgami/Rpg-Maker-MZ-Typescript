
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

function Window_BattleEnemy() {
    this.initialize(...arguments);
}

Window_BattleEnemy.prototype = Object.create(Window_Selectable.prototype);
Window_BattleEnemy.prototype.constructor = Window_BattleEnemy;

Window_BattleEnemy.prototype.initialize = function(rect) {
    this._enemies = [];
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this.hide();
};

Window_BattleEnemy.prototype.maxCols = function() {
    return 2;
};

Window_BattleEnemy.prototype.maxItems = function() {
    return this._enemies.length;
};

Window_BattleEnemy.prototype.enemy = function() {
    return this._enemies[this.index()];
};

Window_BattleEnemy.prototype.enemyIndex = function() {
    const enemy = this.enemy();
    return enemy ? enemy.index() : -1;
};

Window_BattleEnemy.prototype.drawItem = function(index) {
    this.resetTextColor();
    const name = this._enemies[index].name();
    const rect = this.itemLineRect(index);
    this.drawText(name, rect.x, rect.y, rect.width);
};

Window_BattleEnemy.prototype.show = function() {
    this.refresh();
    this.forceSelect(0);
    $gameTemp.clearTouchState();
    Window_Selectable.prototype.show.call(this);
};

Window_BattleEnemy.prototype.hide = function() {
    Window_Selectable.prototype.hide.call(this);
    $gameTroop.select(null);
};

Window_BattleEnemy.prototype.refresh = function() {
    this._enemies = $gameTroop.aliveMembers();
    Window_Selectable.prototype.refresh.call(this);
};

Window_BattleEnemy.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    $gameTroop.select(this.enemy());
};

Window_BattleEnemy.prototype.processTouch = function() {
    Window_Selectable.prototype.processTouch.call(this);
    if (this.isOpenAndActive()) {
        const target = $gameTemp.touchTarget();
        if (target) {
            if (this._enemies.includes(target)) {
                this.select(this._enemies.indexOf(target));
                if ($gameTemp.touchState() === "click") {
                    this.processOk();
                }
            }
            $gameTemp.clearTouchState();
        }
    }
};

