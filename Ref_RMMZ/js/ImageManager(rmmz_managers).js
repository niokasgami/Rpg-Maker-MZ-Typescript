
// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.

function ImageManager() {
    throw new Error("This is a static class");
}

ImageManager.iconWidth = 32;
ImageManager.iconHeight = 32;
ImageManager.faceWidth = 144;
ImageManager.faceHeight = 144;

ImageManager._cache = {};
ImageManager._system = {};
ImageManager._emptyBitmap = new Bitmap(1, 1);

ImageManager.loadAnimation = function(filename) {
    return this.loadBitmap("img/animations/", filename);
};

ImageManager.loadBattleback1 = function(filename) {
    return this.loadBitmap("img/battlebacks1/", filename);
};

ImageManager.loadBattleback2 = function(filename) {
    return this.loadBitmap("img/battlebacks2/", filename);
};

ImageManager.loadEnemy = function(filename) {
    return this.loadBitmap("img/enemies/", filename);
};

ImageManager.loadCharacter = function(filename) {
    return this.loadBitmap("img/characters/", filename);
};

ImageManager.loadFace = function(filename) {
    return this.loadBitmap("img/faces/", filename);
};

ImageManager.loadParallax = function(filename) {
    return this.loadBitmap("img/parallaxes/", filename);
};

ImageManager.loadPicture = function(filename) {
    return this.loadBitmap("img/pictures/", filename);
};

ImageManager.loadSvActor = function(filename) {
    return this.loadBitmap("img/sv_actors/", filename);
};

ImageManager.loadSvEnemy = function(filename) {
    return this.loadBitmap("img/sv_enemies/", filename);
};

ImageManager.loadSystem = function(filename) {
    return this.loadBitmap("img/system/", filename);
};

ImageManager.loadTileset = function(filename) {
    return this.loadBitmap("img/tilesets/", filename);
};

ImageManager.loadTitle1 = function(filename) {
    return this.loadBitmap("img/titles1/", filename);
};

ImageManager.loadTitle2 = function(filename) {
    return this.loadBitmap("img/titles2/", filename);
};

ImageManager.loadBitmap = function(folder, filename) {
    if (filename) {
        const url = folder + Utils.encodeURI(filename) + ".png";
        return this.loadBitmapFromUrl(url);
    } else {
        return this._emptyBitmap;
    }
};

ImageManager.loadBitmapFromUrl = function(url) {
    const cache = url.includes("/system/") ? this._system : this._cache;
    if (!cache[url]) {
        cache[url] = Bitmap.load(url);
    }
    return cache[url];
};

ImageManager.clear = function() {
    const cache = this._cache;
    for (const url in cache) {
        cache[url].destroy();
    }
    this._cache = {};
};

ImageManager.isReady = function() {
    for (const cache of [this._cache, this._system]) {
        for (const url in cache) {
            const bitmap = cache[url];
            if (bitmap.isError()) {
                this.throwLoadError(bitmap);
            }
            if (!bitmap.isReady()) {
                return false;
            }
        }
    }
    return true;
};

ImageManager.throwLoadError = function(bitmap) {
    const retry = bitmap.retry.bind(bitmap);
    throw ["LoadError", bitmap.url, retry];
};

ImageManager.isObjectCharacter = function(filename) {
    const sign = filename.match(/^[!$]+/);
    return sign && sign[0].includes("!");
};

ImageManager.isBigCharacter = function(filename) {
    const sign = filename.match(/^[!$]+/);
    return sign && sign[0].includes("$");
};

ImageManager.isZeroParallax = function(filename) {
    return filename.charAt(0) === "!";
};

