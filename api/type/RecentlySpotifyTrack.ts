import { SpotifyTrack } from "@api/type/SpotifyTrack";

export type RecentlySpotifyTrack = {
    track: SpotifyTrack;
    played_at: string;
    context?: {
        type: string;
        uri: string;
        external_urls: {
            spotify: string;
        };
    };
};