import { GenreCount } from "@api/type/GenreCount";
import { SpotifyAlbum } from "@api/type/SpotifyAlbum";
import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { SpotifyTrack } from "@api/type/SpotifyTrack";
import TopElementBloc from "@components/TopElementBloc";
import TopElementBlocGenres from "@components/TopElementsCarrouselGenres";
import React from "react";
import { FlatList } from "react-native";

interface TopElementCarrouselProps {
  artists?: SpotifyArtist[];
  tracks?: SpotifyTrack[];
  albums?: SpotifyAlbum[];
  genres?: GenreCount[];
  isGlobal?: boolean;
}

// Type pour les éléments du carrousel
type CarrouselElement = {
  id: string;
  name: string;
  data: (SpotifyArtist | SpotifyTrack | GenreCount)[];
  type: "artists" | "tracks" | "genres";
};

const TopElementCarrousel = ({
  artists = [],
  tracks = [],
  genres = [],
  isGlobal = false,
}: TopElementCarrouselProps) => {
  // Création des éléments du carrousel avec typage strict
  const elements: CarrouselElement[] = [
    { id: "artists", name: "Artistes", data: artists, type: "artists" } as CarrouselElement,
    { id: "tracks", name: "Titres", data: tracks, type: "tracks" } as CarrouselElement,
    { id: "genres", name: "Genres", data: genres, type: "genres" } as CarrouselElement,
  ].filter((item) => item.data.length > 0);

  // Fonction d'extraction d'URL d'image avec typage
  const getImageUrl = (item: SpotifyArtist | SpotifyTrack): string | undefined => {
    if ("images" in item && item.images && item.images[0]) {
      return item.images[0].url;
    } else if ("album" in item && item.album?.images && item.album.images[0]) {
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
            maxGenres={5}
            isGlobal={isGlobal}
          />
        ) : (
          // Pour les autres types, utiliser TopElementBloc
          <TopElementBloc
            title={item.name}
            images={
              item.data
                .map((element) => {
                  // Type guard pour s'assurer que getImageUrl reçoit le bon type
                  if ("name" in element && ("images" in element || "album" in element)) {
                    return getImageUrl(element as SpotifyArtist | SpotifyTrack);
                  }
                  return undefined;
                })
                .filter(Boolean) as string[]
            }
            type={item.type}
            isGlobal={isGlobal}
          />
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TopElementCarrousel;
