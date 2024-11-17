import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const TopPlaceholder = ({
  options,
  placeholder,
  type,
  value,
  onChange,
  onError,
  onValid,
  long = false,
  longPlaceholder,
  autoCapitalize = false,
  readOnly = false,
  length = 0,
  required = true,
}) => {
  const navigation = useNavigation();
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = () => {
    setIsTouched(true);
    let error = "";

    if (required && (!value || value.trim() === "")) {
      error = "This field is required.";
    } else if (value.length < length) {
      error = `This field requires at least ${length} characters.`;
    } else {
      switch (type) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            error = "Please enter a valid email address.";
          }
          break;
        case "phone":
          if (!/^\+\d{1,3}\s?\d{4,14}$/.test(value.trim())) {
            error = "Please enter a valid phone number with country code.";
          }
          break;
        case "url":
          if (
            !/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.[a-z]{2,}(\.[a-z]{2,})?/.test(
              value.trim()
            )
          ) {
            error = "Please enter a valid URL.";
          }
          break;
        default:
          error = "";
      }
    }

    setErrorMessage(error);

    if (error) {
      onError && onError(placeholder, error);
    } else {
      onValid && onValid(placeholder);
    }
  };

  const handleSelect = () => {
    navigation.navigate("List", {
      options,
      onSelect: (selectedOption) => {
        onChange(selectedOption);
      },
      title: placeholder,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}
      >
        {readOnly && <Icon name="lock" color="#000" size={15} style={{ marginRight: 2 }} />}
        <Text style={styles.placeholder}>
          {placeholder}{" "}
          {required ? <Text style={{ color: "red" }}>*</Text> : ""}
        </Text>
      </View>
      {!options ? (
        <>
          <TextInput
            style={[
              long ? styles.textArea : styles.input,
              errorMessage ? styles.errorInput : null,
              readOnly ? styles.readOnlyInput : null,
            ]}
            readOnly={readOnly}
            keyboardType={
              type === "email"
                ? "email-address"
                : type === "phone"
                ? "phone-pad"
                : "default"
            }
            value={value || ""}
            onChangeText={(text) => {
              onChange(text);
              if (isTouched) handleBlur();
            }}
            onBlur={handleBlur}
            autoCapitalize={autoCapitalize ? "words" : "none"}
            multiline={long}
            placeholder={longPlaceholder}
            editable={!readOnly}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </>
      ) : (
        <TouchableOpacity
          style={[styles.select, errorMessage ? styles.errorInput : null]}
          activeOpacity={0.7}
          onPress={handleSelect}
        >
          <Text style={styles.selectTxt}>{value || "Select an option"}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 1,
                height: 30,
                backgroundColor: "#ccc",
                marginRight: 5,
              }}
            />
            <Icon
              name="chevron-forward"
              type="ionicon"
              color="#777"
              size={16}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 15,
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
  },
  readOnlyInput: {
    backgroundColor: "#eee",
    borderWidth: 0,
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  selectTxt: {
    fontSize: 16,
  },
  placeholder: {
    fontSize: 15,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default TopPlaceholder;
