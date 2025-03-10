import { Stack } from 'expo-router';
import { Box, makeStyles, Text } from 'theme';
import OnBoardingScreen from "~/screens/OnBoardingScreen";

export default function OnBoarding() {
  const styles = useStyles();

  return (
    <>
      <OnBoardingScreen />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    marginTop: theme.spacing.m_16,
    paddingVertical: theme.spacing.m_16,
  },
}));
