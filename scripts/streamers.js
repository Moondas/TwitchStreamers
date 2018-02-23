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
define(["require", "exports", "./models"], function (require, exports, models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Streamers = (function (_super) {
        __extends(Streamers, _super);
        function Streamers() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._users = [
                "ESL_SC2",
                "OgamingSC2",
                "cretetion",
                "freecodecamp",
                "storbeck",
                "habathcx",
                "RobotCaleb",
                "noobs2ninjas",
                "brunofin",
                "comster404"
            ];
            _this._apiUrls = {
                streams: "https://wind-bow.glitch.me/twitch-api/streams/",
                channels: "https://wind-bow.glitch.me/twitch-api/channels/"
            };
            _this._batchNo = 0;
            return _this;
        }
        Streamers.prototype._clearList = function () {
            $(".main").empty();
        };
        Streamers.prototype._updateLoader = function () {
            $(".loader").css("width", 100 / this._leftFromLoad-- + "%");
        };
        Streamers.prototype.getStreamDatas = function (callback) {
            var _this = this;
            var batchNo = ++this._batchNo;
            this._leftFromLoad = this._users.length;
            this._updateLoader();
            this._users.forEach(function (user) {
                $.when($.getJSON(_this._apiUrls.streams + user), $.getJSON(_this._apiUrls.channels + user)).done(function (stream, channel) { return callback(stream[0].stream, channel[0], user, batchNo); });
            });
        };
        Streamers.prototype.list = function (listFilter) {
            var _this = this;
            if (listFilter === void 0) { listFilter = "all"; }
            this._clearList();
            this.getStreamDatas(function (stream, channel, user, batchNo) {
                var hasErrorCode = (typeof channel.status === "number");
                _this._updateLoader();
                if (!(_this._batchNo == batchNo &&
                    (listFilter == "all" ||
                        (listFilter == "online" && stream) ||
                        (listFilter == "offline" && stream == null && !hasErrorCode)))) {
                    return;
                }
                _this.renderStreamerRow(models_1.TwitchStreamerAdapter.Instance.input(stream, channel, user));
            });
        };
        Streamers.prototype.renderStreamerRow = function (streamer) {
            var listItem = $("<div></div>").addClass("row");
            $(listItem).on("click", function () { return window.open(streamer.url); });
            $(listItem).append("<div class=\"col-xs-1\">\n        <img src=\"" + streamer.logo + "\" class=\"img-circle" + (!streamer.isOnline ? " offline" : "") + "\" alt=\"logo\">\n      </div>");
            $(listItem).append("<div class=\"col-xs-11\">\n        <p>" + streamer.name + " " + streamer.status + "\n           " + (streamer.message ? "<br> " + streamer.message : "") + "\n        </p>\n      </div>");
            streamer.isOnline ? $(".main").prepend(listItem) : $(".main").append(listItem);
        };
        return Streamers;
    }(models_1.Singleton));
    $(function () {
        var streamers = Streamers.Instance;
        $("li").on("click", function () {
            $(".active").removeClass("active");
            $(this).addClass("active");
            streamers.list($(this).attr("id"));
        });
        streamers.list();
    });
});
//# sourceMappingURL=streamers.js.map