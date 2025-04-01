import { TopTracksResponse } from "@api/type/TopTracksResponse";
import { useQuery } from "@tanstack/react-query";

import apiClient from "~/api/apiClient";

// Paramètres pour la requête
export type TopTracksParams = {
    id?: string;
    limit?: number;
    offset?: number;
    fields?: string;
};

// Fonction pour récupérer les tops morceaux
const fetchTopTracks = async (params: TopTracksParams = {}): Promise<TopTracksResponse> => {
    try {
        const { data } = await apiClient.get("/playlists/5FN6Ego7eLX6zHuCMovIR2/tracks", { // id de la playlist Top 50 : monde
            params: {
                id: "5FN6Ego7eLX6zHuCMovIR2",
                limit: params.limit || 50,
                offset: params.offset || 0,
                fields: "items(added_by.id,track(name,href,album(name,href,images)))",
            },
        });
        data.items = data.items.map((item: any) => {
            return item.track;
        });
        // console.log("Réponse de l'API pour les tops morceaux:", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tops morceaux:", error);
        throw error;
    }
};

// Hook pour utiliser la requête avec TanStack Query
export const useTopTracks = (params: TopTracksParams = {}) => {
    return useQuery({
        queryKey: ["topTrack", params],
        queryFn: () => fetchTopTracks(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
