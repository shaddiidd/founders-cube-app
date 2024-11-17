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
} from "react-native";
import AuthText from "../../Components/Text/AuthText";
import { useNavigation } from '@react-navigation/native';
import Context from "../../Context";
import { post } from "../../fetch";

const ResetPasswordScreen = ({ route }) => {
  const { token, setLoading, isAuthenticated } = useContext(Context);
  const { verToken } = route.params || {};
  const navigation = useNavigation();
  const [valid, setValid] = useState(true);
  const [data, setData] = useState({
    password: {
      text: "",
      error: false,
    },
    password_confirmation: {
      text: "",
      error: false,
    },
  });

  useEffect(() => {
    if (verToken) {
      setLoading(true);
      post("auth/verifyResetCode", { token: verToken })
        .catch(() => setValid(false))
        .finally(() => setLoading(false));
    } else if (!isAuthenticated) {
      setValid(false);
    }
  }, []);

  const setPassword = (password) => {
    setData({
      ...data,
      password: { text: password, error: false },
    });
  };

  const setPasswordRepeat = (password) => {
    setData({
      ...data,
      password_confirmation: { text: password, error: false },
    });
  };

  const submit = async () => {
    if (data.password.text === "") {
      setData({ ...data, password: { text: "", error: true } });
    } else if (data.password_confirmation.text !== data.password.text) {
      setData({ ...data, password_confirmation: { text: "", error: true } });
    } else {
      setLoading(true);
      try {
        await post("auth/resetPassword", {
          password: data.password.text,
          token: verToken || token
        });
        Alert.alert("Success", "Password changed successfully.");
      } catch (error) {
        Alert.alert("Sorry!", error?.response?.data?.error || "An error has occurred. Please try again later.");
      } finally {
        navigation.pop();
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Image source={require('../../assets/cube-whitebg.png')} style={styles.cube} />
      <AuthText
        style={styles.input}
        placeholder="New password"
        secureTextEntry
        value={data.password.text}
        onChangeText={setPassword}
        error={data.password.error}
      />
      <AuthText
        style={styles.input}
        placeholder="Confirm new password"
        secureTextEntry
        value={data.password_confirmation.text}
        onChangeText={setPasswordRepeat}
        error={data.password_confirmation.error}
      />
      {data.password_confirmation.error && <Text style={styles.error}>Passwords do not match.</Text>}
      <TouchableOpacity style={styles.loginBtn} onPress={submit} activeOpacity={0.7}>
        <Text style={styles.loginBtnText}>Submit</Text>
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
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold"
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
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default ResetPasswordScreen;
