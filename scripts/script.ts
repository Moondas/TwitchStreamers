import { dictionary } from "./types";
import { apiUrlTypes, Channel, Stream } from "./models";

function getInfo(listType: string = "all"): void {
  const users: string[] = [
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

  const apiUrls: apiUrlTypes = {
    streams: "https://wind-bow.glitch.me/twitch-api/streams/",
    channels: "https://wind-bow.glitch.me/twitch-api/channels/"
  };

  $(".main").empty();

  users.forEach(
    user => {
      $.when(
        $.getJSON(apiUrls.streams + user),
        $.getJSON(apiUrls.channels + user)
      ).done(
        (stream, channel) => displayStreamers(<Stream>stream[0].stream, <Channel>channel[0], listType, user)
      );
    }
  );
}

function displayStreamers(stream: Stream, channel: Channel, listType: string, user: string) {
  let div = $("<div></div>");
  let hasErrorCode: boolean = ($.isNumeric(channel.status));
  if (stream && !hasErrorCode && stream.channel) {
    channel = stream.channel;
  }
  if (!channel["logo"]) {
    channel.logo = "https://dummyimage.com/50x50/555555/777777.jpg&text=0x00";
  }
  //console.log(channel);

  var pImg = $("<div></div>").addClass("col-xs-1");
  var img = $(`<img src="${channel.logo}" alt="logo">`);
  $(img).addClass("img-circle");
  if (stream == null) $(img).addClass("offline");

  $(pImg).append(img);

  $(div).append(pImg);

  $(div).attr("data-link", channel.url);

  $(div).on("click", function() {
    window.open(
      $(this).attr("data-link")
    )
  });

  $(div).addClass("row");

  if (
    listType == "all" ||
    (listType == "online" && stream) ||
    (listType == "offline" && stream == null && !hasErrorCode)
  ) {
    $(div).append(
      '<div class="col-xs-11"><p>' +
      (hasErrorCode
          ? user + " (" + (channel.status == 422 ? "Closed" : "Not found") + ")"
          : stream
              ? `${channel.display_name} (Online)<br>${channel.status}`
              : `${channel.display_name} (Offline)`) +
        "</p></div>"
    );

    // Make online users to top of the list
    if (stream) {
      $(".main").prepend(div);
    }
    else {
      $(".main").append(div);
    }
  }
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
