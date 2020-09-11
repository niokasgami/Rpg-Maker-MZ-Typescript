
// Scene_Shop
//
// The scene class of the shop screen.

function Scene_Shop() {
    this.initialize(...arguments);
}

Scene_Shop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Shop.prototype.constructor = Scene_Shop;

Scene_Shop.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
    this._goods = goods;
    this._purchaseOnly = purchaseOnly;
    this._item = null;
};

Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createStatusWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
};

Scene_Shop.prototype.createGoldWindow = function() {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_Gold(rect);
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.goldWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = Graphics.boxWidth - ww;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_ShopCommand(rect);
    this._commandWindow.setPurchaseOnly(this._purchaseOnly);
    this._commandWindow.y = this.mainAreaTop();
    this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
    this._commandWindow.setHandler("sell", this.commandSell.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Shop.prototype.commandWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = this._goldWindow.x;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createDummyWindow = function() {
    const rect = this.dummyWindowRect();
    this._dummyWindow = new Window_Base(rect);
    this.addWindow(this._dummyWindow);
};

Scene_Shop.prototype.dummyWindowRect = function() {
    const wx = 0;
    const wy = this._commandWindow.y + this._commandWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createNumberWindow = function() {
    const rect = this.numberWindowRect();
    this._numberWindow = new Window_ShopNumber(rect);
    this._numberWindow.hide();
    this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
    this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_Shop.prototype.numberWindowRect = function() {
    const wx = 0;
    const wy = this._dummyWindow.y;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this._dummyWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_ShopStatus(rect);
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

Scene_Shop.prototype.statusWindowRect = function() {
    const ww = this.statusWidth();
    const wh = this._dummyWindow.height;
    const wx = Graphics.boxWidth - ww;
    const wy = this._dummyWindow.y;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createBuyWindow = function() {
    const rect = this.buyWindowRect();
    this._buyWindow = new Window_ShopBuy(rect);
    this._buyWindow.setupGoods(this._goods);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
    this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

Scene_Shop.prototype.buyWindowRect = function() {
    const wx = 0;
    const wy = this._dummyWindow.y;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this._dummyWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_ItemCategory(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Shop.prototype.categoryWindowRect = function() {
    const wx = 0;
    const wy = this._dummyWindow.y;
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createSellWindow = function() {
    const rect = this.sellWindowRect();
    this._sellWindow = new Window_ShopSell(rect);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler("ok", this.onSellOk.bind(this));
    this._sellWindow.setHandler("cancel", this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
    if (!this._categoryWindow.needsSelection()) {
        this._sellWindow.y -= this._categoryWindow.height;
        this._sellWindow.height += this._categoryWindow.height;
    }
};

Scene_Shop.prototype.sellWindowRect = function() {
    const wx = 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth;
    const wh =
        this.mainAreaHeight() -
        this._commandWindow.height -
        this._categoryWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.statusWidth = function() {
    return 352;
};

Scene_Shop.prototype.activateBuyWindow = function() {
    this._buyWindow.setMoney(this.money());
    this._buyWindow.show();
    this._buyWindow.activate();
    this._statusWindow.show();
};

Scene_Shop.prototype.activateSellWindow = function() {
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.show();
    }
    this._sellWindow.refresh();
    this._sellWindow.show();
    this._sellWindow.activate();
    this._statusWindow.hide();
};

Scene_Shop.prototype.commandBuy = function() {
    this._dummyWindow.hide();
    this.activateBuyWindow();
};

Scene_Shop.prototype.commandSell = function() {
    this._dummyWindow.hide();
    this._sellWindow.show();
    this._sellWindow.deselect();
    this._sellWindow.refresh();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.show();
        this._categoryWindow.activate();
    } else {
        this.onCategoryOk();
    }
};

Scene_Shop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
    this._buyWindow.hide();
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
};

Scene_Shop.prototype.onBuyCancel = function() {
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._buyWindow.hide();
    this._statusWindow.hide();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
};

Scene_Shop.prototype.onCategoryOk = function() {
    this.activateSellWindow();
    this._sellWindow.select(0);
};

Scene_Shop.prototype.onCategoryCancel = function() {
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._categoryWindow.hide();
    this._sellWindow.hide();
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
    this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
    this._statusWindow.setItem(this._item);
    this._statusWindow.show();
};

Scene_Shop.prototype.onSellCancel = function() {
    this._sellWindow.deselect();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.activate();
    } else {
        this.onCategoryCancel();
    }
};

Scene_Shop.prototype.onNumberOk = function() {
    SoundManager.playShop();
    switch (this._commandWindow.currentSymbol()) {
        case "buy":
            this.doBuy(this._numberWindow.number());
            break;
        case "sell":
            this.doSell(this._numberWindow.number());
            break;
    }
    this.endNumberInput();
    this._goldWindow.refresh();
    this._statusWindow.refresh();
};

Scene_Shop.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
    this.endNumberInput();
};

Scene_Shop.prototype.doBuy = function(number) {
    $gameParty.loseGold(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
};

Scene_Shop.prototype.doSell = function(number) {
    $gameParty.gainGold(number * this.sellingPrice());
    $gameParty.loseItem(this._item, number);
};

Scene_Shop.prototype.endNumberInput = function() {
    this._numberWindow.hide();
    switch (this._commandWindow.currentSymbol()) {
        case "buy":
            this.activateBuyWindow();
            break;
        case "sell":
            this.activateSellWindow();
            break;
    }
};

Scene_Shop.prototype.maxBuy = function() {
    const num = $gameParty.numItems(this._item);
    const max = $gameParty.maxItems(this._item) - num;
    const price = this.buyingPrice();
    if (price > 0) {
        return Math.min(max, Math.floor(this.money() / price));
    } else {
        return max;
    }
};

Scene_Shop.prototype.maxSell = function() {
    return $gameParty.numItems(this._item);
};

Scene_Shop.prototype.money = function() {
    return this._goldWindow.value();
};

Scene_Shop.prototype.currencyUnit = function() {
    return this._goldWindow.currencyUnit();
};

Scene_Shop.prototype.buyingPrice = function() {
    return this._buyWindow.price(this._item);
};

Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this._item.price / 2);
};

