/*jslint browser: true*/
var OrderedLibLoader = (function () {
    "use strict";
    function OrderedLibLoader() {
        this.libs = [];
        this.eventListeners = {
            onAllLibsLoaded: [],
            onException: []
        };
    }

    OrderedLibLoader.prototype.libModelFactory = function (libUrl) {
        return { url: libUrl };
    };

    OrderedLibLoader.prototype.addLib = function (url) {
        if (url && url !== "") {
            this.libs.push(this.libModelFactory(url));
        }
    };

    OrderedLibLoader.prototype.removeLib = function (url) {
        var i;
        for (i = 0; i < this.libs.length; i += 1) {
            if (this.libs[i].url === url) {
                this.libs.splice(i, 1);
            }
        }
    };

    OrderedLibLoader.prototype.clearLibs = function () {
        this.libs = [];
    };

    OrderedLibLoader.prototype.getLibs = function () {
        return this.libs;
    };

    OrderedLibLoader.prototype.addEventListener = function (eventName, listener) {
        if (eventName && eventName !== "" && typeof listener === "function" && this.eventListeners[eventName]) {
            return this.eventListeners[eventName].push(listener);
        }
        return undefined;
    };

    OrderedLibLoader.prototype.dispatchEvent = function (eventName, args) {
        var i;
        if (eventName && eventName !== "" && this.eventListeners[eventName]) {
            for (i = 0; i < this.eventListeners[eventName].length; i += 1) {
                if (typeof this.eventListeners[eventName][i] === "function") {
                    try {
                        this.eventListeners[eventName][i](args);
                    } catch (e) {
                        if (window.console) { window.console.log(e); }
                    }
                }
            }
        }
    };

    OrderedLibLoader.prototype.onAllDone = function (callback) {
        this.dispatchEvent("onAllLibsLoaded", this.libs);
        if (typeof callback === "function") {
            callback(this.libs);
        }
    };

    OrderedLibLoader.prototype.loadAllLibs = function (callback) {
        var self = this,
            loadLib = function (index) {
                var s = document.createElement("script"),
                    onLoadDone = function (success) {
                        self.libs[index].status = success ? "loaded" : "failed";
                        if (index === self.libs.length - 1) {
                            self.onAllDone(callback);
                            return;
                        }
                        loadLib(index + 1);
                    };
                s.setAttribute("type", "text/javascript");
                s.setAttribute("src", self.libs[index].url);
                if (s.addEventListener) {
                    s.addEventListener("load", function () { onLoadDone(true); }, false);
                    s.addEventListener("error", function () { onLoadDone(false); }, false);
                } else {
                    s.onreadystatechange = function () { onLoadDone(true); };
                }
                document.getElementsByTagName("head")[0].appendChild(s);
            };
        if (this.libs.length === 0) {
            this.onAllDone(callback);
            return;
        }
        loadLib(0);
    };

    return OrderedLibLoader;
}());
