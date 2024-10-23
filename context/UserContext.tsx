import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Users } from "@/components/models/Users";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextType {
  userInfo: Users[];
  setUserInfo: Dispatch<SetStateAction<Users[]>>;
  loadTasks: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  userInfo: [],
  setUserInfo: () => {},
  loadTasks: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<Users[]>([]);

  const loadTasks = async () => {
    console.log("first");
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

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, loadTasks }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
