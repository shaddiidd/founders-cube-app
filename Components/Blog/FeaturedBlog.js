import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const FeaturedBlog = ({ blog = {} }) => {
  const navigation = useNavigation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("BlogScreen", { b: blog, id: blog.id })
      }
    >
      <Image
        source={{
          uri: isImageLoaded
            ? blog.preview?.imageUrl
            : blog.preview?.dummyUrl || "",
        }}
        style={styles.image}
        onLoad={() => setIsImageLoaded(true)}
      />
      <View style={styles.categoriesContainer}>
        <View style={styles.category}>
          <Icon name="heart" type="ionicon" size={16} color="#E02A2A" />
          <Text style={{ fontWeight: "500" }}>{blog.likes}</Text>
        </View>
        {blog.topics?.length > 0 &&
          blog.topics.slice(0, 1).map((topic) => (
            <View key={topic} style={styles.category}>
              <Text style={{ fontWeight: "500" }}>
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </Text>
            </View>
          ))}
        {blog?.topics?.length > 1 && (
          <View style={styles.category}>
            <Text style={{ fontWeight: "500" }}>
              +{blog?.topics?.length - 1} more
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.date}>{blog.created}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {blog.content}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 15,
    width: "90%",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: "#ccc",
  },
  categoriesContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginVertical: 10,
  },
  category: {
    padding: 5,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: "row",
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  date: {
    color: "#716D6D",
    marginTop: 2,
    marginHorizontal: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default FeaturedBlog;
