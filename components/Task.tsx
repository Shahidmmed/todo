import React from "react";
import { View, Text } from "react-native";
import { ThemedView } from "./ThemedView"; // Assuming you have a ThemedView component
import { Users } from "./models/Users";

// Define the type for the props
interface TaskProps {
  text: string;
}

const Task: React.FC<Users> = ({ user, country, description }) => {
  return (
    <ThemedView className="bg-white border-2 dark:bg-gray-800 p-4 rounded-lg flex-row items-center justify-between mb-5">
      <ThemedView className="flex-row bg-white dark:bg-gray-800 items-center flex-wrap w-5/6 p-1">
        <ThemedView className="bg-white dark:bg-gray-800 flex-col mb-4">
          <ThemedView className="bg-white dark:bg-gray-800 flex justify-between flex-wrap mb-2">
            <Text className="text-gray-900 dark:text-gray-100">
              User assigned: <Text className="font-semibold">{user}</Text>
            </Text>
            <Text className="text-gray-900 dark:text-gray-100">
              From: <Text className="font-semibold">{country}</Text>
            </Text>
          </ThemedView>
          <ThemedView className="bg-white dark:bg-gray-800">
            <Text className="text-gray-900 dark:text-gray-100">
              Task: <Text className="font-semibold">{description}</Text>
            </Text>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView className="w-6 h-6 bg-blue-400 opacity-40 rounded-sm"></ThemedView>
    </ThemedView>
  );
};

export default Task;
