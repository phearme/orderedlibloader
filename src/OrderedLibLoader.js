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
                        if (window.console) { console.log(e); }
                    }
                }
            }
        }
    };

    OrderedLibLoader.prototype.loadAllLibs = function (callback) {
        var self = this,
            onAllDone = function () {
                self.dispatchEvent("onAllLibsLoaded", self.libs);
                if (typeof callback === "function") {
                    callback(self.libs);
                }
            },
            loadLib = function (index) {
                var s = document.createElement("script"),
                    onLoad = function () {
                        self.libs[index].status = "loaded";
                        if (index === self.libs.length - 1) {
                            onAllDone();
                            return;
                        }
                        loadLib(index + 1);
                    },
                    onFail = function () {
                        self.libs[index].status = "failed";
                        if (index === self.libs.length - 1) {
                            onAllDone();
                            return;
                        }
                        loadLib(index + 1);
                    };
                s.setAttribute("type", "text/javascript");
                s.setAttribute("src", self.libs[index].url);
                if (s.addEventListener) {
                    s.addEventListener("load", onLoad, false);
                    s.addEventListener("error", onFail, false);
                } else {
                    s.onreadystatechange = onLoad;
                }
                document.getElementsByTagName("head")[0].appendChild(s);
            };
        if (this.libs.length === 0) {
            onAllDone();
            return;
        }
        loadLib(0);
    };

    return OrderedLibLoader;
}());
