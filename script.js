function getInfo(str) {
  var id = str || "all";

  var channels = [
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

  var urls = [
    "https://wind-bow.glitch.me/twitch-api/streams/",
    "https://wind-bow.glitch.me/twitch-api/channels/"
  ];

  $(".main").empty();

  channels.forEach(function(channel) {
    $.when(
      $.getJSON(urls[0] + channel),
      $.getJSON(urls[1] + channel)
    ).done(function(d1, d2) {
      displayStreamers(d1, d2, id, channel);
    });
  });
}

function displayStreamers(strm, chn, id, channel) {
  var chn = chn[0], strm = strm[0];
  var div = $("<div></div>");
  var stream = strm.stream || null;
  if ($.isNumeric(chn.status)) stream = undefined;
  var chnl = strm.channel || chn; // Channel
  var url = chnl.url || "";
  var logo =
    chnl.logo || "https://dummyimage.com/50x50/555555/777777.jpg&text=0x00";

  console.log(chnl);

  var pImg = $("<div></div>").addClass("col-xs-1");
  var img = $('<img src="' + logo + '" alt="logo">');
  $(img).addClass("img-circle");
  if (stream == null) $(img).addClass("offline");

  $(pImg).append(img);

  $(div).append(pImg);

  $(div).attr("data-link", url);

  $(div).on("click", function() {
    window.open($(this).attr("data-link"));
  });

  $(div).addClass("row");

  if (
    id == "all" ||
    (id == "online" && stream) ||
    (id == "offline" && stream === null)
  ) {
    $(div).append(
      '<div class="col-xs-11"><p>' +
        (stream === undefined
          ? channel + " (" + (chn.status == 422 ? "Closed" : "Not found") + ")"
          : stream
              ? chnl.display_name + " (Online)" + "<br>" + chnl.status
              : chnl.display_name + " (Offline)") +
        "</p></div>"
    );

    // Makes Onlines to top of the list
    if (stream) $(".main").prepend(div);
    else $(".main").append(div);
  }
}

$(function() {
  $("li").on("click", function() {
    $(".active").removeClass("active");
    $(this).addClass("active");
    getInfo($(this).attr("id"));
  });

  getInfo();
});
