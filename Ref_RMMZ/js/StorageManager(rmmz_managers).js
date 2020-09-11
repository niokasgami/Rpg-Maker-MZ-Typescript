
// StorageManager
//
// The static class that manages storage for saving game data.

function StorageManager() {
    throw new Error("This is a static class");
}

StorageManager._forageKeys = [];
StorageManager._forageKeysUpdated = false;

StorageManager.isLocalMode = function() {
    return Utils.isNwjs();
};

StorageManager.saveObject = function(saveName, object) {
    return this.objectToJson(object)
        .then(json => this.jsonToZip(json))
        .then(zip => this.saveZip(saveName, zip));
};

StorageManager.loadObject = function(saveName) {
    return this.loadZip(saveName)
        .then(zip => this.zipToJson(zip))
        .then(json => this.jsonToObject(json));
};

StorageManager.objectToJson = function(object) {
    return new Promise((resolve, reject) => {
        try {
            const json = JsonEx.stringify(object);
            resolve(json);
        } catch (e) {
            reject(e);
        }
    });
};

StorageManager.jsonToObject = function(json) {
    return new Promise((resolve, reject) => {
        try {
            const object = JsonEx.parse(json);
            resolve(object);
        } catch (e) {
            reject(e);
        }
    });
};

StorageManager.jsonToZip = function(json) {
    return new Promise((resolve, reject) => {
        try {
            const zip = pako.deflate(json, { to: "string", level: 1 });
            if (zip.length >= 50000) {
                console.warn("Save data is too big.");
            }
            resolve(zip);
        } catch (e) {
            reject(e);
        }
    });
};

StorageManager.zipToJson = function(zip) {
    return new Promise((resolve, reject) => {
        try {
            if (zip) {
                const json = pako.inflate(zip, { to: "string" });
                resolve(json);
            } else {
                resolve("null");
            }
        } catch (e) {
            reject(e);
        }
    });
};

StorageManager.saveZip = function(saveName, zip) {
    if (this.isLocalMode()) {
        return this.saveToLocalFile(saveName, zip);
    } else {
        return this.saveToForage(saveName, zip);
    }
};

StorageManager.loadZip = function(saveName) {
    if (this.isLocalMode()) {
        return this.loadFromLocalFile(saveName);
    } else {
        return this.loadFromForage(saveName);
    }
};

StorageManager.exists = function(saveName) {
    if (this.isLocalMode()) {
        return this.localFileExists(saveName);
    } else {
        return this.forageExists(saveName);
    }
};

StorageManager.remove = function(saveName) {
    if (this.isLocalMode()) {
        return this.removeLocalFile(saveName);
    } else {
        return this.removeForage(saveName);
    }
};

StorageManager.saveToLocalFile = function(saveName, zip) {
    const dirPath = this.fileDirectoryPath();
    const filePath = this.filePath(saveName);
    const backupFilePath = filePath + "_";
    return new Promise((resolve, reject) => {
        this.fsMkdir(dirPath);
        this.fsUnlink(backupFilePath);
        this.fsRename(filePath, backupFilePath);
        try {
            this.fsWriteFile(filePath, zip);
            this.fsUnlink(backupFilePath);
            resolve();
        } catch (e) {
            try {
                this.fsUnlink(filePath);
                this.fsRename(backupFilePath, filePath);
            } catch (e2) {
                //
            }
            reject(e);
        }
    });
};

StorageManager.loadFromLocalFile = function(saveName) {
    const filePath = this.filePath(saveName);
    return new Promise((resolve, reject) => {
        const data = this.fsReadFile(filePath);
        if (data) {
            resolve(data);
        } else {
            reject(new Error("Savefile not found"));
        }
    });
};

StorageManager.localFileExists = function(saveName) {
    const fs = require("fs");
    return fs.existsSync(this.filePath(saveName));
};

StorageManager.removeLocalFile = function(saveName) {
    this.fsUnlink(this.filePath(saveName));
};

StorageManager.saveToForage = function(saveName, zip) {
    const key = this.forageKey(saveName);
    const testKey = this.forageTestKey();
    setTimeout(() => localforage.removeItem(testKey));
    return localforage
        .setItem(testKey, zip)
        .then(localforage.setItem(key, zip))
        .then(this.updateForageKeys());
};

StorageManager.loadFromForage = function(saveName) {
    const key = this.forageKey(saveName);
    return localforage.getItem(key);
};

StorageManager.forageExists = function(saveName) {
    const key = this.forageKey(saveName);
    return this._forageKeys.includes(key);
};

StorageManager.removeForage = function(saveName) {
    const key = this.forageKey(saveName);
    return localforage.removeItem(key).then(this.updateForageKeys());
};

StorageManager.updateForageKeys = function() {
    this._forageKeysUpdated = false;
    return localforage.keys().then(keys => {
        this._forageKeys = keys;
        this._forageKeysUpdated = true;
        return 0;
    });
};

StorageManager.forageKeysUpdated = function() {
    return this._forageKeysUpdated;
};

StorageManager.fsMkdir = function(path) {
    const fs = require("fs");
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

StorageManager.fsRename = function(oldPath, newPath) {
    const fs = require("fs");
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
    }
};

StorageManager.fsUnlink = function(path) {
    const fs = require("fs");
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

StorageManager.fsReadFile = function(path) {
    const fs = require("fs");
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, { encoding: "utf8" });
    } else {
        return null;
    }
};

StorageManager.fsWriteFile = function(path, data) {
    const fs = require("fs");
    fs.writeFileSync(path, data);
};

StorageManager.fileDirectoryPath = function() {
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);
    return path.join(base, "save/");
};

StorageManager.filePath = function(saveName) {
    const dir = this.fileDirectoryPath();
    return dir + saveName + ".rmmzsave";
};

StorageManager.forageKey = function(saveName) {
    const gameId = $dataSystem.advanced.gameId;
    return "rmmzsave." + gameId + "." + saveName;
};

StorageManager.forageTestKey = function() {
    return "rmmzsave.test";
};

