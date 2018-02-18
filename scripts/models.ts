export class apiUrlTypes {
    public streams: string;
    public channels: string;
}

export class Channel {
    public url: string;
    public logo: string;
    public display_name: string;
    public status: (string | number);
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
}

export class htmlTemplates {
  public imgTemplate: string;
  public userTemplate: string;
}