export interface ApiUrlTypes {
  streams: string;
  channels: string;
}

export interface Channel {
  url: string;
  logo: string;
  display_name: string;
  status: (string | number);
}

export interface Stream {
  channel: Channel
}
  
export class Streamer {
  public name: string;
  public status: string;
  public message: string;
  public logo: string;
  public url: string;  
  public isOnline: boolean;

  public fill(filler: Object): Streamer {
    Object.assign(this, filler);
    this.isOnline = this.status == "(Online)";
    return this;
  }  
}

export class Singleton {
  protected static _instance;

  protected constructor() {
    // Protect from instantiation
  }

  public static get Instance() {
    if (!this._instance) {
      return this._instance = new this;
    }
    return this._instance;    
  }
}

export class TwitchStreamerAdapter extends Singleton {
  public input(stream: Stream, channel: Channel, user: string): Streamer {
    channel = stream ? stream.channel : channel;
    let hasErrorCode = (typeof channel.status === "number");

    return new Streamer().fill({
      name: channel.display_name ? channel.display_name : user,
      status:
        hasErrorCode
          ? `${ channel.status == 404 ? "(Not found)" : "(Closed)" }`
          : `${ stream ? `(Online)` : `(Offline)` }`,
      message: !hasErrorCode ? <string>channel.status : "",
      logo: !channel.logo ? "https://dummyimage.com/50x50/616161/cccccc.jpg&text=0x00" : channel.logo,
      url: channel.url
    });
  }
}