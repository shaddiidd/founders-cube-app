import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const BlogCard = ({ blog, showStatus }) => {
  const navigation = useNavigation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const displayedTopic = blog.topics
    .reduce((a, b) => (a.length <= b.length ? a : b))
    .replace(/^./, (char) => char.toUpperCase());

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("BlogScreen", { b: blog, id: blog.id })
      }
    >
      <View style={{ width: "50%", paddingHorizontal: 10 }}>
        <Text style={styles.date}>{blog.created}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {blog.title}
        </Text>
        <Text style={styles.content} numberOfLines={2}>
          {blog.content}
        </Text>
        <View style={styles.categoriesContainer}>
          {blog?.topics?.length > 0 && (
            <View style={styles.category}>
              <Text style={{ fontWeight: "500" }}>
                {displayedTopic.length > 12
                  ? `${displayedTopic.slice(0, 12)}...`
                  : displayedTopic}
              </Text>
            </View>
          )}
          {blog?.topics?.length > 1 && (
            <View style={styles.category}>
              <Text style={{ fontWeight: "500" }}>
                +{blog?.topics?.length - 1}
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.categoriesContainer,
            { marginBottom: 10, marginTop: 5 },
          ]}
        >
          <View style={styles.category}>
            <Icon name={blog.isLiked ? "heart" : "heart-outline"} type="ionicon" size={16} color="#E02A2A" />
            <Text style={{ fontWeight: "500" }}>{blog.likes}</Text>
          </View>
        </View>
      </View>
      <Image
        source={{
          uri: isImageLoaded
            ? blog.preview?.imageUrl
            : blog.preview?.dummyUrl || "",
        }}
        style={styles.image}
        onLoad={() => setIsImageLoaded(true)}
        resizeMode="cover"
      />
      {showStatus && (
        <View
          style={[
            styles.status,
            {
              backgroundColor:
                blog.status === "published" ? "#00C853" : "#E02A2A",
            },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
            {blog.status.toUpperCase()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 15,
    width: "90%",
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: "50%",
    height: "100%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#ccc",
  },
  categoriesContainer: {
    flexDirection: "row",
  },
  category: {
    padding: 5,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: "row",
    backgroundColor: "#e6e6e6",
  },
  date: {
    color: "#716D6D",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    width: "100%",
    marginTop: 2,
  },
  content: {
    color: "#716D6D",
    fontSize: 14,
    marginVertical: 10,
  },
  status: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#E02A2A",
    padding: 5,
    borderRadius: 8,
    color: "white",
    fontWeight: "600",
  },
});

export default BlogCard;
