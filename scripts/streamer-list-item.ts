import { Streamer, Singleton } from "./models";

export class StreamerListItem extends Singleton {
  private _streamer: Streamer;

  public fill(streamer: Streamer): void {
    this._streamer = streamer;
  }

  public render(): void {
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