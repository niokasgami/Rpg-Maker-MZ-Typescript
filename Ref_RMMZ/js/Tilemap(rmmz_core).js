
/**
 * The tilemap which displays 2D tile-based game map.
 *
 * @class
 * @extends PIXI.Container
 */
function Tilemap() {
    this.initialize(...arguments);
}

Tilemap.prototype = Object.create(PIXI.Container.prototype);
Tilemap.prototype.constructor = Tilemap;

Tilemap.prototype.initialize = function() {
    PIXI.Container.call(this);

    this._width = Graphics.width;
    this._height = Graphics.height;
    this._margin = 20;
    this._tileWidth = 48;
    this._tileHeight = 48;
    this._mapWidth = 0;
    this._mapHeight = 0;
    this._mapData = null;
    this._bitmaps = [];

    /**
     * The origin point of the tilemap for scrolling.
     *
     * @type Point
     */
    this.origin = new Point();

    /**
     * The tileset flags.
     *
     * @type array
     */
    this.flags = [];

    /**
     * The animation count for autotiles.
     *
     * @type number
     */
    this.animationCount = 0;

    /**
     * Whether the tilemap loops horizontal.
     *
     * @type boolean
     */
    this.horizontalWrap = false;

    /**
     * Whether the tilemap loops vertical.
     *
     * @type boolean
     */
    this.verticalWrap = false;

    this._createLayers();
    this.refresh();
};

/**
 * The width of the tilemap.
 *
 * @type number
 * @name Tilemap#width
 */
Object.defineProperty(Tilemap.prototype, "width", {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
    },
    configurable: true
});

/**
 * The height of the tilemap.
 *
 * @type number
 * @name Tilemap#height
 */
Object.defineProperty(Tilemap.prototype, "height", {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
    },
    configurable: true
});

/**
 * Destroys the tilemap.
 */
Tilemap.prototype.destroy = function() {
    const options = { children: true, texture: true };
    PIXI.Container.prototype.destroy.call(this, options);
};

/**
 * Sets the tilemap data.
 *
 * @param {number} width - The width of the map in number of tiles.
 * @param {number} height - The height of the map in number of tiles.
 * @param {array} data - The one dimensional array for the map data.
 */
Tilemap.prototype.setData = function(width, height, data) {
    this._mapWidth = width;
    this._mapHeight = height;
    this._mapData = data;
};

/**
 * Checks whether the tileset is ready to render.
 *
 * @type boolean
 * @returns {boolean} True if the tilemap is ready.
 */
Tilemap.prototype.isReady = function() {
    for (const bitmap of this._bitmaps) {
        if (bitmap && !bitmap.isReady()) {
            return false;
        }
    }
    return true;
};

/**
 * Updates the tilemap for each frame.
 */
Tilemap.prototype.update = function() {
    this.animationCount++;
    this.animationFrame = Math.floor(this.animationCount / 30);
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};

/**
 * Sets the bitmaps used as a tileset.
 *
 * @param {array} bitmaps - The array of the tileset bitmaps.
 */
Tilemap.prototype.setBitmaps = function(bitmaps) {
    // [Note] We wait for the images to finish loading. Creating textures
    //   from bitmaps that are not yet loaded here brings some maintenance
    //   difficulties. e.g. PIXI overwrites img.onload internally.
    this._bitmaps = bitmaps;
    const listener = this._updateBitmaps.bind(this);
    for (const bitmap of this._bitmaps) {
        if (!bitmap.isReady()) {
            bitmap.addLoadListener(listener);
        }
    }
    this._needsBitmapsUpdate = true;
    this._updateBitmaps();
};

/**
 * Forces to repaint the entire tilemap.
 */
Tilemap.prototype.refresh = function() {
    this._needsRepaint = true;
};

/**
 * Updates the transform on all children of this container for rendering.
 */
