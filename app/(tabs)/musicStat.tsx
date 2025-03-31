import { useEffect } from "react";

import { useTopArtists } from "~/api/getTopArtist";
import { useTopTracks } from "~/api/getTopMusic";
import MusicStatScreen from "~/screen/MusicStatScreen";
import { useStore } from "~/store/zustand";

export default function MusicStat() {
  // Sélecteurs du store
  const setShortTermTopTracks = useStore((state) => state.setShortTermTopTracks);
  const setMediumTermTopTracks = useStore((state) => state.setMediumTermTopTracks);
  const setLongTermTopTracks = useStore((state) => state.setLongTermTopTracks);
  const setShortTermTopArtists = useStore((state) => state.setShortTermTopArtists);
  const setMediumTermTopArtists = useStore((state) => state.setMediumTermTopArtists);
  const setLongTermTopArtists = useStore((state) => state.setLongTermTopArtists);

  // Requêtes pour les données
  const { data: shortTermData, isLoading: isLoadingShortTracks } = useTopTracks();
  const { data: mediumTermData, isLoading: isLoadingMediumTracks } = useTopTracks({
    time_range: "medium_term",
  });
  const { data: longTermData, isLoading: isLoadingLongTracks } = useTopTracks({
    time_range: "long_term",
  });

  const { data: shortTermArtistsData, isLoading: isLoadingShortArtists } = useTopArtists();
  const { data: mediumTermArtistsData, isLoading: isLoadingMediumArtists } = useTopArtists({
    time_range: "medium_term",
  });
  const { data: longTermArtistsData, isLoading: isLoadingLongArtists } = useTopArtists({
    time_range: "long_term",
  });

  // Effet pour les pistes
  useEffect(() => {
    if (shortTermData?.items) {
      setShortTermTopTracks(shortTermData.items);
    }
  }, [shortTermData, setShortTermTopTracks]);

  useEffect(() => {
    if (mediumTermData?.items) {
      setMediumTermTopTracks(mediumTermData.items);
    }
  }, [mediumTermData, setMediumTermTopTracks]);

  useEffect(() => {
    if (longTermData?.items) {
      setLongTermTopTracks(longTermData.items);
    }
  }, [longTermData, setLongTermTopTracks]);

  // Effet pour les artistes
  useEffect(() => {
    if (shortTermArtistsData?.items) {
      setShortTermTopArtists(shortTermArtistsData.items);
    }
  }, [shortTermArtistsData, setShortTermTopArtists]);

  useEffect(() => {
    if (mediumTermArtistsData?.items) {
      setMediumTermTopArtists(mediumTermArtistsData.items);
    }
  }, [mediumTermArtistsData, setMediumTermTopArtists]);

  useEffect(() => {
    if (longTermArtistsData?.items) {
      setLongTermTopArtists(longTermArtistsData.items);
    }
  }, [longTermArtistsData, setLongTermTopArtists]);

  // État de chargement global
  const isLoading =
    isLoadingShortTracks ||
    isLoadingMediumTracks ||
    isLoadingLongTracks ||
    isLoadingShortArtists ||
    isLoadingMediumArtists ||
    isLoadingLongArtists;

  return <MusicStatScreen isLoading={isLoading} />;
}
