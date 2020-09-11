
// Scene_File
//
// The superclass of Scene_Save and Scene_Load.

function Scene_File() {
    this.initialize(...arguments);
}

Scene_File.prototype = Object.create(Scene_MenuBase.prototype);
Scene_File.prototype.constructor = Scene_File;

Scene_File.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createHelpWindow();
    this.createListWindow();
    this._helpWindow.setText(this.helpWindowText());
};

Scene_File.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_File.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._listWindow.refresh();
};

Scene_File.prototype.savefileId = function() {
    return this._listWindow.savefileId();
};

Scene_File.prototype.isSavefileEnabled = function(savefileId) {
    return this._listWindow.isEnabled(savefileId);
};

Scene_File.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect();
    this._helpWindow = new Window_Help(rect);
    this.addWindow(this._helpWindow);
};

Scene_File.prototype.helpWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, false);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_File.prototype.createListWindow = function() {
    const rect = this.listWindowRect();
    this._listWindow = new Window_SavefileList(rect);
    this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
    this._listWindow.setHandler("cancel", this.popScene.bind(this));
    this._listWindow.setMode(this.mode(), this.needsAutosave());
    this._listWindow.selectSavefile(this.firstSavefileId());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};

Scene_File.prototype.listWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop() + this._helpWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight() - this._helpWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_File.prototype.mode = function() {
    return null;
};

Scene_File.prototype.needsAutosave = function() {
    return $gameSystem.isAutosaveEnabled();
};

Scene_File.prototype.activateListWindow = function() {
    this._listWindow.activate();
};

Scene_File.prototype.helpWindowText = function() {
    return "";
};

Scene_File.prototype.firstSavefileId = function() {
    return 0;
};

Scene_File.prototype.onSavefileOk = function() {
    //
};

