import { SpotifyAlbum } from "@api/type/SpotifyAlbum";
import { SpotifyExternalUrls } from "@api/type/SpotifyExternalUrls"
import { SpotifyArtist } from "@api/type/SpotifyArtist"

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