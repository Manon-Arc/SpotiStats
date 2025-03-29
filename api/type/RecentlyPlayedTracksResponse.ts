import { SpotifyTrack } from "@api/type/SpotifyTrack";

export type RecentlyPlayedTracksResponse = {
    items: SpotifyTrack[];
    limit: number;
  };