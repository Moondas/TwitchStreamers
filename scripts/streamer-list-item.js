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
    var StreamerListItem = (function (_super) {
        __extends(StreamerListItem, _super);
        function StreamerListItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StreamerListItem.prototype.fill = function (streamer) {
            this._streamer = streamer;
        };
        StreamerListItem.prototype.render = function () {
            var url = this._streamer.url;
            var listItem = $("<div></div>").addClass("row");
            $(listItem).on("click", function () { return window.open(url); });
            $(listItem).append("<div class=\"col-xs-1\">\n        <img src=\"" + this._streamer.logo + "\" class=\"img-circle" + (!this._streamer.isOnline ? " offline" : "") + "\" alt=\"logo\">\n      </div>");
            $(listItem).append("<div class=\"col-xs-11\">\n        <p>" + this._streamer.name + " " + this._streamer.status + "\n           " + (this._streamer.message ? "<br> " + this._streamer.message : "") + "\n        </p>\n      </div>");
            this._streamer.isOnline ? $(".main").prepend(listItem) : $(".main").append(listItem);
        };
        return StreamerListItem;
    }(models_1.Singleton));
    exports.StreamerListItem = StreamerListItem;
});
//# sourceMappingURL=streamer-list-item.js.map