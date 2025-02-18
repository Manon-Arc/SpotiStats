import { Box } from 'theme';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return <Box flex={1} alignItems="center" justifyContent="center" />;
};
