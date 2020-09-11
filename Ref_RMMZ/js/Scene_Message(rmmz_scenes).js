
// Scene_Message
//
// The superclass of Scene_Map and Scene_Battle.

function Scene_Message() {
    this.initialize(...arguments);
}

Scene_Message.prototype = Object.create(Scene_Base.prototype);
Scene_Message.prototype.constructor = Scene_Message;

Scene_Message.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Message.prototype.isMessageWindowClosing = function() {
    return this._messageWindow.isClosing();
};

Scene_Message.prototype.createAllWindows = function() {
    this.createMessageWindow();
    this.createScrollTextWindow();
    this.createGoldWindow();
    this.createNameBoxWindow();
    this.createChoiceListWindow();
    this.createNumberInputWindow();
    this.createEventItemWindow();
    this.associateWindows();
};

Scene_Message.prototype.createMessageWindow = function() {
    const rect = this.messageWindowRect();
    this._messageWindow = new Window_Message(rect);
    this.addWindow(this._messageWindow);
};

Scene_Message.prototype.messageWindowRect = function() {
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(4, false) + 8;
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Message.prototype.createScrollTextWindow = function() {
    const rect = this.scrollTextWindowRect();
    this._scrollTextWindow = new Window_ScrollText(rect);
    this.addWindow(this._scrollTextWindow);
};

Scene_Message.prototype.scrollTextWindowRect = function() {
    const wx = 0;
    const wy = 0;
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Message.prototype.createGoldWindow = function() {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_Gold(rect);
    this._goldWindow.openness = 0;
    this.addWindow(this._goldWindow);
};

Scene_Message.prototype.goldWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = Graphics.boxWidth - ww;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Message.prototype.createNameBoxWindow = function() {
    this._nameBoxWindow = new Window_NameBox();
    this.addWindow(this._nameBoxWindow);
};

Scene_Message.prototype.createChoiceListWindow = function() {
    this._choiceListWindow = new Window_ChoiceList();
    this.addWindow(this._choiceListWindow);
};

Scene_Message.prototype.createNumberInputWindow = function() {
    this._numberInputWindow = new Window_NumberInput();
    this.addWindow(this._numberInputWindow);
};

Scene_Message.prototype.createEventItemWindow = function() {
    const rect = this.eventItemWindowRect();
    this._eventItemWindow = new Window_EventItem(rect);
    this.addWindow(this._eventItemWindow);
};

Scene_Message.prototype.eventItemWindowRect = function() {
    const wx = 0;
    const wy = 0;
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(4, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Message.prototype.associateWindows = function() {
    const messageWindow = this._messageWindow;
    messageWindow.setGoldWindow(this._goldWindow);
    messageWindow.setNameBoxWindow(this._nameBoxWindow);
    messageWindow.setChoiceListWindow(this._choiceListWindow);
    messageWindow.setNumberInputWindow(this._numberInputWindow);
    messageWindow.setEventItemWindow(this._eventItemWindow);
    this._nameBoxWindow.setMessageWindow(messageWindow);
    this._choiceListWindow.setMessageWindow(messageWindow);
    this._numberInputWindow.setMessageWindow(messageWindow);
    this._eventItemWindow.setMessageWindow(messageWindow);
};

