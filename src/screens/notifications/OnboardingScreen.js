import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { get } from "../../utils/fetch";
import Context from "../../states/Context";

export default function OnboardingScreen({ route }) {
  const { id } = route.params;
  const { user, setLoading } = useContext(Context);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    setLoading(true);
    get(`onboarding/${id}`)
      .then((response) => {
        setNotification(response);
      })
      .catch(() =>
        alert("Sorry! There seems to be a problem. Please come back later.")
      )
      .finally(() => setLoading(false));
  }, []);

  const renderContent = (content) => {
    const formattedContent = content.replace(/{{name}}/g, user.name);

    return formattedContent.split("\n").map((line, index) => {
      const hasImage = line.includes("{{image}}");
      const hasLink = line.includes("[[") && line.includes("]]");

      if (hasImage) {
        return notification.videoUrl ? (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => Linking.openURL(notification.videoUrl)}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: notification.preview.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <Image
            key={index}
            source={{ uri: notification.preview.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        );
      } else if (hasLink) {
        const linkText = line.match(/\[\[(.*?)\]\]/)[1];
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => Linking.openURL(linkText)}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>{linkText}</Text>
          </TouchableOpacity>
        );
      } else {
        const parts = line.split(/(\*.*?\*)/g).map((part, idx) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <Text key={idx} style={styles.boldText}>
                {part.slice(1, -1)}
              </Text>
            );
          }
          return part;
        });

        return (
          <Text key={index} style={styles.content}>
            {parts}
          </Text>
        );
      }
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#F6F7F7" }}>
      <View style={styles.container}>
        <View style={{ width: "90%" }}>
          <Text style={styles.title}>{notification?.title}</Text>
          {notification?.content && renderContent(notification?.content)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#F6F7F7",
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(36, 118, 149)",
    marginTop: 5,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: "rgb(36, 118, 149)",
  },
  boldText: {
    fontWeight: "bold",
  },
});
