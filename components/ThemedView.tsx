import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "@react-navigation/native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor = theme.colors.background;

  return (
    <View
      style={[
        {
          backgroundColor: lightColor
            ? lightColor
            : darkColor
            ? darkColor
            : backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
