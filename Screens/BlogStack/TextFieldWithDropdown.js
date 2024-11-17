import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

const TextFieldWithDropdown = ({ options, onChange, placeholder, value, onSelect }) => {
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTextChange = (input) => {
    setText(input);

    if (input.length > 0) {
      const filtered = options.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredData(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (label) => {
    onSelect(label);
    setShowDropdown(false);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={handleTextChange}
      />

      {showDropdown && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  dropdown: {
    marginTop: 0,
    borderColor: "#ccc",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    width: "100%",
  },
});

export default TextFieldWithDropdown;
