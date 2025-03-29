import { create } from "zustand";
import { CurrentPlaybackContext } from "@api/type/CurrentPlaybackContext";
import { SpotifyTrack } from "@api/type/SpotifyTrack";
import { RecentlySpotifyTrack } from "@api/type/RecentlySpotifyTrack"

type StoreState = {
  shortTermTopTracks: SpotifyTrack[];
  mediumTermTopTracks: SpotifyTrack[];
  longTermTopTracks: SpotifyTrack[];
  recentlyPlayedTracks: RecentlySpotifyTrack[];
  currentTrack: CurrentPlaybackContext | null; // Peut être null si aucun morceau n'est en cours
  setShortTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setMediumTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setLongTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setRecentlyPlayedTracks: (tracks: RecentlySpotifyTrack[]) => void;
  setCurrentTrack: (track: CurrentPlaybackContext | null) => void;
};

export const useStore = create<StoreState>((set) => ({
  shortTermTopTracks: [],
  mediumTermTopTracks: [],
  longTermTopTracks: [],
  recentlyPlayedTracks: [],
  currentTrack: null,
  setShortTermTopTracks: (tracks) => set({ shortTermTopTracks: tracks }),
  setMediumTermTopTracks: (tracks) => set({ mediumTermTopTracks: tracks }),
  setLongTermTopTracks: (tracks) => set({ longTermTopTracks: tracks }),
  setRecentlyPlayedTracks: (tracks) => set({ recentlyPlayedTracks: tracks }),
  setCurrentTrack: (track) => set({ currentTrack: track })
}));