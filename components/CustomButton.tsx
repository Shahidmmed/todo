import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
  IconComponent?: JSX.Element;
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
  IconComponent,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white rounded-xl flex-row min-h-[62px] justify-center items-center ${containerStyles}`}
      onPress={onPress}
    >
      {IconComponent && (
        <View className="absolute left-6">{IconComponent}</View>
      )}
      <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
