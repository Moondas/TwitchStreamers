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

export type Stream = {
    channel: Channel
}