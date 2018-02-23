var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Streamer = (function () {
        function Streamer() {
        }
        Streamer.prototype.fill = function (filler) {
            Object.assign(this, filler);
            this.isOnline = this.status == "(Online)";
            return this;
        };
        return Streamer;
    }());
    exports.Streamer = Streamer;
    var Singleton = (function () {
        function Singleton() {
        }
        Object.defineProperty(Singleton, "Instance", {
            get: function () {
                if (!this._instance) {
                    return this._instance = new this;
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return Singleton;
    }());
    exports.Singleton = Singleton;
    var TwitchStreamerAdapter = (function (_super) {
        __extends(TwitchStreamerAdapter, _super);
        function TwitchStreamerAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TwitchStreamerAdapter.prototype.input = function (stream, channel, user) {
            channel = stream ? stream.channel : channel;
            var hasErrorCode = (typeof channel.status === "number");
            return new Streamer().fill({
                name: channel.display_name ? channel.display_name : user,
                status: hasErrorCode
                    ? "" + (channel.status == 404 ? "(Not found)" : "(Closed)")
                    : "" + (stream ? "(Online)" : "(Offline)"),
                message: !hasErrorCode ? channel.status : "",
                logo: !channel.logo ? "https://dummyimage.com/50x50/616161/cccccc.jpg&text=0x00" : channel.logo,
                url: channel.url
            });
        };
        return TwitchStreamerAdapter;
    }(Singleton));
    exports.TwitchStreamerAdapter = TwitchStreamerAdapter;
});
//# sourceMappingURL=models.js.map