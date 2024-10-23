import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
  useColorScheme,
} from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import AppGradient from "@/components/AppGradient";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import { ThemedText } from "@/components/ThemedText";

const SetTask = () => {
  const { userInfo, setUserInfo, loadTasks } = useContext(UserContext);
  const [task, setTask] = useState({
    user: "",
    country: "",
    description: "",
  });
  const [countries, setCountries] = useState([]);

  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const sortedCountries = data
        .map((country: { name: { common: string } }) => country.name.common)
        .sort((a: string, b: string) => a.localeCompare(b)); // Sort alphabetically

      setCountries(sortedCountries);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch countries");
    }
  };

  const inputChangeHandler = (name: keyof typeof task, value: string) => {
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleCountrySelect = (country: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      country,
    }));
  };

  const storeTask = async () => {
    if (task.description.length > 120) {
      Alert.alert("Error", "Description exceeds 120 characters");
      return;
    }

    if (!task.user || !task.country || !task.description) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    const updatedTasks = [...userInfo, task];
    setUserInfo(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

    console.log("set", userInfo);
    console.log("set2", updatedTasks);
    loadTasks();
    router.back();
  };

  return (
    <View className="flex-1 relative">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          onPress={() => router.back()}
          className="absolute top-8 left-6 z-10"
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <View>
            <ThemedText className="text-center font-bold text-3xl text-white mb-8">
              Add a new task
            </ThemedText>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className=""
          >
            <TextInput
              className="py-4 px-4 mb-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl w-full text-gray-900 dark:text-gray-100"
              placeholder="Assign User"
              value={task.user}
              onChangeText={(text) => inputChangeHandler("user", text)}
            />
            <SelectList
              boxStyles={{
                marginBottom: 20,
                backgroundColor: isDarkMode ? "#1f2937" : "white",
                borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
              }}
              setSelected={handleCountrySelect}
              dropdownStyles={{
                backgroundColor: isDarkMode ? "#1f2937" : "white",
                borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
              }}
              data={countries.map((country) => ({
                key: country,
                value: country,
              }))}
              placeholder="Select Country"
              inputStyles={{ color: isDarkMode ? "#464a2f" : "#6b7280" }}
            />
            <TextInput
              className="py-4 px-4 mb-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl w-full text-gray-900 dark:text-gray-100"
              placeholder="Task Description"
              value={task.description}
              onChangeText={(text) => inputChangeHandler("description", text)}
            />
          </KeyboardAvoidingView>
        </View>

        <View className="mb-5">
          <CustomButton
            title="Set task"
            onPress={storeTask}
            IconComponent={
              <Entypo name="add-to-list" size={30} color="black" />
            }
          />
        </View>
      </AppGradient>
    </View>
  );
};

export default SetTask;
