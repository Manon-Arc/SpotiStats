import { create } from "zustand";

import { SpotifyTrack } from "~/api/getTopMusic";

type StoreState = {
  shortTermTopTracks: SpotifyTrack[];
  mediumTermTopTracks: SpotifyTrack[];
  longTermTopTracks: SpotifyTrack[];
  setShortTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setMediumTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setLongTermTopTracks: (tracks: SpotifyTrack[]) => void;
};

export const useStore = create<StoreState>((set) => ({
  shortTermTopTracks: [],
  mediumTermTopTracks: [],
  longTermTopTracks: [],
  setShortTermTopTracks: (tracks) => set({ shortTermTopTracks: tracks }),
  setMediumTermTopTracks: (tracks) => set({ mediumTermTopTracks: tracks }),
  setLongTermTopTracks: (tracks) => set({ longTermTopTracks: tracks }),
}));