Tilemap.prototype.updateTransform = function() {
    const ox = Math.ceil(this.origin.x);
    const oy = Math.ceil(this.origin.y);
    const startX = Math.floor((ox - this._margin) / this._tileWidth);
    const startY = Math.floor((oy - this._margin) / this._tileHeight);
    this._lowerLayer.x = startX * this._tileWidth - ox;
    this._lowerLayer.y = startY * this._tileHeight - oy;
    this._upperLayer.x = startX * this._tileWidth - ox;
    this._upperLayer.y = startY * this._tileHeight - oy;
    if (
        this._needsRepaint ||
        this._lastAnimationFrame !== this.animationFrame ||
        this._lastStartX !== startX ||
        this._lastStartY !== startY
    ) {
        this._lastAnimationFrame = this.animationFrame;
        this._lastStartX = startX;
        this._lastStartY = startY;
        this._addAllSpots(startX, startY);
        this._needsRepaint = false;
    }
    this._sortChildren();
    PIXI.Container.prototype.updateTransform.call(this);
};

Tilemap.prototype._createLayers = function() {
    /*
     * [Z coordinate]
     *  0 : Lower tiles
     *  1 : Lower characters
     *  3 : Normal characters
     *  4 : Upper tiles
     *  5 : Upper characters
     *  6 : Airship shadow
     *  7 : Balloon
     *  8 : Animation
     *  9 : Destination
     */
    this._lowerLayer = new Tilemap.Layer();
    this._lowerLayer.z = 0;
    this._upperLayer = new Tilemap.Layer();
    this._upperLayer.z = 4;
    this.addChild(this._lowerLayer);
    this.addChild(this._upperLayer);
    this._needsRepaint = true;
};

Tilemap.prototype._updateBitmaps = function() {
    if (this._needsBitmapsUpdate && this.isReady()) {
        this._lowerLayer.setBitmaps(this._bitmaps);
        this._needsBitmapsUpdate = false;
        this._needsRepaint = true;
    }
};

Tilemap.prototype._addAllSpots = function(startX, startY) {
    this._lowerLayer.clear();
    this._upperLayer.clear();
    const widthWithMatgin = this.width + this._margin * 2;
    const heightWithMatgin = this.height + this._margin * 2;
    const tileCols = Math.ceil(widthWithMatgin / this._tileWidth) + 1;
    const tileRows = Math.ceil(heightWithMatgin / this._tileHeight) + 1;
    for (let y = 0; y < tileRows; y++) {
        for (let x = 0; x < tileCols; x++) {
            this._addSpot(startX, startY, x, y);
        }
    }
};

Tilemap.prototype._addSpot = function(startX, startY, x, y) {
    const mx = startX + x;
    const my = startY + y;
    const dx = x * this._tileWidth;
    const dy = y * this._tileHeight;
    const tileId0 = this._readMapData(mx, my, 0);
    const tileId1 = this._readMapData(mx, my, 1);
    const tileId2 = this._readMapData(mx, my, 2);
    const tileId3 = this._readMapData(mx, my, 3);
    const shadowBits = this._readMapData(mx, my, 4);
    const upperTileId1 = this._readMapData(mx, my - 1, 1);

    this._addSpotTile(tileId0, dx, dy);
    this._addSpotTile(tileId1, dx, dy);
    this._addShadow(this._lowerLayer, shadowBits, dx, dy);
    if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
        if (!Tilemap.isShadowingTile(tileId0)) {
            this._addTableEdge(this._lowerLayer, upperTileId1, dx, dy);
        }
    }
    if (this._isOverpassPosition(mx, my)) {
        this._addTile(this._upperLayer, tileId2, dx, dy);
        this._addTile(this._upperLayer, tileId3, dx, dy);
    } else {
        this._addSpotTile(tileId2, dx, dy);
        this._addSpotTile(tileId3, dx, dy);
    }
};

Tilemap.prototype._addSpotTile = function(tileId, dx, dy) {
    if (this._isHigherTile(tileId)) {
        this._addTile(this._upperLayer, tileId, dx, dy);
    } else {
        this._addTile(this._lowerLayer, tileId, dx, dy);
    }
};

Tilemap.prototype._addTile = function(layer, tileId, dx, dy) {
    if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._addAutotile(layer, tileId, dx, dy);
        } else {
            this._addNormalTile(layer, tileId, dx, dy);
        }
    }
};

