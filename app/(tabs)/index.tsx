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

export default function TodoApp() {
  const { userInfo, setUserInfo, loadTasks } = useContext(UserContext);
  const [taskItems, setTaskItems] = useState<Users[]>([]);

  const completeTask = (index: number) => {
    const updatedTasks = userInfo.filter((_, taskIndex) => taskIndex !== index);
    setUserInfo(updatedTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    setTaskItems(userInfo); // Update taskItems when userInfo changes
  }, [userInfo]);

  return (
    <ThemedView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView className="pt-16 px-5">
          <ThemedText className="text-2xl font-bold text-gray-800 dark:text-gray-100">
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
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-4 w-full flex-row justify-around items-center"
      >
        <TextInput
          className="py-4 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full w-64 text-gray-900 dark:text-gray-100"
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <ThemedView className="w-14 h-14 bg-white dark:bg-gray-800 rounded-[30px] justify-center items-center border border-gray-300 dark:border-gray-600">
            <Text className="text-2xl text-gray-900 dark:text-gray-100">+</Text>
          </ThemedView>
        </TouchableOpacity>
      </KeyboardAvoidingView> */}
    </ThemedView>
  );
}
