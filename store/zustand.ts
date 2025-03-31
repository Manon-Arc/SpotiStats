import { create } from "zustand";

import { SpotifyArtist, SpotifyTrack } from "~/api/getTopMusic";

type StoreState = {
  client_id: string;
  redirectUri: string;
  setClientId: (id: string) => void;
  setRedirectUri: (uri: string) => void;
  shortTermTopTracks: SpotifyTrack[];
  mediumTermTopTracks: SpotifyTrack[];
  longTermTopTracks: SpotifyTrack[];
  shortTermTopArtists: SpotifyArtist[];
  mediumTermTopArtists: SpotifyArtist[];
  longTermTopArtists: SpotifyArtist[];
  setShortTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setMediumTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setLongTermTopTracks: (tracks: SpotifyTrack[]) => void;
  setShortTermTopArtists: (artists: SpotifyArtist[]) => void;
  setMediumTermTopArtists: (artists: SpotifyArtist[]) => void;
  setLongTermTopArtists: (artists: SpotifyArtist[]) => void;
};

export const useStore = create<StoreState>((set) => ({
  shortTermTopTracks: [],
  mediumTermTopTracks: [],
  longTermTopTracks: [],
  shortTermTopArtists: [],
  mediumTermTopArtists: [],
  longTermTopArtists: [],
  client_id: "",
  redirectUri: "",
  setShortTermTopTracks: (tracks) => set({ shortTermTopTracks: tracks }),
  setMediumTermTopTracks: (tracks) => set({ mediumTermTopTracks: tracks }),
  setLongTermTopTracks: (tracks) => set({ longTermTopTracks: tracks }),
  setShortTermTopArtists: (artists) => set({ shortTermTopArtists: artists }),
  setMediumTermTopArtists: (artists) => set({ mediumTermTopArtists: artists }),
  setLongTermTopArtists: (artists) => set({ longTermTopArtists: artists }),
  setClientId: (id) => set({ client_id: id }),
  setRedirectUri: (uri) => set({ redirectUri: uri }),
}));
