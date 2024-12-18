import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import AuthText from "../../Components/Text/AuthText";
import { useNavigation } from "@react-navigation/native";
import Context from "../../Context";
import { post } from "../../fetch";

const DeleteAccountScreen = () => {
  const { user, logout, setLoading } = useContext(Context);
  const [password, setPassword] = useState({
    text: "",
    error: "",
  });

  const setPasswordText = (password) => {
    setPassword({ text: password, error: "" });
  };

  const submit = async () => {
    Keyboard.dismiss();
    if (password.text.length === 0)
      setPassword({ text: "", error: "Enter your password." });
    else {
      setLoading(true);
      post(`user/deleteAccount/${user.uid}`, { password: password.text })
        .then(() => {
          logout();
          Alert.alert(
            "Account Deleted",
            "Your account has been deleted successfully."
          );
        })
        .catch((error) => {
          setPassword({ text: "", error: "Incorrect password." });
        })
        .finally(() => setLoading(false));
      }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../../assets/cube-whitebg.png")}
        style={styles.cube}
      />
      <AuthText
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password.text}
        onChangeText={setPasswordText}
        error={password.error}
        reset
      />
      {password.error && <Text style={styles.error}>{password.error}</Text>}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={submit}
        activeOpacity={0.7}
      >
        <Text style={styles.loginBtnText}>Delete Account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F6F7F7",
  },
  cube: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "black",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
  },
  loginBtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginTop: -5,
    width: "100%",
  },
});

export default DeleteAccountScreen;
