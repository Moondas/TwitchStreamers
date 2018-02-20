import { dictionary } from "./types";
import { apiUrlTypes, Channel, Stream, Streamer, Singleton } from "./models";
import { StreamerListItem } from "./streamer-list-item";

class Streamers extends Singleton {
  public users: string[] = [
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

  public apiUrls: apiUrlTypes = {
    streams: "https://wind-bow.glitch.me/twitch-api/streams/",
    channels: "https://wind-bow.glitch.me/twitch-api/channels/"
  };

  private _streamerListItem: StreamerListItem = StreamerListItem.Instance;

  public clearList() {
    $(".main").empty();
  }

  public getStreamDatas(callback: (stream: Stream, channel: Channel, user: string) => void): void {
    this.users.forEach(
      user => {
        $.when(
          $.getJSON(this.apiUrls.streams + user),
          $.getJSON(this.apiUrls.channels + user)
        ).done(
          (stream, channel) => callback(stream[0].stream, channel[0], user)
        );
      }
    );
  }
  
  public list(listFilter: string = "all"): void {
    this.clearList();
    this.getStreamDatas(
      (stream, channel, user) => {
        let hasErrorCode: boolean = (typeof channel.status === "number");
    
        // Exit iteration, if it doesn't meet any options
        if (!(listFilter == "all" ||
            (listFilter == "online" && stream) ||
            (listFilter == "offline" && stream == null && !hasErrorCode))
        ) {
          return;
        }
        
        this._streamerListItem.fill(stream, channel, user);
        this._streamerListItem.render();
      }
    );
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
