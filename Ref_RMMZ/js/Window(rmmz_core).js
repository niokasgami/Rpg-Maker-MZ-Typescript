
/**
 * The window in the game.
 *
 * @class
 * @extends PIXI.Container
 */
function Window() {
    this.initialize(...arguments);
}

Window.prototype = Object.create(PIXI.Container.prototype);
Window.prototype.constructor = Window;

Window.prototype.initialize = function() {
    PIXI.Container.call(this);

    this._isWindow = true;
    this._windowskin = null;
    this._width = 0;
    this._height = 0;
    this._cursorRect = new Rectangle();
    this._openness = 255;
    this._animationCount = 0;

    this._padding = 12;
    this._margin = 4;
    this._colorTone = [0, 0, 0, 0];
    this._innerChildren = [];

    this._container = null;
    this._backSprite = null;
    this._frameSprite = null;
    this._contentsBackSprite = null;
    this._cursorSprite = null;
    this._contentsSprite = null;
    this._downArrowSprite = null;
    this._upArrowSprite = null;
    this._pauseSignSprite = null;

    this._createAllParts();

    /**
     * The origin point of the window for scrolling.
     *
     * @type Point
     */
    this.origin = new Point();

    /**
     * The active state for the window.
     *
     * @type boolean
     */
    this.active = true;

    /**
     * The visibility of the frame.
     *
     * @type boolean
     */
    this.frameVisible = true;

    /**
     * The visibility of the cursor.
     *
     * @type boolean
     */
    this.cursorVisible = true;

    /**
     * The visibility of the down scroll arrow.
     *
     * @type boolean
     */
    this.downArrowVisible = false;

    /**
     * The visibility of the up scroll arrow.
     *
     * @type boolean
     */
    this.upArrowVisible = false;

    /**
     * The visibility of the pause sign.
     *
     * @type boolean
     */
    this.pause = false;
};

/**
 * The image used as a window skin.
 *
 * @type Bitmap
 * @name Window#windowskin
 */
Object.defineProperty(Window.prototype, "windowskin", {
    get: function() {
        return this._windowskin;
    },
    set: function(value) {
        if (this._windowskin !== value) {
            this._windowskin = value;
            this._windowskin.addLoadListener(this._onWindowskinLoad.bind(this));
        }
    },
    configurable: true
});

/**
 * The bitmap used for the window contents.
 *
 * @type Bitmap
 * @name Window#contents
 */
Object.defineProperty(Window.prototype, "contents", {
    get: function() {
        return this._contentsSprite.bitmap;
    },
    set: function(value) {
        this._contentsSprite.bitmap = value;
    },
    configurable: true
});

/**
 * The bitmap used for the window contents background.
 *
 * @type Bitmap
 * @name Window#contentsBack
 */
Object.defineProperty(Window.prototype, "contentsBack", {
    get: function() {
        return this._contentsBackSprite.bitmap;
    },
    set: function(value) {
        this._contentsBackSprite.bitmap = value;
    },
    configurable: true
});

/**
 * The width of the window in pixels.
 *
 * @type number
 * @name Window#width
 */
