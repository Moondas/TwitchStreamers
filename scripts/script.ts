import { dictionary } from "./types";
import { apiUrlTypes, Channel, Stream, Streamer } from "./models";
import { StreamerListItem } from "./streamer-list-item";

class Streamers {
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

  public constructor() {
    //  
  }

  public clearList() {
    $(".main").empty();
  }

  public getStreamDatas(listType: string) {
    this.users.forEach(
      user => {
        $.when(
          $.getJSON(this.apiUrls.streams + user),
          $.getJSON(this.apiUrls.channels + user)
        ).done(
          (stream, channel) =>
            displayStreamers(<Stream>stream[0].stream, <Channel>channel[0], listType, user)
        );
      }
    );
  }

}

function getInfo(listType: string = "all"): void {
  let streamers = new Streamers();
  streamers.clearList();
  streamers.getStreamDatas(listType);
}

function displayStreamers(stream: Stream, channel: Channel, listFilter: string, username: string) {
  let hasErrorCode: boolean = (typeof channel.status === "number");
  
  // Exit iteration, if it doesn't meet any options
  if (!(listFilter == "all" ||
        (listFilter == "online" && stream) ||
        (listFilter == "offline" && stream == null && !hasErrorCode))
  ) {
    return;
  }

  let streamer = new StreamerListItem();

  streamer.fill(stream, channel, username);
  streamer.setTemplates();
  streamer.render();
}

$( // Tab switcher for filter list
  () => {
    $("li").on("click", function() { // Important to use anonymus function for "this" variable
      $(".active").removeClass("active");
      $(this).addClass("active");
      getInfo($(this).attr("id"));
    });
  getInfo();
});
