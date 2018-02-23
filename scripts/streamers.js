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
define(["require", "exports", "./models", "./streamer-list-item"], function (require, exports, models_1, streamer_list_item_1) {
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
            _this._streamerListItem = streamer_list_item_1.StreamerListItem.Instance;
            _this._batchNo = 0;
            return _this;
        }
        Streamers.prototype.clearList = function () {
            $(".main").empty();
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
            this.clearList();
            this.getStreamDatas(function (stream, channel, user, batchNo) {
                var hasErrorCode = (typeof channel.status === "number");
                _this._updateLoader();
                if (!(_this._batchNo == batchNo &&
                    (listFilter == "all" ||
                        (listFilter == "online" && stream) ||
                        (listFilter == "offline" && stream == null && !hasErrorCode)))) {
                    return;
                }
                _this._streamerListItem.fill(stream, channel, user);
                _this._streamerListItem.render();
            });
        };
        Streamers.prototype._updateLoader = function () {
            var loader = $(".loader");
            loader.css("width", 100 / this._leftFromLoad-- + "%");
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