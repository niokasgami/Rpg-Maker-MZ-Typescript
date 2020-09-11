
// EffectManager
//
// The static class that loads Effekseer effects.

function EffectManager() {
    throw new Error("This is a static class");
}

EffectManager._cache = {};
EffectManager._errorUrls = [];

EffectManager.load = function(filename) {
    if (filename) {
        const url = this.makeUrl(filename);
        const cache = this._cache;
        if (!cache[url] && Graphics.effekseer) {
            this.startLoading(url);
        }
        return cache[url];
    } else {
        return null;
    }
};

EffectManager.startLoading = function(url) {
    const onLoad = () => this.onLoad(url);
    const onError = () => this.onError(url);
    const effect = Graphics.effekseer.loadEffect(url, 1, onLoad, onError);
    this._cache[url] = effect;
    return effect;
};

EffectManager.clear = function() {
    for (const url in this._cache) {
        const effect = this._cache[url];
        Graphics.effekseer.releaseEffect(effect);
    }
    this._cache = {};
};

EffectManager.onLoad = function(/*url*/) {
    //
};

EffectManager.onError = function(url) {
    this._errorUrls.push(url);
};

EffectManager.makeUrl = function(filename) {
    return "effects/" + Utils.encodeURI(filename) + ".efkefc";
};

EffectManager.checkErrors = function() {
    const url = this._errorUrls.shift();
    if (url) {
        this.throwLoadError(url);
    }
};

EffectManager.throwLoadError = function(url) {
    const retry = () => this.startLoading(url);
    throw ["LoadError", url, retry];
};

EffectManager.isReady = function() {
    this.checkErrors();
    for (const url in this._cache) {
        const effect = this._cache[url];
        if (!effect.isLoaded) {
            return false;
        }
    }
    return true;
};

