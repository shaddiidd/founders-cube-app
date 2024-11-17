import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./Context";
import { get, post, setAuthorizationToken, remove } from "./fetch";
import * as Notifications from "expo-notifications";

const Provider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await removeNotificationToken();
      setToken("");
      setUser({});
      setIsAuthenticated(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    get(`user/${user.uid}`)
      .then((response) => {
        setUser({ ...user, ...response });
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  };

  const authCheck = async () => {
    const t = await AsyncStorage.getItem("token");
    if (t) {
      setAuthorizationToken(t);
      try {
        const response = await get("auth/session");
        const userData = response.userData;

        setUser({ ...user, ...userData });
        setIsAuthenticated(true);
        setToken(response.token);
        setAuthorizationToken(response.token);
        await AsyncStorage.setItem("token", response.token);

        await registerNotificationToken();
      } catch (error) {
        console.error("Error fetching user session:", error);
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    authCheck();
  }, []);

  const auth = async (data) => {
    setLoading(true);
    try {
      const response = await post("auth/login", data);
      console.log(response.data.token);
      setToken(response.data.token);
      await AsyncStorage.setItem("token", response.data.token);
      setAuthorizationToken(response.data.token);
      setUser(response.data.userData);
      setIsAuthenticated(true);

      await registerNotificationToken();
    } catch {
      Alert.alert(
        "Sorry!",
        "Make sure you've entered the correct email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  const registerNotificationToken = async () => {
    try {
      let deviceId = await AsyncStorage.getItem("deviceId");
      
      if (!deviceId) {
        deviceId = `device-${Date.now()}`;
        await AsyncStorage.setItem("deviceId", deviceId);
      }
      const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
      await post(`notification/token/${deviceId}`, { token: expoPushToken });
      
    } catch (error) {
      console.error("Error registering notification token:", error);
    }
  };

  const removeNotificationToken = async () => {
    try {
      const deviceId = await AsyncStorage.getItem("deviceId");          
      await remove(`notification/token/${deviceId}`);
      await Notifications.deleteExpoPushTokenAsync();
    } catch (error) {
      console.error("Error removing notification token:", error);
    }
  };

  return (
    <Context.Provider
      value={{
        token,
        authCheck,
        user,
        auth,
        logout,
        loading,
        setLoading,
        isAuthenticated,
        getUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