Tilemap.prototype._addNormalTile = function(layer, tileId, dx, dy) {
    let setNumber = 0;

    if (Tilemap.isTileA5(tileId)) {
        setNumber = 4;
    } else {
        setNumber = 5 + Math.floor(tileId / 256);
    }

    const w = this._tileWidth;
    const h = this._tileHeight;
    const sx = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * w;
    const sy = (Math.floor((tileId % 256) / 8) % 16) * h;

    layer.addRect(setNumber, sx, sy, dx, dy, w, h);
};

Tilemap.prototype._addAutotile = function(layer, tileId, dx, dy) {
    const kind = Tilemap.getAutotileKind(tileId);
    const shape = Tilemap.getAutotileShape(tileId);
    const tx = kind % 8;
    const ty = Math.floor(kind / 8);
    let setNumber = 0;
    let bx = 0;
    let by = 0;
    let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    let isTable = false;

    if (Tilemap.isTileA1(tileId)) {
        const waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
        setNumber = 0;
        if (kind === 0) {
            bx = waterSurfaceIndex * 2;
            by = 0;
        } else if (kind === 1) {
            bx = waterSurfaceIndex * 2;
            by = 3;
        } else if (kind === 2) {
            bx = 6;
            by = 0;
        } else if (kind === 3) {
            bx = 6;
            by = 3;
        } else {
            bx = Math.floor(tx / 4) * 8;
            by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;
            if (kind % 2 === 0) {
                bx += waterSurfaceIndex * 2;
            } else {
                bx += 6;
                autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                by += this.animationFrame % 3;
            }
        }
    } else if (Tilemap.isTileA2(tileId)) {
        setNumber = 1;
        bx = tx * 2;
        by = (ty - 2) * 3;
        isTable = this._isTableTile(tileId);
    } else if (Tilemap.isTileA3(tileId)) {
        setNumber = 2;
        bx = tx * 2;
        by = (ty - 6) * 2;
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    } else if (Tilemap.isTileA4(tileId)) {
        setNumber = 3;
        bx = tx * 2;
        by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
        if (ty % 2 === 1) {
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        }
    }

    const table = autotileTable[shape];
    const w1 = this._tileWidth / 2;
    const h1 = this._tileHeight / 2;
    for (let i = 0; i < 4; i++) {
        const qsx = table[i][0];
        const qsy = table[i][1];
        const sx1 = (bx * 2 + qsx) * w1;
        const sy1 = (by * 2 + qsy) * h1;
        const dx1 = dx + (i % 2) * w1;
        const dy1 = dy + Math.floor(i / 2) * h1;
        if (isTable && (qsy === 1 || qsy === 5)) {
            const qsx2 = qsy === 1 ? (4 - qsx) % 4 : qsx;
            const qsy2 = 3;
            const sx2 = (bx * 2 + qsx2) * w1;
            const sy2 = (by * 2 + qsy2) * h1;
            layer.addRect(setNumber, sx2, sy2, dx1, dy1, w1, h1);
            layer.addRect(setNumber, sx1, sy1, dx1, dy1 + h1 / 2, w1, h1 / 2);
        } else {
            layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1);
        }
    }
};

Tilemap.prototype._addTableEdge = function(layer, tileId, dx, dy) {
    if (Tilemap.isTileA2(tileId)) {
        const autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        const kind = Tilemap.getAutotileKind(tileId);
        const shape = Tilemap.getAutotileShape(tileId);
        const tx = kind % 8;
        const ty = Math.floor(kind / 8);
        const setNumber = 1;
        const bx = tx * 2;
        const by = (ty - 2) * 3;
        const table = autotileTable[shape];
        const w1 = this._tileWidth / 2;
        const h1 = this._tileHeight / 2;
        for (let i = 0; i < 2; i++) {
            const qsx = table[2 + i][0];
            const qsy = table[2 + i][1];
            const sx1 = (bx * 2 + qsx) * w1;
            const sy1 = (by * 2 + qsy) * h1 + h1 / 2;
            const dx1 = dx + (i % 2) * w1;
            const dy1 = dy + Math.floor(i / 2) * h1;
            layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1 / 2);
        }
    }
};

