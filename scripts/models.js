define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Streamer = (function () {
        function Streamer() {
        }
        Streamer.prototype.fill = function (filler) {
            Object.assign(this, filler);
            this.isOnline = this.status == "(Online)";
        };
        return Streamer;
    }());
    exports.Streamer = Streamer;
    var Singleton = (function () {
        function Singleton() {
        }
        Object.defineProperty(Singleton, "Instance", {
            get: function () {
                if (this._instance) {
                    return this._instance;
                }
                else {
                    return this._instance = new this;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Singleton;
    }());
    exports.Singleton = Singleton;
});
//# sourceMappingURL=models.js.map