import { SpotifyTrack } from "@api/type/SpotifyTrack";

export type TopTracksResponse = {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
};