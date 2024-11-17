import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AuthText from "../../Components/Text/AuthText";
import Context from "../../Context";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { auth } = useContext(Context);
  const navigation = useNavigation();

  const [data, setData] = useState({
    email: {
      text: "",
      error: false,
    },
    password: {
      text: "",
      error: false,
    },
  });

  const setEmail = (email) => {
    setData((prevState) => ({
      ...prevState,
      email: {
        text: email,
        error: false,
      },
    }));
  };

  const setPassword = (password) => {
    setData({
      ...data,
      password: {
        text: password,
        error: false,
      },
    });
  };

  const login = async () => {
    if (data.email.text !== "" && data.password.text !== "") {
      const body = { email: data.email.text, password: data.password.text };
      await auth(body);
    } else {
      if (data.email.text === "") {
        setData({
          ...data,
          email: {
            text: "",
            error: true,
          },
        });
      }
      if (data.password.text === "") {
        setData({
          ...data,
          password: {
            text: "",
            error: true,
          },
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <TouchableWithoutFeedback
        onPress={() => Platform.OS === "ios" && Keyboard.dismiss()}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/cube-whitebg.png")}
              style={styles.cube}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.subtitle}>Enter your email and password</Text>
            </View>
            <AuthText
              placeholder="Email"
              value={data.email.text}
              onChangeText={setEmail}
              error={data.email.error}
            />
            <AuthText
              placeholder="Password"
              value={data.password.text}
              onChangeText={setPassword}
              secureTextEntry
              error={data.password.error}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.loginBtn}
              onPress={login}
            >
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forgotPassword}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={[styles.applyText, styles.applyBtn]}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.applyContainer}>
            <Text style={styles.applyText}>Not a member? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Apply")}
            >
              <Text style={[styles.applyText, styles.applyBtn]}>Apply now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7F7",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  cube: {
    marginTop: 50,
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 3,
  },
  form: {
    width: "85%",
  },
  loginBtn: {
    backgroundColor: "black",
    borderRadius: 10,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 1,
  },
  loginBtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  applyContainer: {
    flexDirection: "row",
  },
  applyText: {
    fontSize: 15,
    fontWeight: "500",
    color: "grey",
  },
  applyBtn: {
    color: "black",
    fontWeight: "600",
    marginBottom: 20,
  },
});

export default LoginScreen;
