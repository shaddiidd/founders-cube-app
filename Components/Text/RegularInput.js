import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const RegularInput = ({ placeholder, type, value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={type === "number" ? "numeric" : "default"}
        secureTextEntry={type === "password"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    paddingVertical: 10,
    justifyContent: "center",
  },
  input: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegularInput;
