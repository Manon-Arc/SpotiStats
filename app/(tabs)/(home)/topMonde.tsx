import { useGetAllTopTracks } from "@hooks/useGetAllTopTracks";
import {TopTrackScreen} from "@screens/TopTrackScreen";

export default function TopTrack() {
  const { isLoadingtopTrackGlobal } = useGetAllTopTracks()

  const isLoading = isLoadingtopTrackGlobal;

  return <TopTrackScreen isLoading={isLoading}/>;
}