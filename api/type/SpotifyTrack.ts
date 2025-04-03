import { SpotifyAlbum } from "@api/type/SpotifyAlbum";
import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { SpotifyExternalUrls } from "@api/type/SpotifyExternalUrls";

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: SpotifyExternalUrls;
  href: string;
  uri: string;
  popularity: number;
  is_playable?: boolean;
  type: string;
  duration_ms?: number;
};
