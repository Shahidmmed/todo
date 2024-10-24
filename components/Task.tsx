import React from "react";
import { Text } from "react-native";
import { ThemedView } from "./ThemedView";
import { Users } from "./models/Users";
import { useTheme } from "@react-navigation/native";

const Task: React.FC<Users> = ({ user, country, description }) => {
  const theme = useTheme();

  return (
    <ThemedView
      className={`${
        theme.dark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
      } border-2 p-4 rounded-lg flex-row items-center justify-between mb-5`}
    >
      <ThemedView
        className={`${
          theme.dark ? "bg-gray-800" : "bg-white"
        } flex-row items-center flex-wrap w-5/6 p-1`}
      >
        <ThemedView
          className={`${theme.dark ? "bg-gray-800" : "bg-white"} flex-col mb-4`}
        >
          <ThemedView
            className={`${
              theme.dark ? "bg-gray-800" : "bg-white"
            } flex justify-between flex-wrap mb-2`}
          >
            <Text className={`text-${theme.dark ? "gray-100" : "gray-900"}`}>
              User assigned: <Text className="font-semibold">{user}</Text>
            </Text>
            <Text className={`text-${theme.dark ? "gray-100" : "gray-900"}`}>
              From: <Text className="font-semibold">{country}</Text>
            </Text>
          </ThemedView>
          <ThemedView className={`${theme.dark ? "bg-gray-800" : "bg-white"}`}>
            <Text className={`text-${theme.dark ? "gray-100" : "gray-900"}`}>
              Task: <Text className="font-semibold">{description}</Text>
            </Text>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView className="w-6 h-6 bg-blue-400 opacity-40 rounded-sm" />
    </ThemedView>
  );
};

export default Task;
