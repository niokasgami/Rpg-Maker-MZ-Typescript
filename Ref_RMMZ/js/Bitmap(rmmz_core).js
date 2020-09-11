
/**
 * The basic object that represents an image.
 *
 * @class
 * @param {number} width - The width of the bitmap.
 * @param {number} height - The height of the bitmap.
 */
function Bitmap() {
    this.initialize(...arguments);
}

Bitmap.prototype.initialize = function(width, height) {
    this._canvas = null;
    this._context = null;
    this._baseTexture = null;
    this._image = null;
    this._url = "";
    this._paintOpacity = 255;
    this._smooth = true;
    this._loadListeners = [];

    // "none", "loading", "loaded", or "error"
    this._loadingState = "none";

    if (width > 0 && height > 0) {
        this._createCanvas(width, height);
    }

    /**
     * The face name of the font.
     *
     * @type string
     */
    this.fontFace = "sans-serif";

    /**
     * The size of the font in pixels.
     *
     * @type number
     */
    this.fontSize = 16;

    /**
     * Whether the font is bold.
     *
     * @type boolean
     */
    this.fontBold = false;

    /**
     * Whether the font is italic.
     *
     * @type boolean
     */
    this.fontItalic = false;

    /**
     * The color of the text in CSS format.
     *
     * @type string
     */
    this.textColor = "#ffffff";

    /**
     * The color of the outline of the text in CSS format.
     *
     * @type string
     */
    this.outlineColor = "rgba(0, 0, 0, 0.5)";

    /**
     * The width of the outline of the text.
     *
     * @type number
     */
    this.outlineWidth = 3;
};

/**
 * Loads a image file.
 *
 * @param {string} url - The image url of the texture.
 * @returns {Bitmap} The new bitmap object.
 */
Bitmap.load = function(url) {
    const bitmap = Object.create(Bitmap.prototype);
    bitmap.initialize();
    bitmap._url = url;
    bitmap._startLoading();
    return bitmap;
};

/**
 * Takes a snapshot of the game screen.
 *
 * @param {Stage} stage - The stage object.
 * @returns {Bitmap} The new bitmap object.
 */
Bitmap.snap = function(stage) {
    const width = Graphics.width;
    const height = Graphics.height;
    const bitmap = new Bitmap(width, height);
    const renderTexture = PIXI.RenderTexture.create(width, height);
    if (stage) {
        const renderer = Graphics.app.renderer;
        renderer.render(stage, renderTexture);
        stage.worldTransform.identity();
        const canvas = renderer.extract.canvas(renderTexture);
        bitmap.context.drawImage(canvas, 0, 0);
        canvas.width = 0;
        canvas.height = 0;
    }
    renderTexture.destroy({ destroyBase: true });
    bitmap.baseTexture.update();
    return bitmap;
};

/**
 * Checks whether the bitmap is ready to render.
 *
 * @returns {boolean} True if the bitmap is ready to render.
 */
Bitmap.prototype.isReady = function() {
    return this._loadingState === "loaded" || this._loadingState === "none";
};

/**
 * Checks whether a loading error has occurred.
 *
 * @returns {boolean} True if a loading error has occurred.
 */
Bitmap.prototype.isError = function() {
    return this._loadingState === "error";
};

/**
 * The url of the image file.
 *
 * @readonly
 * @type string
 * @name Bitmap#url
 */
Object.defineProperty(Bitmap.prototype, "url", {
    get: function() {
        return this._url;
    },
    configurable: true
});

/**
 * The base texture that holds the image.
 *
 * @readonly
 * @type PIXI.BaseTexture
 * @name Bitmap#baseTexture
 */
Object.defineProperty(Bitmap.prototype, "baseTexture", {
    get: function() {
        return this._baseTexture;
    },
    configurable: true
});

/**
 * The bitmap image.
 *
 * @readonly
 * @type HTMLImageElement
 * @name Bitmap#image
 */
Object.defineProperty(Bitmap.prototype, "image", {
    get: function() {
        return this._image;
    },
    configurable: true
});

/**
 * The bitmap canvas.
 *
 * @readonly
 * @type HTMLCanvasElement
 * @name Bitmap#canvas
 */
Object.defineProperty(Bitmap.prototype, "canvas", {
    get: function() {
        this._ensureCanvas();
        return this._canvas;
    },
    configurable: true
});

