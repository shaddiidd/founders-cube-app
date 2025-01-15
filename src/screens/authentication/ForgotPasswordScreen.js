import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import AuthText from "../../components/inputs/AuthText";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../utils/fetch";
import Context from "../../states/Context";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const { setLoading } = useContext(Context);

  const login = () => {
    setLoading(true);
    post("auth/sendResetEmail", { email })
      .then(() => {
        navigation.pop();
        Alert.alert("Success!", "Check your email for a reset password link.")
      })
      .catch((error) => Alert.alert("Sorry!", error?.response?.data?.error || "There seems to be a problem. Please come back later."))
      .finally(() => setLoading(false))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/cube-whitebg.png')} style={styles.cube} />
          </View>
          <View style={styles.form}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Hello!</Text>
              <Text style={styles.subtitle}>Please enter your email for verification.</Text>
            </View>
            <AuthText
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.loginBtn} onPress={login}>
              <Text style={styles.loginBtnText}>Send Link</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F7F7',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  cube: {
    margin: 10,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 3,
  },
  form: {
    width: '85%',
  },
  loginBtn: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 1
  },
  loginBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ForgotPasswordScreen;
