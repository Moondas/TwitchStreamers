import { Dictionary } from "./types";
import { ApiUrlTypes, Channel, Stream, Streamer, Singleton, TwitchStreamerAdapter } from "./models";

class Streamers extends Singleton {
  private _users: string[] = [
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
  private _apiUrls: ApiUrlTypes = {
    streams: "https://wind-bow.glitch.me/twitch-api/streams/",
    channels: "https://wind-bow.glitch.me/twitch-api/channels/"
  };
  private _batchNo: number = 0;
  private _leftFromLoad: number;

  private _clearList(): void {
    $(".main").empty();
  }

  private _updateLoader(): void {
    $(".loader").css("width", 100 / this._leftFromLoad-- + "%");
  }

  public getStreamDatas(
    callback: (stream: Stream, channel: Channel, user: string, batchNo: number) => void
  ): void {
    // This line is important to provide request order
    let batchNo = ++this._batchNo;
    this._leftFromLoad = this._users.length;
    this._updateLoader();

    this._users.forEach(
      user => {
        $.when(
          $.getJSON(this._apiUrls.streams + user),
          $.getJSON(this._apiUrls.channels + user)
        ).done(
          (stream, channel) => callback(stream[0].stream, channel[0], user, batchNo)
        );
      }
    );
  }
  
  public list(listFilter: string = "all"): void {
    this._clearList();
    this.getStreamDatas(
      (stream, channel, user, batchNo) => {
        let hasErrorCode: boolean = (typeof channel.status === "number");
        
        this._updateLoader();
        // Exit iteration, if it doesn't meet any options, and drop older items by batchNo tagging
        if (!(this._batchNo == batchNo &&
          (listFilter == "all" ||
          (listFilter == "online" && stream) ||
          (listFilter == "offline" && stream == null && !hasErrorCode)))
        ) {
          return;
        }
        
        this.renderStreamerRow(
          (<TwitchStreamerAdapter>TwitchStreamerAdapter.Instance).input(stream, channel, user)
        );
      }
    );
  }

  public renderStreamerRow(streamer: Streamer): void {
    let listItem: JQuery<HTMLElement> = $(`<div></div>`).addClass("row");
    $(listItem).on("click", () => window.open(streamer.url));

    $(listItem).append(
      `<div class="col-xs-1">
        <img src="${ streamer.logo }" class="img-circle${ !streamer.isOnline ? " offline" : "" }" alt="logo">
      </div>`);

    $(listItem).append(
      `<div class="col-xs-11">
        <p>${ streamer.name } ${ streamer.status }
           ${ streamer.message ? `<br> ${ streamer.message }` : "" }
        </p>
      </div>`);

    // Add online users to top of the list
    streamer.isOnline ? $(".main").prepend(listItem) : $(".main").append(listItem);
  }
}

$( // Tab switcher for filter list
  () => {
    let streamers = Streamers.Instance;
    $("li").on("click", function() { // Important to use anonymus function for "this" variable
      $(".active").removeClass("active");
      $(this).addClass("active");
      streamers.list($(this).attr("id"));
    });
  streamers.list();
});