import { useGetAllGenres } from "@hooks/useGetAllGenresUser";
import UserStatScreen from "@screens/UserStatScreen";

export default function Home() {
  const { isLoadingGenres } = useGetAllGenres();

  return <UserStatScreen isLoading={isLoadingGenres} />;
}
