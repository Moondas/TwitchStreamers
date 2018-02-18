import { dictionary } from "./types";
import { apiUrlTypes, Channel, Stream } from "./models";

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

  let div: JQuery<HTMLElement> = $(`<div></div>`).addClass("row");
  channel = stream ? stream.channel : channel;
  channel.logo = !channel.logo ? "https://dummyimage.com/50x50/555555/777777.jpg&text=0x00" : channel.logo;

  let imgTemplate =
   `<div class="col-xs-1">
      <img src="${channel.logo}" class="img-circle${stream === null ? " offline" : ""}" alt="logo">
    </div>`

  let userTemplate =
    `<div class="col-xs-11">
      <p>${channel.display_name ? channel.display_name : username}
        ${
          hasErrorCode
            ? `${channel.status == 404 ? "(Not found)" : "(Closed)"}`
            : `${stream ? `(Online)<br>${channel.status}` : `(Offline)`}`
        }
      </p>
    </div>`;

  $(div).on("click", function() {
    window.open(channel.url)
  });

  $(div).append(imgTemplate, userTemplate);

  // Add online users to top of the list
  stream ? $(".main").prepend(div) : $(".main").append(div);
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