/**
 * The 2d context of the bitmap canvas.
 *
 * @readonly
 * @type CanvasRenderingContext2D
 * @name Bitmap#context
 */
Object.defineProperty(Bitmap.prototype, "context", {
    get: function() {
        this._ensureCanvas();
        return this._context;
    },
    configurable: true
});

/**
 * The width of the bitmap.
 *
 * @readonly
 * @type number
 * @name Bitmap#width
 */
Object.defineProperty(Bitmap.prototype, "width", {
    get: function() {
        const image = this._canvas || this._image;
        return image ? image.width : 0;
    },
    configurable: true
});

/**
 * The height of the bitmap.
 *
 * @readonly
 * @type number
 * @name Bitmap#height
 */
Object.defineProperty(Bitmap.prototype, "height", {
    get: function() {
        const image = this._canvas || this._image;
        return image ? image.height : 0;
    },
    configurable: true
});

/**
 * The rectangle of the bitmap.
 *
 * @readonly
 * @type Rectangle
 * @name Bitmap#rect
 */
Object.defineProperty(Bitmap.prototype, "rect", {
    get: function() {
        return new Rectangle(0, 0, this.width, this.height);
    },
    configurable: true
});

/**
 * Whether the smooth scaling is applied.
 *
 * @type boolean
 * @name Bitmap#smooth
 */
Object.defineProperty(Bitmap.prototype, "smooth", {
    get: function() {
        return this._smooth;
    },
    set: function(value) {
        if (this._smooth !== value) {
            this._smooth = value;
            this._updateScaleMode();
        }
    },
    configurable: true
});

/**
 * The opacity of the drawing object in the range (0, 255).
 *
 * @type number
 * @name Bitmap#paintOpacity
 */
Object.defineProperty(Bitmap.prototype, "paintOpacity", {
    get: function() {
        return this._paintOpacity;
    },
    set: function(value) {
        if (this._paintOpacity !== value) {
            this._paintOpacity = value;
            this.context.globalAlpha = this._paintOpacity / 255;
        }
    },
    configurable: true
});

/**
 * Destroys the bitmap.
 */
Bitmap.prototype.destroy = function() {
    if (this._baseTexture) {
        this._baseTexture.destroy();
        this._baseTexture = null;
    }
    this._destroyCanvas();
};

/**
 * Resizes the bitmap.
 *
 * @param {number} width - The new width of the bitmap.
 * @param {number} height - The new height of the bitmap.
 */
Bitmap.prototype.resize = function(width, height) {
    width = Math.max(width || 0, 1);
    height = Math.max(height || 0, 1);
    this.canvas.width = width;
    this.canvas.height = height;
    this.baseTexture.width = width;
    this.baseTexture.height = height;
};

/**
 * Performs a block transfer.
 *
 * @param {Bitmap} source - The bitmap to draw.
 * @param {number} sx - The x coordinate in the source.
 * @param {number} sy - The y coordinate in the source.
 * @param {number} sw - The width of the source image.
 * @param {number} sh - The height of the source image.
 * @param {number} dx - The x coordinate in the destination.
 * @param {number} dy - The y coordinate in the destination.
 * @param {number} [dw=sw] The width to draw the image in the destination.
 * @param {number} [dh=sh] The height to draw the image in the destination.
 */
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    try {
        const image = source._canvas || source._image;
        this.context.globalCompositeOperation = "source-over";
        this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        this._baseTexture.update();
    } catch (e) {
        //
    }
};

/**
 * Returns pixel color at the specified point.
 *
 * @param {number} x - The x coordinate of the pixel in the bitmap.
 * @param {number} y - The y coordinate of the pixel in the bitmap.
 * @returns {string} The pixel color (hex format).
 */
Bitmap.prototype.getPixel = function(x, y) {
    const data = this.context.getImageData(x, y, 1, 1).data;
    let result = "#";
    for (let i = 0; i < 3; i++) {
        result += data[i].toString(16).padZero(2);
    }
    return result;
};

/**
 * Returns alpha pixel value at the specified point.
 *
 * @param {number} x - The x coordinate of the pixel in the bitmap.
 * @param {number} y - The y coordinate of the pixel in the bitmap.
 * @returns {string} The alpha value.
 */
