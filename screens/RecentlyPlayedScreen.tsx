import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import RecentlyTrackCard from '~/components/RecentlyTrackCard';
import { calculateTimeSince } from '~/lib/TimeConverter';
import Header from '@components/Header';
import { Box } from "~/theme";
import { router } from 'expo-router';
import { Loader } from '~/components/Loader';
import { RecentlyPlayedTracks } from "@api/type/RecentlyPlayedTracks";

interface RecentlyPlayedScreenProps {
  isLoading: boolean;
}

type RenderTrackProps = {
  item: RecentlyPlayedTracks | undefined;
  index: number;
};

const RecentlyPlayedScreen: React.FC<RecentlyPlayedScreenProps> = ({ isLoading }) => {
  const { recentlyPlayedTracks } = useGetRecentlyPlayedTracks(50);

  const goBack = () => {
    router.back();
  };

  const renderTrackItem = ({ item, index } : RenderTrackProps) => {
    const track = item!.track;
    if (!track?.album?.images[0]?.url || !track.name || !track.artists[0]?.name) {
      return null;
    }
    return (
      <RecentlyTrackCard
        key={`${track.id}-${index}`}
        ImageUrl={track.album.images[0].url}
        Titre={track.name}
        Artiste={track.artists[0].name}
        Played_ago={calculateTimeSince(item!.played_at)}
      />
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box style={styles.container}>
      <Header title="Écouté récemment" onBack={goBack} />
      <FlatList
        data={recentlyPlayedTracks}
        renderItem={renderTrackItem}
        keyExtractor={(item, index) => `${item.track.id}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default RecentlyPlayedScreen;
