import UserStatScreen from "@screens/UserStatScreen";
import { useGetAllGenres } from "@hooks/useGetAllGenresUser";

export default function Home() {
  const { isLoadingGenres } = useGetAllGenres();

  const isLoading = isLoadingGenres;

  return <UserStatScreen isLoading={isLoading} />;
}
