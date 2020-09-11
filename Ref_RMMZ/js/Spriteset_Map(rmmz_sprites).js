
// Spriteset_Map
//
// The set of sprites on the map screen.

function Spriteset_Map() {
    this.initialize(...arguments);
}

Spriteset_Map.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_Map.prototype.constructor = Spriteset_Map;

Spriteset_Map.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
    this._balloonSprites = [];
};

Spriteset_Map.prototype.destroy = function(options) {
    this.removeAllBalloons();
    Spriteset_Base.prototype.destroy.call(this, options);
};

Spriteset_Map.prototype.loadSystemImages = function() {
    Spriteset_Base.prototype.loadSystemImages.call(this);
    ImageManager.loadSystem("Balloon");
    ImageManager.loadSystem("Shadow1");
};

Spriteset_Map.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createParallax();
    this.createTilemap();
    this.createCharacters();
    this.createShadow();
    this.createDestination();
    this.createWeather();
};

Spriteset_Map.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateTileset();
    this.updateParallax();
    this.updateTilemap();
    this.updateShadow();
    this.updateWeather();
    this.updateAnimations();
    this.updateBalloons();
};

Spriteset_Map.prototype.hideCharacters = function() {
    for (const sprite of this._characterSprites) {
        if (!sprite.isTile() && !sprite.isObjectCharacter()) {
            sprite.hide();
        }
    }
};

Spriteset_Map.prototype.createParallax = function() {
    this._parallax = new TilingSprite();
    this._parallax.move(0, 0, Graphics.width, Graphics.height);
    this._baseSprite.addChild(this._parallax);
};

Spriteset_Map.prototype.createTilemap = function() {
    const tilemap = new Tilemap();
    tilemap.tileWidth = $gameMap.tileWidth();
    tilemap.tileHeight = $gameMap.tileHeight();
    tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
    tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
    tilemap.verticalWrap = $gameMap.isLoopVertical();
    this._baseSprite.addChild(tilemap);
    this._effectsContainer = tilemap;
    this._tilemap = tilemap;
    this.loadTileset();
};

Spriteset_Map.prototype.loadTileset = function() {
    this._tileset = $gameMap.tileset();
    if (this._tileset) {
        const bitmaps = [];
        const tilesetNames = this._tileset.tilesetNames;
        for (const name of tilesetNames) {
            bitmaps.push(ImageManager.loadTileset(name));
        }
        this._tilemap.setBitmaps(bitmaps);
        this._tilemap.flags = $gameMap.tilesetFlags();
    }
};

Spriteset_Map.prototype.createCharacters = function() {
    this._characterSprites = [];
    for (const event of $gameMap.events()) {
        this._characterSprites.push(new Sprite_Character(event));
    }
    for (const vehicle of $gameMap.vehicles()) {
        this._characterSprites.push(new Sprite_Character(vehicle));
    }
    for (const follower of $gamePlayer.followers().reverseData()) {
        this._characterSprites.push(new Sprite_Character(follower));
    }
    this._characterSprites.push(new Sprite_Character($gamePlayer));
    for (const sprite of this._characterSprites) {
        this._tilemap.addChild(sprite);
    }
};

Spriteset_Map.prototype.createShadow = function() {
    this._shadowSprite = new Sprite();
    this._shadowSprite.bitmap = ImageManager.loadSystem("Shadow1");
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 1;
    this._shadowSprite.z = 6;
    this._tilemap.addChild(this._shadowSprite);
};

Spriteset_Map.prototype.createDestination = function() {
    this._destinationSprite = new Sprite_Destination();
    this._destinationSprite.z = 9;
    this._tilemap.addChild(this._destinationSprite);
};

Spriteset_Map.prototype.createWeather = function() {
    this._weather = new Weather();
    this.addChild(this._weather);
};

Spriteset_Map.prototype.updateTileset = function() {
    if (this._tileset !== $gameMap.tileset()) {
        this.loadTileset();
    }
};

Spriteset_Map.prototype.updateParallax = function() {
    if (this._parallaxName !== $gameMap.parallaxName()) {
        this._parallaxName = $gameMap.parallaxName();
        this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
    }
    if (this._parallax.bitmap) {
        this._parallax.origin.x = $gameMap.parallaxOx();
        this._parallax.origin.y = $gameMap.parallaxOy();
    }
};

Spriteset_Map.prototype.updateTilemap = function() {
    this._tilemap.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    this._tilemap.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
};

Spriteset_Map.prototype.updateShadow = function() {
    const airship = $gameMap.airship();
    this._shadowSprite.x = airship.shadowX();
    this._shadowSprite.y = airship.shadowY();
    this._shadowSprite.opacity = airship.shadowOpacity();
};

Spriteset_Map.prototype.updateWeather = function() {
    this._weather.type = $gameScreen.weatherType();
    this._weather.power = $gameScreen.weatherPower();
    this._weather.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    this._weather.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
};

Spriteset_Map.prototype.updateBalloons = function() {
    for (const sprite of this._balloonSprites) {
        if (!sprite.isPlaying()) {
            this.removeBalloon(sprite);
        }
    }
    this.processBalloonRequests();
};

Spriteset_Map.prototype.processBalloonRequests = function() {
    for (;;) {
        const request = $gameTemp.retrieveBalloon();
        if (request) {
            this.createBalloon(request);
        } else {
            break;
        }
    }
};

Spriteset_Map.prototype.createBalloon = function(request) {
    const targetSprite = this.findTargetSprite(request.target);
    if (targetSprite) {
        const sprite = new Sprite_Balloon();
        sprite.targetObject = request.target;
        sprite.setup(targetSprite, request.balloonId);
        this._effectsContainer.addChild(sprite);
        this._balloonSprites.push(sprite);
    }
};

Spriteset_Map.prototype.removeBalloon = function(sprite) {
    this._balloonSprites.remove(sprite);
    this._effectsContainer.removeChild(sprite);
    if (sprite.targetObject.endBalloon) {
        sprite.targetObject.endBalloon();
    }
    sprite.destroy();
};

Spriteset_Map.prototype.removeAllBalloons = function() {
    for (const sprite of this._balloonSprites) {
        this.removeBalloon(sprite);
    }
};

Spriteset_Map.prototype.findTargetSprite = function(target) {
    return this._characterSprites.find(sprite => sprite.checkCharacter(target));
};

Spriteset_Map.prototype.animationBaseDelay = function() {
    return 0;
};

