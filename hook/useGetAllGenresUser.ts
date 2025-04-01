import { useTopArtistsUser } from "~/api/getTopArtistUser";
import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { GenreCount } from "@api/type/GenreCount";

export function useGetAllGenres() {
  const shortTerm = useTopArtistsUser({ time_range: "short_term" });
  const mediumTerm = useTopArtistsUser({ time_range: "medium_term" });
  const longTerm = useTopArtistsUser({ time_range: "long_term" });

  const shortTermGenres = extractUniqueGenres(shortTerm.data?.items || []);
  const mediumTermGenres = extractUniqueGenres(mediumTerm.data?.items || []);
  const longTermGenres = extractUniqueGenres(longTerm.data?.items || []);

  const allGenres = [...new Set([
    ...shortTermGenres,
    ...mediumTermGenres,
    ...longTermGenres
  ])].sort();

  // Comptage de fréquence des genres pour chaque période
  const shortTermGenreCounts = getGenreCounts(shortTerm.data?.items || []);
  const mediumTermGenreCounts = getGenreCounts(mediumTerm.data?.items || []);
  const longTermGenreCounts = getGenreCounts(longTerm.data?.items || []);

  return {
    shortTermGenresUser: shortTermGenreCounts || [],
    mediumTermGenresUser: mediumTermGenreCounts || [],
    longTermGenresUser: longTermGenreCounts || [],
    allGenresUser: allGenres || [],
    isLoadingGenres: shortTerm.isLoading || mediumTerm.isLoading || longTerm.isLoading,
    error: shortTerm.error || mediumTerm.error || longTerm.error,
  };
}

// Fonction pour extraire les genres uniques d'une liste d'artistes
function extractUniqueGenres(artists: SpotifyArtist[]): string[] {
  return [...new Set(
    artists.flatMap(artist => artist.genres || [])
  )].sort();
}

// Fonction pour compter la fréquence des genres et calculer les pourcentages
function getGenreCounts(artists: SpotifyArtist[]): GenreCount[] {
  // Comptage des occurrences
  const counts: Record<string, number> = {};
  let totalCount = 0;

  artists.forEach(artist => {
    (artist.genres || []).forEach(genre => {
      counts[genre] = (counts[genre] || 0) + 1;
      totalCount++;
    });
  });

  // Conversion en tableau avec pourcentages
  const genreCounts = Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    percentage: totalCount > 0 ? (count / totalCount) * 100 : 0,
  }));

  // Tri par fréquence décroissante
  return genreCounts.sort((a, b) => b.count - a.count);
}