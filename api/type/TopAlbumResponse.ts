import { SpotifyAlbum } from "@api/type/SpotifyAlbum";

export type TopAlbumsResponse = {
  albums: {
    items: SpotifyAlbum[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
    previous: string | null;
  };
};
