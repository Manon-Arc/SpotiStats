import { BoxProps } from "@shopify/restyle";
import React from "react";
import Animated from "react-native-reanimated";

import Box from "./Box";
import { Theme } from "./theme";

interface AnimatedBoxProps extends BoxProps<Theme> {
  children: React.ReactNode;
  entering?: any;
  exiting?: any;
  style?: any; // Ajout du style
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  children,
  entering,
  exiting,
  style,
  ...props
}) => {
  return (
    <Animated.View entering={entering} exiting={exiting} style={style}>
      <Box {...props}>{children}</Box>
    </Animated.View>
  );
};

export default AnimatedBox;
