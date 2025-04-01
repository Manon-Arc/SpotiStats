import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { SpotifyExternalUrls } from "@api/type/SpotifyExternalUrls";
import { SpotifyImage } from "@api/type/SpotifyImage";

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};
