import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Search from "../Components/Text/Search";

const ListScreen = ({ route }) => {
  const { options, onSelect, title } = route.params;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: title || "Select an Option" });
  }, [title, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Search
        placeholder="Search..."
        searchText={searchQuery}
        onSearch={setSearchQuery}
      />
      <FlatList
        data={filteredOptions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              onSelect(item);
              navigation.goBack();
            }}
          >
            <Text style={styles.option}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F7",
    alignItems: "center",
  },
  searchBar: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontWeight: "500",
    margin: 20,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    fontSize: 16,
  },
  list: {
    width: "100%",
    height: "100%",
    padding: 10,
    paddingTop: 0,
    marginTop: 10,
  },
  listItem: {
    paddingVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCC",
    marginVertical: 5,
  },
});

export default ListScreen;