Tilemap.prototype._addShadow = function(layer, shadowBits, dx, dy) {
    if (shadowBits & 0x0f) {
        const w1 = this._tileWidth / 2;
        const h1 = this._tileHeight / 2;
        for (let i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;
                layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
            }
        }
    }
};

Tilemap.prototype._readMapData = function(x, y, z) {
    if (this._mapData) {
        const width = this._mapWidth;
        const height = this._mapHeight;
        if (this.horizontalWrap) {
            x = x.mod(width);
        }
        if (this.verticalWrap) {
            y = y.mod(height);
        }
        if (x >= 0 && x < width && y >= 0 && y < height) {
            return this._mapData[(z * height + y) * width + x] || 0;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

Tilemap.prototype._isHigherTile = function(tileId) {
    return this.flags[tileId] & 0x10;
};

Tilemap.prototype._isTableTile = function(tileId) {
    return Tilemap.isTileA2(tileId) && this.flags[tileId] & 0x80;
};

Tilemap.prototype._isOverpassPosition = function(/*mx, my*/) {
    return false;
};

Tilemap.prototype._sortChildren = function() {
    this.children.sort(this._compareChildOrder.bind(this));
};

Tilemap.prototype._compareChildOrder = function(a, b) {
    if (a.z !== b.z) {
        return a.z - b.z;
    } else if (a.y !== b.y) {
        return a.y - b.y;
    } else {
        return a.spriteId - b.spriteId;
    }
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Tile type checkers

Tilemap.TILE_ID_B = 0;
Tilemap.TILE_ID_C = 256;
Tilemap.TILE_ID_D = 512;
Tilemap.TILE_ID_E = 768;
Tilemap.TILE_ID_A5 = 1536;
Tilemap.TILE_ID_A1 = 2048;
Tilemap.TILE_ID_A2 = 2816;
Tilemap.TILE_ID_A3 = 4352;
Tilemap.TILE_ID_A4 = 5888;
Tilemap.TILE_ID_MAX = 8192;

Tilemap.isVisibleTile = function(tileId) {
    return tileId > 0 && tileId < this.TILE_ID_MAX;
};

Tilemap.isAutotile = function(tileId) {
    return tileId >= this.TILE_ID_A1;
};

Tilemap.getAutotileKind = function(tileId) {
    return Math.floor((tileId - this.TILE_ID_A1) / 48);
};

Tilemap.getAutotileShape = function(tileId) {
    return (tileId - this.TILE_ID_A1) % 48;
};

Tilemap.makeAutotileId = function(kind, shape) {
    return this.TILE_ID_A1 + kind * 48 + shape;
};

Tilemap.isSameKindTile = function(tileID1, tileID2) {
    if (this.isAutotile(tileID1) && this.isAutotile(tileID2)) {
        return this.getAutotileKind(tileID1) === this.getAutotileKind(tileID2);
    } else {
        return tileID1 === tileID2;
    }
};

Tilemap.isTileA1 = function(tileId) {
    return tileId >= this.TILE_ID_A1 && tileId < this.TILE_ID_A2;
};

Tilemap.isTileA2 = function(tileId) {
    return tileId >= this.TILE_ID_A2 && tileId < this.TILE_ID_A3;
};

Tilemap.isTileA3 = function(tileId) {
    return tileId >= this.TILE_ID_A3 && tileId < this.TILE_ID_A4;
};

Tilemap.isTileA4 = function(tileId) {
    return tileId >= this.TILE_ID_A4 && tileId < this.TILE_ID_MAX;
};

Tilemap.isTileA5 = function(tileId) {
    return tileId >= this.TILE_ID_A5 && tileId < this.TILE_ID_A1;
};

Tilemap.isWaterTile = function(tileId) {
    if (this.isTileA1(tileId)) {
        return !(
            tileId >= this.TILE_ID_A1 + 96 && tileId < this.TILE_ID_A1 + 192
        );
    } else {
        return false;
    }
};

Tilemap.isWaterfallTile = function(tileId) {
    if (tileId >= this.TILE_ID_A1 + 192 && tileId < this.TILE_ID_A2) {
        return this.getAutotileKind(tileId) % 2 === 1;
    } else {
        return false;
    }
};

Tilemap.isGroundTile = function(tileId) {
    return (
        this.isTileA1(tileId) || this.isTileA2(tileId) || this.isTileA5(tileId)
    );
};

Tilemap.isShadowingTile = function(tileId) {
    return this.isTileA3(tileId) || this.isTileA4(tileId);
};

Tilemap.isRoofTile = function(tileId) {
    return this.isTileA3(tileId) && this.getAutotileKind(tileId) % 16 < 8;
};

Tilemap.isWallTopTile = function(tileId) {
    return this.isTileA4(tileId) && this.getAutotileKind(tileId) % 16 < 8;
};

Tilemap.isWallSideTile = function(tileId) {
    return (
        (this.isTileA3(tileId) || this.isTileA4(tileId)) &&
        this.getAutotileKind(tileId) % 16 >= 8
    );
};

Tilemap.isWallTile = function(tileId) {
    return this.isWallTopTile(tileId) || this.isWallSideTile(tileId);
};

Tilemap.isFloorTypeAutotile = function(tileId) {
    return (
        (this.isTileA1(tileId) && !this.isWaterfallTile(tileId)) ||
        this.isTileA2(tileId) ||
        this.isWallTopTile(tileId)
    );
};

Tilemap.isWallTypeAutotile = function(tileId) {
    return this.isRoofTile(tileId) || this.isWallSideTile(tileId);
};

Tilemap.isWaterfallTypeAutotile = function(tileId) {
    return this.isWaterfallTile(tileId);
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Autotile shape number to coordinates of tileset images

// prettier-ignore
Tilemap.FLOOR_AUTOTILE_TABLE = [
    [[2, 4], [1, 4], [2, 3], [1, 3]],
    [[2, 0], [1, 4], [2, 3], [1, 3]],
    [[2, 4], [3, 0], [2, 3], [1, 3]],
    [[2, 0], [3, 0], [2, 3], [1, 3]],
    [[2, 4], [1, 4], [2, 3], [3, 1]],
    [[2, 0], [1, 4], [2, 3], [3, 1]],
    [[2, 4], [3, 0], [2, 3], [3, 1]],
    [[2, 0], [3, 0], [2, 3], [3, 1]],
    [[2, 4], [1, 4], [2, 1], [1, 3]],
    [[2, 0], [1, 4], [2, 1], [1, 3]],
    [[2, 4], [3, 0], [2, 1], [1, 3]],
    [[2, 0], [3, 0], [2, 1], [1, 3]],
    [[2, 4], [1, 4], [2, 1], [3, 1]],
    [[2, 0], [1, 4], [2, 1], [3, 1]],
    [[2, 4], [3, 0], [2, 1], [3, 1]],
    [[2, 0], [3, 0], [2, 1], [3, 1]],
    [[0, 4], [1, 4], [0, 3], [1, 3]],
    [[0, 4], [3, 0], [0, 3], [1, 3]],
    [[0, 4], [1, 4], [0, 3], [3, 1]],
    [[0, 4], [3, 0], [0, 3], [3, 1]],
    [[2, 2], [1, 2], [2, 3], [1, 3]],
    [[2, 2], [1, 2], [2, 3], [3, 1]],
    [[2, 2], [1, 2], [2, 1], [1, 3]],
    [[2, 2], [1, 2], [2, 1], [3, 1]],
    [[2, 4], [3, 4], [2, 3], [3, 3]],
    [[2, 4], [3, 4], [2, 1], [3, 3]],
    [[2, 0], [3, 4], [2, 3], [3, 3]],
    [[2, 0], [3, 4], [2, 1], [3, 3]],
    [[2, 4], [1, 4], [2, 5], [1, 5]],
    [[2, 0], [1, 4], [2, 5], [1, 5]],
    [[2, 4], [3, 0], [2, 5], [1, 5]],
    [[2, 0], [3, 0], [2, 5], [1, 5]],
    [[0, 4], [3, 4], [0, 3], [3, 3]],
    [[2, 2], [1, 2], [2, 5], [1, 5]],
    [[0, 2], [1, 2], [0, 3], [1, 3]],
    [[0, 2], [1, 2], [0, 3], [3, 1]],
    [[2, 2], [3, 2], [2, 3], [3, 3]],
    [[2, 2], [3, 2], [2, 1], [3, 3]],
    [[2, 4], [3, 4], [2, 5], [3, 5]],
    [[2, 0], [3, 4], [2, 5], [3, 5]],
    [[0, 4], [1, 4], [0, 5], [1, 5]],
    [[0, 4], [3, 0], [0, 5], [1, 5]],
    [[0, 2], [3, 2], [0, 3], [3, 3]],
    [[0, 2], [1, 2], [0, 5], [1, 5]],
    [[0, 4], [3, 4], [0, 5], [3, 5]],
    [[2, 2], [3, 2], [2, 5], [3, 5]],
    [[0, 2], [3, 2], [0, 5], [3, 5]],
    [[0, 0], [1, 0], [0, 1], [1, 1]]
];

// prettier-ignore
Tilemap.WALL_AUTOTILE_TABLE = [
    [[2, 2], [1, 2], [2, 1], [1, 1]],
    [[0, 2], [1, 2], [0, 1], [1, 1]],
    [[2, 0], [1, 0], [2, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[2, 2], [3, 2], [2, 1], [3, 1]],
    [[0, 2], [3, 2], [0, 1], [3, 1]],
    [[2, 0], [3, 0], [2, 1], [3, 1]],
    [[0, 0], [3, 0], [0, 1], [3, 1]],
    [[2, 2], [1, 2], [2, 3], [1, 3]],
    [[0, 2], [1, 2], [0, 3], [1, 3]],
    [[2, 0], [1, 0], [2, 3], [1, 3]],
    [[0, 0], [1, 0], [0, 3], [1, 3]],
    [[2, 2], [3, 2], [2, 3], [3, 3]],
    [[0, 2], [3, 2], [0, 3], [3, 3]],
    [[2, 0], [3, 0], [2, 3], [3, 3]],
    [[0, 0], [3, 0], [0, 3], [3, 3]]
];

// prettier-ignore
Tilemap.WATERFALL_AUTOTILE_TABLE = [
    [[2, 0], [1, 0], [2, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[2, 0], [3, 0], [2, 1], [3, 1]],
    [[0, 0], [3, 0], [0, 1], [3, 1]]
];

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Internal classes

Tilemap.Layer = function() {
    this.initialize(...arguments);
};

Tilemap.Layer.prototype = Object.create(PIXI.Container.prototype);
Tilemap.Layer.prototype.constructor = Tilemap.Layer;

Tilemap.Layer.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._elements = [];
    this._indexBuffer = null;
    this._indexArray = new Float32Array(0);
    this._vertexBuffer = null;
    this._vertexArray = new Float32Array(0);
    this._vao = null;
    this._needsTexturesUpdate = false;
    this._needsVertexUpdate = false;
    this._images = [];
    this._state = PIXI.State.for2d();
    this._createVao();
};

Tilemap.Layer.MAX_GL_TEXTURES = 3;
Tilemap.Layer.VERTEX_STRIDE = 9 * 4;

Tilemap.Layer.prototype.destroy = function() {
    if (this._vao) {
        this._vao.destroy();
        this._indexBuffer.destroy();
        this._vertexBuffer.destroy();
    }
    this._indexBuffer = null;
    this._vertexBuffer = null;
    this._vao = null;
};

Tilemap.Layer.prototype.setBitmaps = function(bitmaps) {
    this._images = bitmaps.map(bitmap => bitmap.image || bitmap.canvas);
    this._needsTexturesUpdate = true;
};

Tilemap.Layer.prototype.clear = function() {
    this._elements.length = 0;
    this._needsVertexUpdate = true;
};

Tilemap.Layer.prototype.addRect = function(setNumber, sx, sy, dx, dy, w, h) {
    this._elements.push([setNumber, sx, sy, dx, dy, w, h]);
};

Tilemap.Layer.prototype.render = function(renderer) {
    const gl = renderer.gl;
    const tilemapRenderer = renderer.plugins.rpgtilemap;
    const shader = tilemapRenderer.getShader();
    const matrix = shader.uniforms.uProjectionMatrix;

    renderer.batch.setObjectRenderer(tilemapRenderer);
    renderer.projection.projectionMatrix.copyTo(matrix);
    matrix.append(this.worldTransform);
    renderer.shader.bind(shader);

    if (this._needsTexturesUpdate) {
        tilemapRenderer.updateTextures(renderer, this._images);
        this._needsTexturesUpdate = false;
    }
    tilemapRenderer.bindTextures(renderer);
    renderer.geometry.bind(this._vao, shader);
    this._updateIndexBuffer();
    if (this._needsVertexUpdate) {
        this._updateVertexBuffer();
        this._needsVertexUpdate = false;
    }
    renderer.geometry.updateBuffers();

    const numElements = this._elements.length;
    if (numElements > 0) {
        renderer.state.set(this._state);
        renderer.geometry.draw(gl.TRIANGLES, numElements * 6, 0);
    }
};

Tilemap.Layer.prototype.isReady = function() {
    if (this._images.length === 0) {
        return false;
    }
    for (const texture of this._images) {
        if (!texture || !texture.valid) {
            return false;
        }
    }
    return true;
};

Tilemap.Layer.prototype._createVao = function() {
    const ib = new PIXI.Buffer(null, true, true);
    const vb = new PIXI.Buffer(null, true, false);
    const stride = Tilemap.Layer.VERTEX_STRIDE;
    const type = PIXI.TYPES.FLOAT;
    const geometry = new PIXI.Geometry();
    this._indexBuffer = ib;
    this._vertexBuffer = vb;
    this._vao = geometry
        .addIndex(this._indexBuffer)
        .addAttribute("aTextureId", vb, 1, false, type, stride, 0)
        .addAttribute("aFrame", vb, 4, false, type, stride, 1 * 4)
        .addAttribute("aSource", vb, 2, false, type, stride, 5 * 4)
        .addAttribute("aDest", vb, 2, false, type, stride, 7 * 4);
};

Tilemap.Layer.prototype._updateIndexBuffer = function() {
    const numElements = this._elements.length;
    if (this._indexArray.length < numElements * 6 * 2) {
        this._indexArray = PIXI.utils.createIndicesForQuads(numElements * 2);
        this._indexBuffer.update(this._indexArray);
    }
};

Tilemap.Layer.prototype._updateVertexBuffer = function() {
    const numElements = this._elements.length;
    const required = numElements * Tilemap.Layer.VERTEX_STRIDE;
    if (this._vertexArray.length < required) {
        this._vertexArray = new Float32Array(required * 2);
    }
    const vertexArray = this._vertexArray;
    let index = 0;
    for (const item of this._elements) {
        const setNumber = item[0];
        const tid = setNumber >> 2;
        const sxOffset = 1024 * (setNumber & 1);
        const syOffset = 1024 * ((setNumber >> 1) & 1);
        const sx = item[1] + sxOffset;
        const sy = item[2] + syOffset;
        const dx = item[3];
        const dy = item[4];
        const w = item[5];
        const h = item[6];
        const frameLeft = sx + 0.5;
        const frameTop = sy + 0.5;
        const frameRight = sx + w - 0.5;
        const frameBottom = sy + h - 0.5;
        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = sx;
        vertexArray[index++] = sy;
        vertexArray[index++] = dx;
        vertexArray[index++] = dy;
        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = sx + w;
        vertexArray[index++] = sy;
        vertexArray[index++] = dx + w;
        vertexArray[index++] = dy;
        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = sx + w;
        vertexArray[index++] = sy + h;
        vertexArray[index++] = dx + w;
        vertexArray[index++] = dy + h;
        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = sx;
        vertexArray[index++] = sy + h;
        vertexArray[index++] = dx;
        vertexArray[index++] = dy + h;
    }
    this._vertexBuffer.update(vertexArray);
};

Tilemap.Renderer = function() {
    this.initialize(...arguments);
};

Tilemap.Renderer.prototype = Object.create(PIXI.ObjectRenderer.prototype);
Tilemap.Renderer.prototype.constructor = Tilemap.Renderer;

Tilemap.Renderer.prototype.initialize = function(renderer) {
    PIXI.ObjectRenderer.call(this, renderer);
    this._shader = null;
    this._images = [];
    this._internalTextures = [];
    this._clearBuffer = new Uint8Array(1024 * 1024 * 4);
    this.contextChange();
};

Tilemap.Renderer.prototype.destroy = function() {
    PIXI.ObjectRenderer.prototype.destroy.call(this);
    this._destroyInternalTextures();
    this._shader.destroy();
    this._shader = null;
};

Tilemap.Renderer.prototype.getShader = function() {
    return this._shader;
};

Tilemap.Renderer.prototype.contextChange = function() {
    this._shader = this._createShader();
    this._images = [];
    this._createInternalTextures();
};

Tilemap.Renderer.prototype._createShader = function() {
    const vertexSrc =
        "attribute float aTextureId;" +
        "attribute vec4 aFrame;" +
        "attribute vec2 aSource;" +
        "attribute vec2 aDest;" +
        "uniform mat3 uProjectionMatrix;" +
        "varying vec4 vFrame;" +
        "varying vec2 vTextureCoord;" +
        "varying float vTextureId;" +
        "void main(void) {" +
        "  vec3 position = uProjectionMatrix * vec3(aDest, 1.0);" +
        "  gl_Position = vec4(position, 1.0);" +
        "  vFrame = aFrame;" +
        "  vTextureCoord = aSource;" +
        "  vTextureId = aTextureId;" +
        "}";
    const fragmentSrc =
        "varying vec4 vFrame;" +
        "varying vec2 vTextureCoord;" +
        "varying float vTextureId;" +
        "uniform sampler2D uSampler0;" +
        "uniform sampler2D uSampler1;" +
        "uniform sampler2D uSampler2;" +
        "void main(void) {" +
        "  vec2 textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);" +
        "  int textureId = int(vTextureId);" +
        "  vec4 color;" +
        "  if (textureId < 0) {" +
        "    color = vec4(0.0, 0.0, 0.0, 0.5);" +
        "  } else if (textureId == 0) {" +
        "    color = texture2D(uSampler0, textureCoord / 2048.0);" +
        "  } else if (textureId == 1) {" +
        "    color = texture2D(uSampler1, textureCoord / 2048.0);" +
        "  } else if (textureId == 2) {" +
        "    color = texture2D(uSampler2, textureCoord / 2048.0);" +
        "  }" +
        "  gl_FragColor = color;" +
        "}";

    return new PIXI.Shader(PIXI.Program.from(vertexSrc, fragmentSrc), {
        uSampler0: 0,
        uSampler1: 1,
        uSampler2: 2,
        uProjectionMatrix: new PIXI.Matrix()
    });
};

Tilemap.Renderer.prototype._createInternalTextures = function() {
    this._destroyInternalTextures();
    for (let i = 0; i < Tilemap.Layer.MAX_GL_TEXTURES; i++) {
        const baseTexture = new PIXI.BaseRenderTexture();
        baseTexture.resize(2048, 2048);
        baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this._internalTextures.push(baseTexture);
    }
};

Tilemap.Renderer.prototype._destroyInternalTextures = function() {
    for (const internalTexture of this._internalTextures) {
        internalTexture.destroy();
    }
    this._internalTextures = [];
};

Tilemap.Renderer.prototype.updateTextures = function(renderer, images) {
    for (let i = 0; i < images.length; i++) {
        const internalTexture = this._internalTextures[i >> 2];
        renderer.texture.bind(internalTexture, 0);
        const gl = renderer.gl;
        const x = 1024 * (i % 2);
        const y = 1024 * ((i >> 1) % 2);
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        // prettier-ignore
        gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, 1024, 1024, format, type,
                         this._clearBuffer);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, format, type, images[i]);
    }
};

Tilemap.Renderer.prototype.bindTextures = function(renderer) {
    for (let ti = 0; ti < Tilemap.Layer.MAX_GL_TEXTURES; ti++) {
        renderer.texture.bind(this._internalTextures[ti], ti);
    }
};

PIXI.Renderer.registerPlugin("rpgtilemap", Tilemap.Renderer);

