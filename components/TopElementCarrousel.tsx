// TopElementCarrousel.tsx
import React from "react";
import { FlatList } from "react-native";
import TopElementBloc from "./TopElementBloc";
import { SpotifyTrack } from "~/api/type/SpotifyTrack";
import { SpotifyAlbum } from "~/api/type/SpotifyAlbum";
import { SpotifyArtist } from "~/api/type/SpotifyArtist";

interface TopElementCarrouselProps {
  artists?: SpotifyArtist[];
  tracks?: SpotifyTrack[];
  albums?: SpotifyAlbum[];
}

// Type pour les éléments du carrousel
type CarrouselElement = {
  id: string;
  name: string;
  data: (SpotifyArtist | SpotifyTrack | SpotifyAlbum)[];
  type: "artists" | "tracks" | "albums";
};

const TopElementCarrousel = ({ artists = [], tracks = [], albums = [] }: TopElementCarrouselProps) => {
  // Création des éléments du carrousel avec typage strict
  const elements: CarrouselElement[] = [
    { id: "artists", name: "Artistes", data: artists, type: "artists" as const },
    { id: "tracks", name: "Titres", data: tracks, type: "tracks" as const },
    { id: "albums", name: "Albums", data: albums, type: "albums" as const },
  ].filter((item) => item.data.length > 0);

  // Fonction d'extraction d'URL d'image avec typage
  const getImageUrl = (item: SpotifyArtist | SpotifyTrack | SpotifyAlbum): string | undefined => {
    if ('images' in item && item.images && item.images[0]) {
      return item.images[0].url;
    } else if ('album' in item && item.album?.images && item.album.images[0]) {
      return item.album.images[0].url;
    }
    return undefined;
  };

  return (
    <FlatList
      horizontal
      data={elements}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TopElementBloc
          title={item.name}
          images={item.data.map(getImageUrl).filter(Boolean) as string[]}
          type={item.type}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TopElementCarrousel;