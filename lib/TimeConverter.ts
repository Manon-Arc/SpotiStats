export const calculateTimeSince = (playedAt: string): string => {
  const playedTime = new Date(playedAt).getTime();
  const now = new Date().getTime();
  const diffInMinutes = Math.floor((now - playedTime) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} h`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} j`;
  }
};