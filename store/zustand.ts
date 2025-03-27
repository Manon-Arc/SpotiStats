import { create } from "zustand";

import { SpotifyTrack } from "~/api/getTopMusic";

type StoreState = {
  client_id: string;
  client_secret: string;
  redirectUri: string;
  setClientId: (id: string) => void;
  setClientSecret: (secret: string) => void;
  setRedirectUri: (uri: string) => void;
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
  client_id: "",
  client_secret: "",
  redirectUri: "",
  setShortTermTopTracks: (tracks) => set({ shortTermTopTracks: tracks }),
  setMediumTermTopTracks: (tracks) => set({ mediumTermTopTracks: tracks }),
  setLongTermTopTracks: (tracks) => set({ longTermTopTracks: tracks }),
  setClientId: (id) => set({ client_id: id }),
  setClientSecret: (secret) => set({ client_secret: secret }),
  setRedirectUri: (uri) => set({ redirectUri: uri }),
}));
