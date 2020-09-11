
// Window_SavefileList
//
// The window for selecting a save file on the save and load screens.

function Window_SavefileList() {
    this.initialize(...arguments);
}

Window_SavefileList.prototype = Object.create(Window_Selectable.prototype);
Window_SavefileList.prototype.constructor = Window_SavefileList;

Window_SavefileList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.activate();
    this._mode = null;
    this._autosave = false;
};

Window_SavefileList.prototype.setMode = function(mode, autosave) {
    this._mode = mode;
    this._autosave = autosave;
    this.refresh();
};

Window_SavefileList.prototype.maxItems = function() {
    return DataManager.maxSavefiles() - (this._autosave ? 0 : 1);
};

Window_SavefileList.prototype.numVisibleRows = function() {
    return 5;
};

Window_SavefileList.prototype.itemHeight = function() {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

Window_SavefileList.prototype.drawItem = function(index) {
    const savefileId = this.indexToSavefileId(index);
    const info = DataManager.savefileInfo(savefileId);
    const rect = this.itemRectWithPadding(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isEnabled(savefileId));
    this.drawTitle(savefileId, rect.x, rect.y + 4);
    if (info) {
        this.drawContents(info, rect);
    }
};

Window_SavefileList.prototype.indexToSavefileId = function(index) {
    return index + (this._autosave ? 0 : 1);
};

Window_SavefileList.prototype.savefileIdToIndex = function(savefileId) {
    return savefileId - (this._autosave ? 0 : 1);
};

Window_SavefileList.prototype.isEnabled = function(savefileId) {
    if (this._mode === "save") {
        return savefileId > 0;
    } else {
        return !!DataManager.savefileInfo(savefileId);
    }
};

Window_SavefileList.prototype.savefileId = function() {
    return this.indexToSavefileId(this.index());
};

Window_SavefileList.prototype.selectSavefile = function(savefileId) {
    const index = Math.max(0, this.savefileIdToIndex(savefileId));
    this.select(index);
    this.setTopRow(index - 2);
};

Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
    if (savefileId === 0) {
        this.drawText(TextManager.autosave, x, y, 180);
    } else {
        this.drawText(TextManager.file + " " + savefileId, x, y, 180);
    }
};

Window_SavefileList.prototype.drawContents = function(info, rect) {
    const bottom = rect.y + rect.height;
    if (rect.width >= 420) {
        this.drawPartyCharacters(info, rect.x + 220, bottom - 8);
    }
    const lineHeight = this.lineHeight();
    const y2 = bottom - lineHeight - 4;
    if (y2 >= lineHeight) {
        this.drawPlaytime(info, rect.x, y2, rect.width);
    }
};

Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
    if (info.characters) {
        let characterX = x;
        for (const data of info.characters) {
            this.drawCharacter(data[0], data[1], characterX, y);
            characterX += 48;
        }
    }
};

Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    if (info.playtime) {
        this.drawText(info.playtime, x, y, width, "right");
    }
};

Window_SavefileList.prototype.playOkSound = function() {
    //
};

