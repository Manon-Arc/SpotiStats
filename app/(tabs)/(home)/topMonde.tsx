import { useGetAllTopTracks } from "@hooks/useGetAllTopTracks";
import { TopTrackScreen } from "@screens/TopTrackScreen";

export default function TopTrack() {
  const { isLoadingtopTrackGlobal } = useGetAllTopTracks();

  return <TopTrackScreen isLoading={isLoadingtopTrackGlobal} />;
}
