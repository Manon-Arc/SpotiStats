import { SpotifyArtist } from "@api/type/SpotifyArtist";

export type TopArtistsResponse = {
  artists: {
    items: SpotifyArtist[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
    previous: string | null;
  };
};