Bitmap.prototype.getAlphaPixel = function(x, y) {
    const data = this.context.getImageData(x, y, 1, 1).data;
    return data[3];
};

/**
 * Clears the specified rectangle.
 *
 * @param {number} x - The x coordinate for the upper-left corner.
 * @param {number} y - The y coordinate for the upper-left corner.
 * @param {number} width - The width of the rectangle to clear.
 * @param {number} height - The height of the rectangle to clear.
 */
Bitmap.prototype.clearRect = function(x, y, width, height) {
    this.context.clearRect(x, y, width, height);
    this._baseTexture.update();
};

/**
 * Clears the entire bitmap.
 */
Bitmap.prototype.clear = function() {
    this.clearRect(0, 0, this.width, this.height);
};

/**
 * Fills the specified rectangle.
 *
 * @param {number} x - The x coordinate for the upper-left corner.
 * @param {number} y - The y coordinate for the upper-left corner.
 * @param {number} width - The width of the rectangle to fill.
 * @param {number} height - The height of the rectangle to fill.
 * @param {string} color - The color of the rectangle in CSS format.
 */
Bitmap.prototype.fillRect = function(x, y, width, height, color) {
    const context = this.context;
    context.save();
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.restore();
    this._baseTexture.update();
};

/**
 * Fills the entire bitmap.
 *
 * @param {string} color - The color of the rectangle in CSS format.
 */
Bitmap.prototype.fillAll = function(color) {
    this.fillRect(0, 0, this.width, this.height, color);
};

/**
 * Draws the specified rectangular frame.
 *
 * @param {number} x - The x coordinate for the upper-left corner.
 * @param {number} y - The y coordinate for the upper-left corner.
 * @param {number} width - The width of the rectangle to fill.
 * @param {number} height - The height of the rectangle to fill.
 * @param {string} color - The color of the rectangle in CSS format.
 */
Bitmap.prototype.strokeRect = function(x, y, width, height, color) {
    const context = this.context;
    context.save();
    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);
    context.restore();
    this._baseTexture.update();
};

// prettier-ignore
/**
 * Draws the rectangle with a gradation.
 *
 * @param {number} x - The x coordinate for the upper-left corner.
 * @param {number} y - The y coordinate for the upper-left corner.
 * @param {number} width - The width of the rectangle to fill.
 * @param {number} height - The height of the rectangle to fill.
 * @param {string} color1 - The gradient starting color.
 * @param {string} color2 - The gradient ending color.
 * @param {boolean} vertical - Whether the gradient should be draw as vertical or not.
 */
Bitmap.prototype.gradientFillRect = function(
    x, y, width, height, color1, color2, vertical
) {
    const context = this.context;
    const x1 = vertical ? x : x + width;
    const y1 = vertical ? y + height : y;
    const grad = context.createLinearGradient(x, y, x1, y1);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.fillRect(x, y, width, height);
    context.restore();
    this._baseTexture.update();
};

/**
 * Draws a bitmap in the shape of a circle.
 *
 * @param {number} x - The x coordinate based on the circle center.
 * @param {number} y - The y coordinate based on the circle center.
 * @param {number} radius - The radius of the circle.
 * @param {string} color - The color of the circle in CSS format.
 */
Bitmap.prototype.drawCircle = function(x, y, radius, color) {
    const context = this.context;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    this._baseTexture.update();
};

/**
 * Draws the outline text to the bitmap.
 *
 * @param {string} text - The text that will be drawn.
 * @param {number} x - The x coordinate for the left of the text.
 * @param {number} y - The y coordinate for the top of the text.
 * @param {number} maxWidth - The maximum allowed width of the text.
 * @param {number} lineHeight - The height of the text line.
 * @param {string} align - The alignment of the text.
 */
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    // [Note] Different browser makes different rendering with
    //   textBaseline == 'top'. So we use 'alphabetic' here.
    const context = this.context;
    const alpha = context.globalAlpha;
    maxWidth = maxWidth || 0xffffffff;
    let tx = x;
    let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
    if (align === "center") {
        tx += maxWidth / 2;
    }
    if (align === "right") {
        tx += maxWidth;
    }
    context.save();
    context.font = this._makeFontNameText();
    context.textAlign = align;
    context.textBaseline = "alphabetic";
    context.globalAlpha = 1;
    this._drawTextOutline(text, tx, ty, maxWidth);
    context.globalAlpha = alpha;
    this._drawTextBody(text, tx, ty, maxWidth);
    context.restore();
    this._baseTexture.update();
};

