import { SpotifyTrack } from "@api/type/SpotifyTrack";

export type CurrentPlaybackContext = {
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: SpotifyTrack;
  currently_playing_type: string;
};
