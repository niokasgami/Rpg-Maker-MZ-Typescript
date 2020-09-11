
// Window_ShopNumber
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.

function Window_ShopNumber() {
    this.initialize(...arguments);
}

Window_ShopNumber.prototype = Object.create(Window_Selectable.prototype);
Window_ShopNumber.prototype.constructor = Window_ShopNumber;

Window_ShopNumber.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._item = null;
    this._max = 1;
    this._price = 0;
    this._number = 1;
    this._currencyUnit = TextManager.currencyUnit;
    this.createButtons();
    this.select(0);
    this._canRepeat = false;
};

Window_ShopNumber.prototype.isScrollEnabled = function() {
    return false;
};

Window_ShopNumber.prototype.number = function() {
    return this._number;
};

Window_ShopNumber.prototype.setup = function(item, max, price) {
    this._item = item;
    this._max = Math.floor(max);
    this._price = price;
    this._number = 1;
    this.placeButtons();
    this.refresh();
};

Window_ShopNumber.prototype.setCurrencyUnit = function(currencyUnit) {
    this._currencyUnit = currencyUnit;
    this.refresh();
};

Window_ShopNumber.prototype.createButtons = function() {
    this._buttons = [];
    if (ConfigManager.touchUI) {
        for (const type of ["down2", "down", "up", "up2", "ok"]) {
            const button = new Sprite_Button(type);
            this._buttons.push(button);
            this.addInnerChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
        this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
        this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
    }
};

Window_ShopNumber.prototype.placeButtons = function() {
    const sp = this.buttonSpacing();
    const totalWidth = this.totalButtonWidth();
    let x = (this.innerWidth - totalWidth) / 2;
    for (const button of this._buttons) {
        button.x = x;
        button.y = this.buttonY();
        x += button.width + sp;
    }
};

Window_ShopNumber.prototype.totalButtonWidth = function() {
    const sp = this.buttonSpacing();
    return this._buttons.reduce((r, button) => r + button.width + sp, -sp);
};

Window_ShopNumber.prototype.buttonSpacing = function() {
    return 8;
};

Window_ShopNumber.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
    this.drawItemBackground(0);
    this.drawCurrentItemName();
    this.drawMultiplicationSign();
    this.drawNumber();
    this.drawHorzLine();
    this.drawTotalPrice();
};

Window_ShopNumber.prototype.drawCurrentItemName = function() {
    const padding = this.itemPadding();
    const x = padding * 2;
    const y = this.itemNameY();
    const width = this.multiplicationSignX() - padding * 3;
    this.drawItemName(this._item, x, y, width);
};

Window_ShopNumber.prototype.drawMultiplicationSign = function() {
    const sign = this.multiplicationSign();
    const width = this.textWidth(sign);
    const x = this.multiplicationSignX();
    const y = this.itemNameY();
    this.resetTextColor();
    this.drawText(sign, x, y, width);
};

Window_ShopNumber.prototype.multiplicationSign = function() {
    return "\u00d7";
};

Window_ShopNumber.prototype.multiplicationSignX = function() {
    const sign = this.multiplicationSign();
    const width = this.textWidth(sign);
    return this.cursorX() - width * 2;
};

Window_ShopNumber.prototype.drawNumber = function() {
    const x = this.cursorX();
    const y = this.itemNameY();
    const width = this.cursorWidth() - this.itemPadding();
    this.resetTextColor();
    this.drawText(this._number, x, y, width, "right");
};

Window_ShopNumber.prototype.drawHorzLine = function() {
    const padding = this.itemPadding();
    const lineHeight = this.lineHeight();
    const itemY = this.itemNameY();
    const totalY = this.totalPriceY();
    const x = padding;
    const y = Math.floor((itemY + totalY + lineHeight) / 2);
    const width = this.innerWidth - padding * 2;
    this.drawRect(x, y, width, 5);
};

Window_ShopNumber.prototype.drawTotalPrice = function() {
    const padding = this.itemPadding();
    const total = this._price * this._number;
    const width = this.innerWidth - padding * 2;
    const y = this.totalPriceY();
    this.drawCurrencyValue(total, this._currencyUnit, 0, y, width);
};

Window_ShopNumber.prototype.itemNameY = function() {
    return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5);
};

Window_ShopNumber.prototype.totalPriceY = function() {
    return Math.floor(this.itemNameY() + this.lineHeight() * 2);
};

Window_ShopNumber.prototype.buttonY = function() {
    return Math.floor(this.totalPriceY() + this.lineHeight() * 2);
};

Window_ShopNumber.prototype.cursorWidth = function() {
    const padding = this.itemPadding();
    const digitWidth = this.textWidth("0");
    return this.maxDigits() * digitWidth + padding * 2;
};

Window_ShopNumber.prototype.cursorX = function() {
    const padding = this.itemPadding();
    return this.innerWidth - this.cursorWidth() - padding * 2;
};

Window_ShopNumber.prototype.maxDigits = function() {
    return 2;
};

Window_ShopNumber.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};

Window_ShopNumber.prototype.playOkSound = function() {
    //
};

Window_ShopNumber.prototype.processNumberChange = function() {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated("right")) {
            this.changeNumber(1);
        }
        if (Input.isRepeated("left")) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated("up")) {
            this.changeNumber(10);
        }
        if (Input.isRepeated("down")) {
            this.changeNumber(-10);
        }
    }
};

Window_ShopNumber.prototype.changeNumber = function(amount) {
    const lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        this.playCursorSound();
        this.refresh();
    }
};

Window_ShopNumber.prototype.itemRect = function() {
    const rect = new Rectangle();
    rect.x = this.cursorX();
    rect.y = this.itemNameY();
    rect.width = this.cursorWidth();
    rect.height = this.lineHeight();
    return rect;
};

Window_ShopNumber.prototype.isTouchOkEnabled = function() {
    return false;
};

Window_ShopNumber.prototype.onButtonUp = function() {
    this.changeNumber(1);
};

Window_ShopNumber.prototype.onButtonUp2 = function() {
    this.changeNumber(10);
};

Window_ShopNumber.prototype.onButtonDown = function() {
    this.changeNumber(-1);
};

Window_ShopNumber.prototype.onButtonDown2 = function() {
    this.changeNumber(-10);
};

Window_ShopNumber.prototype.onButtonOk = function() {
    this.processOk();
};

