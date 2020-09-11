
// Window_ShopBuy
//
// The window for selecting an item to buy on the shop screen.

function Window_ShopBuy() {
    this.initialize(...arguments);
}

Window_ShopBuy.prototype = Object.create(Window_Selectable.prototype);
Window_ShopBuy.prototype.constructor = Window_ShopBuy;

Window_ShopBuy.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._money = 0;
};

Window_ShopBuy.prototype.setupGoods = function(shopGoods) {
    this._shopGoods = shopGoods;
    this.refresh();
    this.select(0);
};

Window_ShopBuy.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ShopBuy.prototype.item = function() {
    return this.itemAt(this.index());
};

Window_ShopBuy.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_ShopBuy.prototype.setMoney = function(money) {
    this._money = money;
    this.refresh();
};

Window_ShopBuy.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_ShopBuy.prototype.price = function(item) {
    return this._price[this._data.indexOf(item)] || 0;
};

Window_ShopBuy.prototype.isEnabled = function(item) {
    return (
        item && this.price(item) <= this._money && !$gameParty.hasMaxItems(item)
    );
};

Window_ShopBuy.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};

Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    for (const goods of this._shopGoods) {
        const item = this.goodsToItem(goods);
        if (item) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }
};

Window_ShopBuy.prototype.goodsToItem = function(goods) {
    switch (goods[0]) {
        case 0:
            return $dataItems[goods[1]];
        case 1:
            return $dataWeapons[goods[1]];
        case 2:
            return $dataArmors[goods[1]];
        default:
            return null;
    }
};

Window_ShopBuy.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    const price = this.price(item);
    const rect = this.itemLineRect(index);
    const priceWidth = this.priceWidth();
    const priceX = rect.x + rect.width - priceWidth;
    const nameWidth = rect.width - priceWidth;
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, nameWidth);
    this.drawText(price, priceX, rect.y, priceWidth, "right");
    this.changePaintOpacity(true);
};

Window_ShopBuy.prototype.priceWidth = function() {
    return 96;
};

Window_ShopBuy.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_ShopBuy.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setItem(this.item());
    }
};

