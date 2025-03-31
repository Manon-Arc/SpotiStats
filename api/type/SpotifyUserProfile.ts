export type SpotifyUserProfile = {
    country: string;
    display_name: string;
    email: string;
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    images: Array<{
      url: string;
      height: number | null;
      width: number | null;
    }>;
    product: string;
    type: string;
    uri: string;
  }