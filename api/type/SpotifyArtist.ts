import { SpotifyExternalUrls } from '@api/type/SpotifyExternalUrls';
import { SpotifyImage } from '@api/type/SpotifyImage';

export type SpotifyArtist = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    images: SpotifyImage[];
    type: string;
    uri: string;
};