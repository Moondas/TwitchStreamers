import { Channel, Stream, Streamer, htmlTemplates } from "./models";

export class StreamerListItem {
  private _hasErrorCode: boolean;
  private _listFilter: string;
  private _htmlTemplates:htmlTemplates = new htmlTemplates;
  private _streamer: Streamer = new Streamer;
  private _listItem: JQuery<HTMLElement>;

  public constructor() {
    //
  }

  public fill(stream: Stream, channel: Channel, username: string) {
    this._listItem = $(`<div></div>`).addClass("row");
    channel = stream ? stream.channel : channel;
    this._hasErrorCode = (typeof channel.status === "number");

    this._streamer.name = channel.display_name ? channel.display_name : username;
    this._streamer.status =
       this._hasErrorCode
        ? `${ channel.status == 404 ? "(Not found)" : "(Closed)" }`
        : `${ stream ? `(Online)` : `(Offline)` }`;
    this._streamer.isOnline = this._streamer.status == "(Online)",
    this._streamer.message = this._streamer.isOnline ? <string>channel.status : "";
    this._streamer.logo = !channel.logo ? "https://dummyimage.com/50x50/555555/777777.jpg&text=0x00" : channel.logo;    
    this._streamer.url = channel.url;
  }

  public setTemplates() {
    this._htmlTemplates.imgTemplate =
      `<div class="col-xs-1">
        <img src="${ this._streamer.logo }" class="img-circle${ !this._streamer.isOnline ? " offline" : "" }" alt="logo">
      </div>`

    this._htmlTemplates.userTemplate =
      `<div class="col-xs-11">
        <p>${ this._streamer.name } ${ this._streamer.status }
           ${ this._streamer.isOnline ? `<br> ${ this._streamer.message }` : "" }
        </p>
      </div>`;
  }

  public render() {
    $(this._listItem).on("click", () => {
      window.open(this._streamer.url)
    });

    $(this._listItem).append(...Object.values(this._htmlTemplates));

    // Add online users to top of the list
    this._streamer.isOnline ? $(".main").prepend(this._listItem) : $(".main").append(this._listItem);
  }
}