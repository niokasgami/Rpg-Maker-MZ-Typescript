
// Scene_Load
//
// The scene class of the load screen.

function Scene_Load() {
    this.initialize(...arguments);
}

Scene_Load.prototype = Object.create(Scene_File.prototype);
Scene_Load.prototype.constructor = Scene_Load;

Scene_Load.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
    this._loadSuccess = false;
};

Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};

Scene_Load.prototype.mode = function() {
    return "load";
};

Scene_Load.prototype.helpWindowText = function() {
    return TextManager.loadMessage;
};

Scene_Load.prototype.firstSavefileId = function() {
    return DataManager.latestSavefileId();
};

Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    const savefileId = this.savefileId();
    if (this.isSavefileEnabled(savefileId)) {
        this.executeLoad(savefileId);
    } else {
        this.onLoadFailure();
    }
};

Scene_Load.prototype.executeLoad = function(savefileId) {
    DataManager.loadGame(savefileId)
        .then(() => this.onLoadSuccess())
        .catch(() => this.onLoadFailure());
};

Scene_Load.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};

Scene_Load.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.activateListWindow();
};

Scene_Load.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        const mapId = $gameMap.mapId();
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        $gamePlayer.reserveTransfer(mapId, x, y);
        $gamePlayer.requestMapReload();
    }
};

