import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Task from "@/components/Task";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { UserContext } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Users } from "@/components/models/Users";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@react-navigation/native";

export default function TodoApp() {
  const { userInfo, completeTask, loadTasks } = useContext(UserContext);
  const [taskItems, setTaskItems] = useState<Users[]>([]);

  const theme = useTheme();

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    setTaskItems(userInfo);
  }, [userInfo]);

  return (
    <ThemedView
      className={`flex-1 ${theme.dark ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView className="pt-16 px-5">
          <ThemedText
            className={`text-2xl font-bold ${
              theme.dark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Today's tasks
          </ThemedText>
          <ThemedView className="mt-7">
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task
                  user={item.user}
                  country={item.country}
                  description={item.description}
                />
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>

      <View className="mb-5 border-2 mx-2 rounded-xl">
        <CustomButton
          title="Add task"
          onPress={() => router.push("./(modal)/set-task")}
        />
      </View>
    </ThemedView>
  );
}
