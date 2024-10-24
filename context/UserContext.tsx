import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Users } from "@/components/models/Users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface UserContextType {
  userInfo: Users[];
  setUserInfo: Dispatch<SetStateAction<Users[]>>;
  loadTasks: () => Promise<void>;
  completeTask: (index: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  userInfo: [],
  setUserInfo: () => {},
  loadTasks: async () => {},
  completeTask: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<Users[]>([]);

  const loadTasks = async () => {
    try {
      const existingTasksJSON = await AsyncStorage.getItem("tasks");
      const existingTasks = existingTasksJSON
        ? JSON.parse(existingTasksJSON)
        : [];
      setUserInfo(existingTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const completeTask = async (index: number) => {
    try {
      const taskName = userInfo[index]?.description;
      Alert.alert(
        "Delete Task",
        `Are you sure you want to delete the task "${taskName}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: async () => {
              try {
                const updatedTasks = userInfo.filter(
                  (_, taskIndex) => taskIndex !== index
                );
                setUserInfo(updatedTasks);
                await AsyncStorage.setItem(
                  "tasks",
                  JSON.stringify(updatedTasks)
                );
                Alert.alert(
                  "Success",
                  `Task "${taskName}" deleted successfully.`
                );
              } catch (error) {
                console.error("Error updating AsyncStorage:", error);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error updating AsyncStorage:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, loadTasks, completeTask }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
