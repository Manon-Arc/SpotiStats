import React from "react";
import { FlatList } from "react-native";
import TopElementBloc from "@components/TopElementBloc";
import TopElementBlocGenres from "@components/TopElementsCarrouselGenres";
import { SpotifyTrack } from "@api/type/SpotifyTrack";
import { SpotifyAlbum } from "@api/type/SpotifyAlbum";
import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { GenreCount } from "@api/type/GenreCount";

interface TopElementCarrouselProps {
  artists?: SpotifyArtist[];
  tracks?: SpotifyTrack[];
  albums?: SpotifyAlbum[];
  genres?: GenreCount[];
}

// Type pour les éléments du carrousel
type CarrouselElement = {
  id: string;
  name: string;
  data: (SpotifyArtist | SpotifyTrack | SpotifyAlbum | GenreCount)[];
  type: "artists" | "tracks" | "albums" | "genres";
};

const TopElementCarrousel = ({ artists = [], tracks = [], albums = [], genres = [] }: TopElementCarrouselProps) => {
  // Création des éléments du carrousel avec typage strict
  const elements: CarrouselElement[] = [
    { id: "artists", name: "Artistes", data: artists, type: "artists" } as CarrouselElement,
    { id: "tracks", name: "Titres", data: tracks, type: "tracks" } as CarrouselElement,
    { id: "albums", name: "Albums", data: albums, type: "albums" } as CarrouselElement,
    { id: "genres", name: "Genres", data: genres, type: "genres" } as CarrouselElement,
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
      renderItem={({ item }) => {
        // Utiliser un opérateur ternaire pour déterminer quel composant afficher
        return item.type === "genres" ? (
          // Pour les genres, utiliser TopElementBlocGenres
          <TopElementBlocGenres
            items={item.data as GenreCount[]}
            title={item.name}
            maxGenres={8}
          />
        ) : (
          // Pour les autres types, utiliser TopElementBloc
          <TopElementBloc
            title={item.name}
            images={item.data.map((element) => {
              // Type guard pour s'assurer que getImageUrl reçoit le bon type
              if ('name' in element && ('images' in element || 'album' in element)) {
                return getImageUrl(element as SpotifyArtist | SpotifyTrack | SpotifyAlbum);
              }
              return undefined;
            }).filter(Boolean) as string[]}
            type={item.type}
          />
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TopElementCarrousel;