/**
 * Returns the width of the specified text.
 *
 * @param {string} text - The text to be measured.
 * @returns {number} The width of the text in pixels.
 */
Bitmap.prototype.measureTextWidth = function(text) {
    const context = this.context;
    context.save();
    context.font = this._makeFontNameText();
    const width = context.measureText(text).width;
    context.restore();
    return width;
};

/**
 * Adds a callback function that will be called when the bitmap is loaded.
 *
 * @param {function} listner - The callback function.
 */
Bitmap.prototype.addLoadListener = function(listner) {
    if (!this.isReady()) {
        this._loadListeners.push(listner);
    } else {
        listner(this);
    }
};

/**
 * Tries to load the image again.
 */
Bitmap.prototype.retry = function() {
    this._startLoading();
};

Bitmap.prototype._makeFontNameText = function() {
    const italic = this.fontItalic ? "Italic " : "";
    const bold = this.fontBold ? "Bold " : "";
    return italic + bold + this.fontSize + "px " + this.fontFace;
};

Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
    const context = this.context;
    context.strokeStyle = this.outlineColor;
    context.lineWidth = this.outlineWidth;
    context.lineJoin = "round";
    context.strokeText(text, tx, ty, maxWidth);
};

Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
    const context = this.context;
    context.fillStyle = this.textColor;
    context.fillText(text, tx, ty, maxWidth);
};

Bitmap.prototype._createCanvas = function(width, height) {
    this._canvas = document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
    this._canvas.width = width;
    this._canvas.height = height;
    this._createBaseTexture(this._canvas);
};

Bitmap.prototype._ensureCanvas = function() {
    if (!this._canvas) {
        if (this._image) {
            this._createCanvas(this._image.width, this._image.height);
            this._context.drawImage(this._image, 0, 0);
        } else {
            this._createCanvas(0, 0);
        }
    }
};

Bitmap.prototype._destroyCanvas = function() {
    if (this._canvas) {
        this._canvas.width = 0;
        this._canvas.height = 0;
        this._canvas = null;
    }
};

Bitmap.prototype._createBaseTexture = function(source) {
    this._baseTexture = new PIXI.BaseTexture(source);
    this._baseTexture.mipmap = false;
    this._baseTexture.width = source.width;
    this._baseTexture.height = source.height;
    this._updateScaleMode();
};

Bitmap.prototype._updateScaleMode = function() {
    if (this._baseTexture) {
        if (this._smooth) {
            this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        } else {
            this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
    }
};

Bitmap.prototype._startLoading = function() {
    this._image = new Image();
    this._image.onload = this._onLoad.bind(this);
    this._image.onerror = this._onError.bind(this);
    this._destroyCanvas();
    this._loadingState = "loading";
    if (Utils.hasEncryptedImages()) {
        this._startDecrypting();
    } else {
        this._image.src = this._url;
    }
};

Bitmap.prototype._startDecrypting = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this._url + "_");
    xhr.responseType = "arraybuffer";
    xhr.onload = () => this._onXhrLoad(xhr);
    xhr.onerror = this._onError.bind(this);
    xhr.send();
};

Bitmap.prototype._onXhrLoad = function(xhr) {
    if (xhr.status < 400) {
        const arrayBuffer = Utils.decryptArrayBuffer(xhr.response);
        const blob = new Blob([arrayBuffer]);
        this._image.src = URL.createObjectURL(blob);
    } else {
        this._onError();
    }
};

Bitmap.prototype._onLoad = function() {
    if (Utils.hasEncryptedImages()) {
        URL.revokeObjectURL(this._image.src);
    }
    this._loadingState = "loaded";
    this._createBaseTexture(this._image);
    this._callLoadListeners();
};

Bitmap.prototype._callLoadListeners = function() {
    while (this._loadListeners.length > 0) {
        const listener = this._loadListeners.shift();
        listener(this);
    }
};

Bitmap.prototype._onError = function() {
    this._loadingState = "error";
};

