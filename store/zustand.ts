import { create } from "zustand";

type StoreState = {
  client_id: string;
  redirectUri: string;
  activeTabdDate: string;
  setClientId: (id: string) => void;
  setRedirectUri: (uri: string) => void;
  setActiveTabdDate: (activeTabdDate: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  client_id: "",
  redirectUri: "",
  activeTabdDate: "",
  setClientId: (id) => set({ client_id: id }),
  setRedirectUri: (uri) => set({ redirectUri: uri }),
  setActiveTabdDate: (activeTabdDate) => set({ activeTabdDate }),
}));
