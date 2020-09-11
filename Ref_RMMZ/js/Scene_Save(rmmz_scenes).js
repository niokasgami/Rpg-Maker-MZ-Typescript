
// Scene_Save
//
// The scene class of the save screen.

function Scene_Save() {
    this.initialize(...arguments);
}

Scene_Save.prototype = Object.create(Scene_File.prototype);
Scene_Save.prototype.constructor = Scene_Save;

Scene_Save.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
};

Scene_Save.prototype.mode = function() {
    return "save";
};

Scene_Save.prototype.helpWindowText = function() {
    return TextManager.saveMessage;
};

Scene_Save.prototype.firstSavefileId = function() {
    return $gameSystem.savefileId();
};

Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    const savefileId = this.savefileId();
    if (this.isSavefileEnabled(savefileId)) {
        this.executeSave(savefileId);
    } else {
        this.onSaveFailure();
    }
};

Scene_Save.prototype.executeSave = function(savefileId) {
    $gameSystem.setSavefileId(savefileId);
    $gameSystem.onBeforeSave();
    DataManager.saveGame(savefileId)
        .then(() => this.onSaveSuccess())
        .catch(() => this.onSaveFailure());
};

Scene_Save.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
    this.popScene();
};

Scene_Save.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this.activateListWindow();
};

