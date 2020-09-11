
// Game_Followers
//
// The wrapper class for a follower array.

function Game_Followers() {
    this.initialize(...arguments);
}

Game_Followers.prototype.initialize = function() {
    this._visible = $dataSystem.optFollowers;
    this._gathering = false;
    this._data = [];
    this.setup();
};

Game_Followers.prototype.setup = function() {
    this._data = [];
    for (let i = 1; i < $gameParty.maxBattleMembers(); i++) {
        this._data.push(new Game_Follower(i));
    }
};

Game_Followers.prototype.isVisible = function() {
    return this._visible;
};

Game_Followers.prototype.show = function() {
    this._visible = true;
};

Game_Followers.prototype.hide = function() {
    this._visible = false;
};

Game_Followers.prototype.data = function() {
    return this._data.clone();
};

Game_Followers.prototype.reverseData = function() {
    return this._data.clone().reverse();
};

Game_Followers.prototype.follower = function(index) {
    return this._data[index];
};

Game_Followers.prototype.refresh = function() {
    for (const follower of this._data) {
        follower.refresh();
    }
};

Game_Followers.prototype.update = function() {
    if (this.areGathering()) {
        if (!this.areMoving()) {
            this.updateMove();
        }
        if (this.areGathered()) {
            this._gathering = false;
        }
    }
    for (const follower of this._data) {
        follower.update();
    }
};

Game_Followers.prototype.updateMove = function() {
    for (let i = this._data.length - 1; i >= 0; i--) {
        const precedingCharacter = i > 0 ? this._data[i - 1] : $gamePlayer;
        this._data[i].chaseCharacter(precedingCharacter);
    }
};

Game_Followers.prototype.jumpAll = function() {
    if ($gamePlayer.isJumping()) {
        for (const follower of this._data) {
            const sx = $gamePlayer.deltaXFrom(follower.x);
            const sy = $gamePlayer.deltaYFrom(follower.y);
            follower.jump(sx, sy);
        }
    }
};

Game_Followers.prototype.synchronize = function(x, y, d) {
    for (const follower of this._data) {
        follower.locate(x, y);
        follower.setDirection(d);
    }
};

Game_Followers.prototype.gather = function() {
    this._gathering = true;
};

Game_Followers.prototype.areGathering = function() {
    return this._gathering;
};

Game_Followers.prototype.visibleFollowers = function() {
    return this._data.filter(follower => follower.isVisible());
};

Game_Followers.prototype.areMoving = function() {
    return this.visibleFollowers().some(follower => follower.isMoving());
};

Game_Followers.prototype.areGathered = function() {
    return this.visibleFollowers().every(follower => follower.isGathered());
};

Game_Followers.prototype.isSomeoneCollided = function(x, y) {
    return this.visibleFollowers().some(follower => follower.pos(x, y));
};

