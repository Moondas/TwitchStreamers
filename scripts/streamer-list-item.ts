import { Channel, Stream, Streamer, Singleton } from "./models";

export class StreamerListItem extends Singleton {
  private _streamer: Streamer;

  public fill(stream: Stream, channel: Channel, user: string) {
    channel = stream ? stream.channel : channel;
    let hasErrorCode = (typeof channel.status === "number");

    this._streamer = new Streamer()
    
    this._streamer.fill({
        name: channel.display_name ? channel.display_name : user,
        status:
          hasErrorCode
            ? `${channel.status == 404 ? "(Not found)" : "(Closed)"}`
            : `${stream ? `(Online)` : `(Offline)`}`,
        message: !hasErrorCode ? <string>channel.status : "",
        logo: !channel.logo ? "https://dummyimage.com/50x50/616161/cccccc.jpg&text=0x00" : channel.logo,
        url: channel.url
      });
  }

  public render() {
    let url = this._streamer.url;
    let listItem: JQuery<HTMLElement> = $(`<div></div>`).addClass("row");
    $(listItem).on("click", () => window.open(url));

    $(listItem).append(
      `<div class="col-xs-1">
        <img src="${ this._streamer.logo }" class="img-circle${ !this._streamer.isOnline ? " offline" : "" }" alt="logo">
      </div>`);

    $(listItem).append(
      `<div class="col-xs-11">
        <p>${ this._streamer.name } ${ this._streamer.status }
           ${ this._streamer.message ? `<br> ${ this._streamer.message }` : "" }
        </p>
      </div>`);

    // Add online users to top of the list
    this._streamer.isOnline ? $(".main").prepend(listItem) : $(".main").append(listItem);
  }
}