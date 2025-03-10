import { router } from "expo-router";
import { Button } from "react-native";
import { Box, Text } from "theme";

import { EditScreenInfo } from "./EditScreenInfo";

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text variant="title">{title}</Text>
      <Box height={1} marginVertical="l_32" width="80%" backgroundColor="grey" />
      <EditScreenInfo path={path} />
      {children}
      <Button title="Go to OnBoarding" onPress={() => router.push("/onBoarding")} />
    </Box>
  );
};
