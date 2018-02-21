export interface apiUrlTypes {
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

  public fill(filler: Object) {
    Object.assign(this, filler);
    this.isOnline = this.status == "(Online)";   
  }  
}

export class Singleton {
  protected static _instance;

  protected constructor() {
    // Protect from instantiation
  }

  public static get Instance() {
    if (this._instance) {
      return this._instance;
    } else {
      return this._instance = new this;
    }
  }

}