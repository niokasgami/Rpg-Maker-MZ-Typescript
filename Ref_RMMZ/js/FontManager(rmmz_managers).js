
// FontManager
//
// The static class that loads font files.

function FontManager() {
    throw new Error("This is a static class");
}

FontManager._urls = {};
FontManager._states = {};

FontManager.load = function(family, filename) {
    if (this._states[family] !== "loaded") {
        if (filename) {
            const url = this.makeUrl(filename);
            this.startLoading(family, url);
        } else {
            this._urls[family] = "";
            this._states[family] = "loaded";
        }
    }
};

FontManager.isReady = function() {
    for (const family in this._states) {
        const state = this._states[family];
        if (state === "loading") {
            return false;
        }
        if (state === "error") {
            this.throwLoadError(family);
        }
    }
    return true;
};

FontManager.startLoading = function(family, url) {
    const source = "url(" + url + ")";
    const font = new FontFace(family, source);
    this._urls[family] = url;
    this._states[family] = "loading";
    font.load()
        .then(() => {
            document.fonts.add(font);
            this._states[family] = "loaded";
            return 0;
        })
        .catch(() => {
            this._states[family] = "error";
        });
};

FontManager.throwLoadError = function(family) {
    const url = this._urls[family];
    const retry = () => this.startLoading(family, url);
    throw ["LoadError", url, retry];
};

FontManager.makeUrl = function(filename) {
    return "fonts/" + Utils.encodeURI(filename);
};

