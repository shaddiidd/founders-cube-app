import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { Icon } from 'react-native-elements';

const AuthText = ({ placeholder, value, onChangeText, secureTextEntry, error }) => {
  return (
    <View style={[styles.container, error && styles.error]}>
      {secureTextEntry ? (
        <Icon name="lock-closed" type="ionicon" size={22} />
      ) : (
        <Icon name="mail" type="ionicon" size={22} />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        returnKeyType="next"
        // keyboardType={(!secureTextEntry && Platform.OS === "ios") ? "email-address" : null}
        keyboardType={!secureTextEntry ? "email-address" : "default"}
        textContentType={secureTextEntry ? "password" : "email"}
        autoCapitalize="none"
        importantForAutofill="yes"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  icon: {
    marginLeft: 20,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    height: '100%',
    paddingHorizontal: 10,
  },
  error: {
    borderColor: '#BC0000',
  },
});

export default AuthText;
