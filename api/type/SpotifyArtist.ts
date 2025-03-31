import { SpotifyExternalUrls } from '@api/type/SpotifyExternalUrls';

export type SpotifyArtist = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    images: Array<{
        url: string;
        height: number | null;
        width: number | null;
      }>;
    type: string;
    uri: string;
};