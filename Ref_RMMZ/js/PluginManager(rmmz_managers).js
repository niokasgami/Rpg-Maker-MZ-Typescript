
// PluginManager
//
// The static class that manages the plugins.

function PluginManager() {
    throw new Error("This is a static class");
}

PluginManager._scripts = [];
PluginManager._errorUrls = [];
PluginManager._parameters = {};
PluginManager._commands = {};

PluginManager.setup = function(plugins) {
    for (const plugin of plugins) {
        if (plugin.status && !this._scripts.includes(plugin.name)) {
            this.setParameters(plugin.name, plugin.parameters);
            this.loadScript(plugin.name);
            this._scripts.push(plugin.name);
        }
    }
};

PluginManager.parameters = function(name) {
    return this._parameters[name.toLowerCase()] || {};
};

PluginManager.setParameters = function(name, parameters) {
    this._parameters[name.toLowerCase()] = parameters;
};

PluginManager.loadScript = function(filename) {
    const url = this.makeUrl(filename);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.async = false;
    script.defer = true;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
};

PluginManager.onError = function(e) {
    this._errorUrls.push(e.target._url);
};

PluginManager.makeUrl = function(filename) {
    return "js/plugins/" + Utils.encodeURI(filename) + ".js";
};

PluginManager.checkErrors = function() {
    const url = this._errorUrls.shift();
    if (url) {
        this.throwLoadError(url);
    }
};

PluginManager.throwLoadError = function(url) {
    throw new Error("Failed to load: " + url);
};

PluginManager.registerCommand = function(pluginName, commandName, func) {
    const key = pluginName + ":" + commandName;
    this._commands[key] = func;
};

PluginManager.callCommand = function(self, pluginName, commandName, args) {
    const key = pluginName + ":" + commandName;
    const func = this._commands[key];
    if (typeof func === "function") {
        func.bind(self)(args);
    }
};

