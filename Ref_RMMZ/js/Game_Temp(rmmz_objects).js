
// Game_Temp
//
// The game object class for temporary data that is not included in save data.

function Game_Temp() {
    this.initialize(...arguments);
}

Game_Temp.prototype.initialize = function() {
    this._isPlaytest = Utils.isOptionValid("test");
    this._destinationX = null;
    this._destinationY = null;
    this._touchTarget = null;
    this._touchState = "";
    this._needsBattleRefresh = false;
    this._commonEventQueue = [];
    this._animationQueue = [];
    this._balloonQueue = [];
    this._lastActionData = [0, 0, 0, 0, 0, 0];
};

Game_Temp.prototype.isPlaytest = function() {
    return this._isPlaytest;
};

Game_Temp.prototype.setDestination = function(x, y) {
    this._destinationX = x;
    this._destinationY = y;
};

Game_Temp.prototype.clearDestination = function() {
    this._destinationX = null;
    this._destinationY = null;
};

Game_Temp.prototype.isDestinationValid = function() {
    return this._destinationX !== null;
};

Game_Temp.prototype.destinationX = function() {
    return this._destinationX;
};

Game_Temp.prototype.destinationY = function() {
    return this._destinationY;
};

Game_Temp.prototype.setTouchState = function(target, state) {
    this._touchTarget = target;
    this._touchState = state;
};

Game_Temp.prototype.clearTouchState = function() {
    this._touchTarget = null;
    this._touchState = "";
};

Game_Temp.prototype.touchTarget = function() {
    return this._touchTarget;
};

Game_Temp.prototype.touchState = function() {
    return this._touchState;
};

Game_Temp.prototype.requestBattleRefresh = function() {
    if ($gameParty.inBattle()) {
        this._needsBattleRefresh = true;
    }
};

Game_Temp.prototype.clearBattleRefreshRequest = function() {
    this._needsBattleRefresh = false;
};

Game_Temp.prototype.isBattleRefreshRequested = function() {
    return this._needsBattleRefresh;
};

Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    this._commonEventQueue.push(commonEventId);
};

Game_Temp.prototype.retrieveCommonEvent = function() {
    return $dataCommonEvents[this._commonEventQueue.shift()];
};

Game_Temp.prototype.isCommonEventReserved = function() {
    return this._commonEventQueue.length > 0;
};

// prettier-ignore
Game_Temp.prototype.requestAnimation = function(
    targets, animationId, mirror = false
) {
    if ($dataAnimations[animationId]) {
        const request = {
            targets: targets,
            animationId: animationId,
            mirror: mirror
        };
        this._animationQueue.push(request);
        for (const target of targets) {
            if (target.startAnimation) {
                target.startAnimation();
            }
        }
    }
};

Game_Temp.prototype.retrieveAnimation = function() {
    return this._animationQueue.shift();
};

Game_Temp.prototype.requestBalloon = function(target, balloonId) {
    const request = { target: target, balloonId: balloonId };
    this._balloonQueue.push(request);
    if (target.startBalloon) {
        target.startBalloon();
    }
};

Game_Temp.prototype.retrieveBalloon = function() {
    return this._balloonQueue.shift();
};

Game_Temp.prototype.lastActionData = function(type) {
    return this._lastActionData[type] || 0;
};

Game_Temp.prototype.setLastActionData = function(type, value) {
    this._lastActionData[type] = value;
};

Game_Temp.prototype.setLastUsedSkillId = function(skillID) {
    this.setLastActionData(0, skillID);
};

Game_Temp.prototype.setLastUsedItemId = function(itemID) {
    this.setLastActionData(1, itemID);
};

Game_Temp.prototype.setLastSubjectActorId = function(actorID) {
    this.setLastActionData(2, actorID);
};

Game_Temp.prototype.setLastSubjectEnemyIndex = function(enemyIndex) {
    this.setLastActionData(3, enemyIndex);
};

Game_Temp.prototype.setLastTargetActorId = function(actorID) {
    this.setLastActionData(4, actorID);
};

Game_Temp.prototype.setLastTargetEnemyIndex = function(enemyIndex) {
    this.setLastActionData(5, enemyIndex);
};

