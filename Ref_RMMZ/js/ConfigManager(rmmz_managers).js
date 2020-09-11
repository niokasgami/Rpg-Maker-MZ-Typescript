
// ConfigManager
//
// The static class that manages the configuration data.

function ConfigManager() {
    throw new Error("This is a static class");
}

ConfigManager.alwaysDash = false;
ConfigManager.commandRemember = false;
ConfigManager.touchUI = true;
ConfigManager._isLoaded = false;

Object.defineProperty(ConfigManager, "bgmVolume", {
    get: function() {
        return AudioManager._bgmVolume;
    },
    set: function(value) {
        AudioManager.bgmVolume = value;
    },
    configurable: true
});

Object.defineProperty(ConfigManager, "bgsVolume", {
    get: function() {
        return AudioManager.bgsVolume;
    },
    set: function(value) {
        AudioManager.bgsVolume = value;
    },
    configurable: true
});

Object.defineProperty(ConfigManager, "meVolume", {
    get: function() {
        return AudioManager.meVolume;
    },
    set: function(value) {
        AudioManager.meVolume = value;
    },
    configurable: true
});

Object.defineProperty(ConfigManager, "seVolume", {
    get: function() {
        return AudioManager.seVolume;
    },
    set: function(value) {
        AudioManager.seVolume = value;
    },
    configurable: true
});

ConfigManager.load = function() {
    StorageManager.loadObject("config")
        .then(config => this.applyData(config || {}))
        .catch(() => 0)
        .then(() => {
            this._isLoaded = true;
            return 0;
        })
        .catch(() => 0);
};

ConfigManager.save = function() {
    StorageManager.saveObject("config", this.makeData());
};

ConfigManager.isLoaded = function() {
    return this._isLoaded;
};

ConfigManager.makeData = function() {
    const config = {};
    config.alwaysDash = this.alwaysDash;
    config.commandRemember = this.commandRemember;
    config.touchUI = this.touchUI;
    config.bgmVolume = this.bgmVolume;
    config.bgsVolume = this.bgsVolume;
    config.meVolume = this.meVolume;
    config.seVolume = this.seVolume;
    return config;
};

ConfigManager.applyData = function(config) {
    this.alwaysDash = this.readFlag(config, "alwaysDash", false);
    this.commandRemember = this.readFlag(config, "commandRemember", false);
    this.touchUI = this.readFlag(config, "touchUI", true);
    this.bgmVolume = this.readVolume(config, "bgmVolume");
    this.bgsVolume = this.readVolume(config, "bgsVolume");
    this.meVolume = this.readVolume(config, "meVolume");
    this.seVolume = this.readVolume(config, "seVolume");
};

ConfigManager.readFlag = function(config, name, defaultValue) {
    if (name in config) {
        return !!config[name];
    } else {
        return defaultValue;
    }
};

ConfigManager.readVolume = function(config, name) {
    if (name in config) {
        return Number(config[name]).clamp(0, 100);
    } else {
        return 100;
    }
};

