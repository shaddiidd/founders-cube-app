import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import TopPlaceholder from "../../Components/Text/TopPlaceholder";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function LinkScreen({ route }) {
  const { routeLink, addLink, linkKey } = route.params;
  const navigation = useNavigation();
  const [link, setLink] = useState({ title: "", url: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (routeLink) {
      setLink(routeLink);
      navigation.setOptions({ title: routeLink.title });
    }
  }, [routeLink]);

  function cleanURL(url) {
    return url.replace(/(^\w+:|^)\/\//, "").replace(/^www\./, "");
  }

  // URL validation function
  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}(\\.\\d{1,3}){3})" + // OR IPv4
        "(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*" + // port and path
        "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // query string
        "(\\#[-a-zA-Z0-9_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(url);
  };

  const handleSubmit = () => {
    if (!link.title) {
      Alert.alert("Invalid Input", "Please enter a title for the link.");
      return;
    }

    if (!isValidUrl(link.url)) {
      Alert.alert("Invalid URL", "Please enter a valid URL.");
      return;
    }

    addLink({ ...link, url: cleanURL(link.url) }, linkKey);
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <TopPlaceholder
        value={link.title}
        onChange={(title) => {
          setLink((prev) => ({ ...prev, title }));
        }}
        placeholder="Name"
        longPlaceholder="My website"
      />
      <TopPlaceholder
        value={link.url}
        onChange={(url) => {
          setLink((prev) => ({ ...prev, url }));
        }}
        placeholder="URL"
        longPlaceholder="example.com"
        type="url"
      />
      <TouchableOpacity
        style={styles.submit}
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text style={styles.submitText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F7F7",
    flex: 1,
    paddingTop: 10,
  },
  submit: {
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  submitText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});
