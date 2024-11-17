import { useNavigation } from "@react-navigation/native";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Search = ({
  searchText,
  onSearch,
  placeholder,
  onFilter,
  options,
  selectedOption,
}) => {
  const navigation = useNavigation();

  const openFilter = () => {
    navigation.navigate("BlogTopics", {
      options: ["All", ...options],
      onSelect: (option) => {
        onFilter(option);
      },
      title: "Industries",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#000" style={styles.icon} />
        <TextInput
          value={searchText}
          onChangeText={onSearch}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#555"
          autoCorrect={false}
        />
      </View>
      {onFilter && (
        <TouchableOpacity style={styles.button} onPress={openFilter}>
          {selectedOption ? (
            <Text style={styles.buttonText}>{selectedOption}</Text>
          ) : (
            <Icon name="funnel-outline" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    position: "relative",
    flex: 1,
  },
  input: {
    height: "100%",
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 35,
    fontWeight: "500",
  },
  icon: {
    position: "absolute",
    top: 12,
    left: 10,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    maxWidth: "35%",
    height: "100%",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Search;