Object.defineProperty(Window.prototype, "width", {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The height of the window in pixels.
 *
 * @type number
 * @name Window#height
 */
Object.defineProperty(Window.prototype, "height", {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The size of the padding between the frame and contents.
 *
 * @type number
 * @name Window#padding
 */
Object.defineProperty(Window.prototype, "padding", {
    get: function() {
        return this._padding;
    },
    set: function(value) {
        this._padding = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The size of the margin for the window background.
 *
 * @type number
 * @name Window#margin
 */
Object.defineProperty(Window.prototype, "margin", {
    get: function() {
        return this._margin;
    },
    set: function(value) {
        this._margin = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The opacity of the window without contents (0 to 255).
 *
 * @type number
 * @name Window#opacity
 */
Object.defineProperty(Window.prototype, "opacity", {
    get: function() {
        return this._container.alpha * 255;
    },
    set: function(value) {
        this._container.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The opacity of the window background (0 to 255).
 *
 * @type number
 * @name Window#backOpacity
 */
Object.defineProperty(Window.prototype, "backOpacity", {
    get: function() {
        return this._backSprite.alpha * 255;
    },
    set: function(value) {
        this._backSprite.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The opacity of the window contents (0 to 255).
 *
 * @type number
 * @name Window#contentsOpacity
 */
Object.defineProperty(Window.prototype, "contentsOpacity", {
    get: function() {
        return this._contentsSprite.alpha * 255;
    },
    set: function(value) {
        this._contentsSprite.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The openness of the window (0 to 255).
 *
 * @type number
 * @name Window#openness
 */
Object.defineProperty(Window.prototype, "openness", {
    get: function() {
        return this._openness;
    },
    set: function(value) {
        if (this._openness !== value) {
            this._openness = value.clamp(0, 255);
            this._container.scale.y = this._openness / 255;
            this._container.y = (this.height / 2) * (1 - this._openness / 255);
        }
    },
    configurable: true
});

/**
 * The width of the content area in pixels.
 *
 * @readonly
 * @type number
 * @name Window#innerWidth
 */
Object.defineProperty(Window.prototype, "innerWidth", {
    get: function() {
        return Math.max(0, this._width - this._padding * 2);
    },
    configurable: true
});

/**
 * The height of the content area in pixels.
 *
 * @readonly
 * @type number
 * @name Window#innerHeight
 */
Object.defineProperty(Window.prototype, "innerHeight", {
    get: function() {
        return Math.max(0, this._height - this._padding * 2);
    },
    configurable: true
});

/**
 * The rectangle of the content area.
 *
 * @readonly
 * @type Rectangle
 * @name Window#innerRect
 */
Object.defineProperty(Window.prototype, "innerRect", {
    get: function() {
        return new Rectangle(
            this._padding,
            this._padding,
            this.innerWidth,
            this.innerHeight
        );
    },
    configurable: true
});

/**
 * Destroys the window.
 */
Window.prototype.destroy = function() {
    const options = { children: true, texture: true };
    PIXI.Container.prototype.destroy.call(this, options);
};

/**
 * Updates the window for each frame.
 */
Window.prototype.update = function() {
    if (this.active) {
        this._animationCount++;
    }
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};

/**
 * Sets the x, y, width, and height all at once.
 *
 * @param {number} x - The x coordinate of the window.
 * @param {number} y - The y coordinate of the window.
 * @param {number} width - The width of the window.
 * @param {number} height - The height of the window.
 */
Window.prototype.move = function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    if (this._width !== width || this._height !== height) {
        this._width = width || 0;
        this._height = height || 0;
        this._refreshAllParts();
    }
};

/**
 * Checks whether the window is completely open (openness == 255).
 *
 * @returns {boolean} True if the window is open.
 */
Window.prototype.isOpen = function() {
    return this._openness >= 255;
};

/**
 * Checks whether the window is completely closed (openness == 0).
 *
 * @returns {boolean} True if the window is closed.
 */
Window.prototype.isClosed = function() {
    return this._openness <= 0;
};

/**
 * Sets the position of the command cursor.
 *
 * @param {number} x - The x coordinate of the cursor.
 * @param {number} y - The y coordinate of the cursor.
 * @param {number} width - The width of the cursor.
 * @param {number} height - The height of the cursor.
 */
Window.prototype.setCursorRect = function(x, y, width, height) {
    const cw = Math.floor(width || 0);
    const ch = Math.floor(height || 0);
    this._cursorRect.x = Math.floor(x || 0);
    this._cursorRect.y = Math.floor(y || 0);
    if (this._cursorRect.width !== cw || this._cursorRect.height !== ch) {
        this._cursorRect.width = cw;
        this._cursorRect.height = ch;
        this._refreshCursor();
    }
};

/**
 * Moves the cursor position by the given amount.
 *
 * @param {number} x - The amount of horizontal movement.
 * @param {number} y - The amount of vertical movement.
 */
Window.prototype.moveCursorBy = function(x, y) {
    this._cursorRect.x += x;
    this._cursorRect.y += y;
};

/**
 * Moves the inner children by the given amount.
 *
 * @param {number} x - The amount of horizontal movement.
 * @param {number} y - The amount of vertical movement.
 */
Window.prototype.moveInnerChildrenBy = function(x, y) {
    for (const child of this._innerChildren) {
        child.x += x;
        child.y += y;
    }
};

/**
 * Changes the color of the background.
 *
 * @param {number} r - The red value in the range (-255, 255).
 * @param {number} g - The green value in the range (-255, 255).
 * @param {number} b - The blue value in the range (-255, 255).
 */
Window.prototype.setTone = function(r, g, b) {
    const tone = this._colorTone;
    if (r !== tone[0] || g !== tone[1] || b !== tone[2]) {
        this._colorTone = [r, g, b, 0];
        this._refreshBack();
    }
};

/**
 * Adds a child between the background and contents.
 *
 * @param {object} child - The child to add.
 * @returns {object} The child that was added.
 */
Window.prototype.addChildToBack = function(child) {
    const containerIndex = this.children.indexOf(this._container);
    return this.addChildAt(child, containerIndex + 1);
};

/**
 * Adds a child to the client area.
 *
 * @param {object} child - The child to add.
 * @returns {object} The child that was added.
 */
Window.prototype.addInnerChild = function(child) {
    this._innerChildren.push(child);
    return this._clientArea.addChild(child);
};

/**
 * Updates the transform on all children of this container for rendering.
 */
Window.prototype.updateTransform = function() {
    this._updateClientArea();
    this._updateFrame();
    this._updateContentsBack();
    this._updateCursor();
    this._updateContents();
    this._updateArrows();
    this._updatePauseSign();
    PIXI.Container.prototype.updateTransform.call(this);
    this._updateFilterArea();
};

/**
 * Draws the window shape into PIXI.Graphics object. Used by WindowLayer.
 */
Window.prototype.drawShape = function(graphics) {
    if (graphics) {
        const width = this.width;
        const height = (this.height * this._openness) / 255;
        const x = this.x;
        const y = this.y + (this.height - height) / 2;
        graphics.beginFill(0xffffff);
        graphics.drawRoundedRect(x, y, width, height, 0);
        graphics.endFill();
    }
};

Window.prototype._createAllParts = function() {
    this._createContainer();
    this._createBackSprite();
    this._createFrameSprite();
    this._createClientArea();
    this._createContentsBackSprite();
    this._createCursorSprite();
    this._createContentsSprite();
    this._createArrowSprites();
    this._createPauseSignSprites();
};

Window.prototype._createContainer = function() {
    this._container = new PIXI.Container();
    this.addChild(this._container);
};

Window.prototype._createBackSprite = function() {
    this._backSprite = new Sprite();
    this._backSprite.addChild(new TilingSprite());
    this._container.addChild(this._backSprite);
};

Window.prototype._createFrameSprite = function() {
    this._frameSprite = new Sprite();
    for (let i = 0; i < 8; i++) {
        this._frameSprite.addChild(new Sprite());
    }
    this._container.addChild(this._frameSprite);
};

Window.prototype._createClientArea = function() {
    this._clientArea = new Sprite();
    this._clientArea.filters = [new PIXI.filters.AlphaFilter()];
    this._clientArea.filterArea = new Rectangle();
    this._clientArea.move(this._padding, this._padding);
    this.addChild(this._clientArea);
};

Window.prototype._createContentsBackSprite = function() {
    this._contentsBackSprite = new Sprite();
    this._clientArea.addChild(this._contentsBackSprite);
};

Window.prototype._createCursorSprite = function() {
    this._cursorSprite = new Sprite();
    for (let i = 0; i < 9; i++) {
        this._cursorSprite.addChild(new Sprite());
    }
    this._clientArea.addChild(this._cursorSprite);
};

Window.prototype._createContentsSprite = function() {
    this._contentsSprite = new Sprite();
    this._clientArea.addChild(this._contentsSprite);
};

Window.prototype._createArrowSprites = function() {
    this._downArrowSprite = new Sprite();
    this.addChild(this._downArrowSprite);
    this._upArrowSprite = new Sprite();
    this.addChild(this._upArrowSprite);
};

Window.prototype._createPauseSignSprites = function() {
    this._pauseSignSprite = new Sprite();
    this.addChild(this._pauseSignSprite);
};

Window.prototype._onWindowskinLoad = function() {
    this._refreshAllParts();
};

Window.prototype._refreshAllParts = function() {
    this._refreshBack();
    this._refreshFrame();
    this._refreshCursor();
    this._refreshArrows();
    this._refreshPauseSign();
};

Window.prototype._refreshBack = function() {
    const m = this._margin;
    const w = Math.max(0, this._width - m * 2);
    const h = Math.max(0, this._height - m * 2);
    const sprite = this._backSprite;
    const tilingSprite = sprite.children[0];
    sprite.bitmap = this._windowskin;
    sprite.setFrame(0, 0, 96, 96);
    sprite.move(m, m);
    sprite.scale.x = w / 96;
    sprite.scale.y = h / 96;
    tilingSprite.bitmap = this._windowskin;
    tilingSprite.setFrame(0, 96, 96, 96);
    tilingSprite.move(0, 0, w, h);
    tilingSprite.scale.x = 96 / w;
    tilingSprite.scale.y = 96 / h;
    sprite.setColorTone(this._colorTone);
};

Window.prototype._refreshFrame = function() {
    const drect = { x: 0, y: 0, width: this._width, height: this._height };
    const srect = { x: 96, y: 0, width: 96, height: 96 };
    const m = 24;
    for (const child of this._frameSprite.children) {
        child.bitmap = this._windowskin;
    }
    this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
};

Window.prototype._refreshCursor = function() {
    const drect = this._cursorRect.clone();
    const srect = { x: 96, y: 96, width: 48, height: 48 };
    const m = 4;
    for (const child of this._cursorSprite.children) {
        child.bitmap = this._windowskin;
    }
    this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
};

Window.prototype._setRectPartsGeometry = function(sprite, srect, drect, m) {
    const sx = srect.x;
    const sy = srect.y;
    const sw = srect.width;
    const sh = srect.height;
    const dx = drect.x;
    const dy = drect.y;
    const dw = drect.width;
    const dh = drect.height;
    const smw = sw - m * 2;
    const smh = sh - m * 2;
    const dmw = dw - m * 2;
    const dmh = dh - m * 2;
    const children = sprite.children;
    sprite.setFrame(0, 0, dw, dh);
    sprite.move(dx, dy);
    // corner
    children[0].setFrame(sx, sy, m, m);
    children[1].setFrame(sx + sw - m, sy, m, m);
    children[2].setFrame(sx, sy + sw - m, m, m);
    children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
    children[0].move(0, 0);
    children[1].move(dw - m, 0);
    children[2].move(0, dh - m);
    children[3].move(dw - m, dh - m);
    // edge
    children[4].move(m, 0);
    children[5].move(m, dh - m);
    children[6].move(0, m);
    children[7].move(dw - m, m);
    children[4].setFrame(sx + m, sy, smw, m);
    children[5].setFrame(sx + m, sy + sw - m, smw, m);
    children[6].setFrame(sx, sy + m, m, smh);
    children[7].setFrame(sx + sw - m, sy + m, m, smh);
    children[4].scale.x = dmw / smw;
    children[5].scale.x = dmw / smw;
    children[6].scale.y = dmh / smh;
    children[7].scale.y = dmh / smh;
    // center
    if (children[8]) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
    }
    for (const child of children) {
        child.visible = dw > 0 && dh > 0;
    }
};

Window.prototype._refreshArrows = function() {
    const w = this._width;
    const h = this._height;
    const p = 24;
    const q = p / 2;
    const sx = 96 + p;
    const sy = 0 + p;
    this._downArrowSprite.bitmap = this._windowskin;
    this._downArrowSprite.anchor.x = 0.5;
    this._downArrowSprite.anchor.y = 0.5;
    this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
    this._downArrowSprite.move(w / 2, h - q);
    this._upArrowSprite.bitmap = this._windowskin;
    this._upArrowSprite.anchor.x = 0.5;
    this._upArrowSprite.anchor.y = 0.5;
    this._upArrowSprite.setFrame(sx + q, sy, p, q);
    this._upArrowSprite.move(w / 2, q);
};

Window.prototype._refreshPauseSign = function() {
    const sx = 144;
    const sy = 96;
    const p = 24;
    this._pauseSignSprite.bitmap = this._windowskin;
    this._pauseSignSprite.anchor.x = 0.5;
    this._pauseSignSprite.anchor.y = 1;
    this._pauseSignSprite.move(this._width / 2, this._height);
    this._pauseSignSprite.setFrame(sx, sy, p, p);
    this._pauseSignSprite.alpha = 0;
};

Window.prototype._updateClientArea = function() {
    const pad = this._padding;
    this._clientArea.move(pad, pad);
    this._clientArea.x = pad - this.origin.x;
    this._clientArea.y = pad - this.origin.y;
    if (this.innerWidth > 0 && this.innerHeight > 0) {
        this._clientArea.visible = this.isOpen();
    } else {
        this._clientArea.visible = false;
    }
};

Window.prototype._updateFrame = function() {
    this._frameSprite.visible = this.frameVisible;
};

Window.prototype._updateContentsBack = function() {
    const bitmap = this._contentsBackSprite.bitmap;
    if (bitmap) {
        this._contentsBackSprite.setFrame(0, 0, bitmap.width, bitmap.height);
    }
};

Window.prototype._updateCursor = function() {
    this._cursorSprite.alpha = this._makeCursorAlpha();
    this._cursorSprite.visible = this.isOpen() && this.cursorVisible;
    this._cursorSprite.x = this._cursorRect.x;
    this._cursorSprite.y = this._cursorRect.y;
};

Window.prototype._makeCursorAlpha = function() {
    const blinkCount = this._animationCount % 40;
    const baseAlpha = this.contentsOpacity / 255;
    if (this.active) {
        if (blinkCount < 20) {
            return baseAlpha - blinkCount / 32;
        } else {
            return baseAlpha - (40 - blinkCount) / 32;
        }
    }
    return baseAlpha;
};

Window.prototype._updateContents = function() {
    const bitmap = this._contentsSprite.bitmap;
    if (bitmap) {
        this._contentsSprite.setFrame(0, 0, bitmap.width, bitmap.height);
    }
};

Window.prototype._updateArrows = function() {
    this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
    this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
};

Window.prototype._updatePauseSign = function() {
    const sprite = this._pauseSignSprite;
    const x = Math.floor(this._animationCount / 16) % 2;
    const y = Math.floor(this._animationCount / 16 / 2) % 2;
    const sx = 144;
    const sy = 96;
    const p = 24;
    if (!this.pause) {
        sprite.alpha = 0;
    } else if (sprite.alpha < 1) {
        sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    sprite.setFrame(sx + x * p, sy + y * p, p, p);
    sprite.visible = this.isOpen();
};

Window.prototype._updateFilterArea = function() {
    const pos = this._clientArea.worldTransform.apply(new Point(0, 0));
    const filterArea = this._clientArea.filterArea;
    filterArea.x = pos.x + this.origin.x;
    filterArea.y = pos.y + this.origin.y;
    filterArea.width = this.innerWidth;
    filterArea.height = this.innerHeight;
};

