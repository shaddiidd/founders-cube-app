import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import BlogCard from "../../Components/Blog/BlogCard";
import { get } from "../../fetch";
import Context from "../../Context";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const MyBlogsScreen = () => {
  const { user, setLoading, loading } = useContext(Context);
  const navigation = useNavigation();
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBlogs = () => {
    setRefreshing(true);
    get("blog/writer")
      .then((response) => {
        const updatedResponse = Object.keys(response).map((id) => ({
          id,
          ...response[id],
        }));
        setBlogs(updatedResponse);
      })
      .catch(() =>
        Alert.alert(
          "Sorry",
          "There seems to be a problem. Please come back later."
        )
      )
      .finally(() => {
        setRefreshing(true);
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchBlogs();
  }, []);

  const refreshBlogs = () => {
    fetchBlogs();
  };

  if (loading) return <View style={styles.container} />
  if (!blogs.length)
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.msg}>You have no blogs yet.</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%", minHeight: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshBlogs} />
        }
      >
        <View style={{ height: 5 }} />
        {blogs.map((blog) => <BlogCard showStatus key={blog.id} blog={blog} />)}
      </ScrollView>
      {(user.type?.toLowerCase() === "admin" ||
        user.role?.toLowerCase() === "editor") && (
        <TouchableOpacity
          onPress={() => navigation.navigate("NewBlog")}
          style={styles.postBtn}
          activeOpacity={0.7}
        >
          <Icon name="create" type="material" color="white" size={25} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F7",
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: "#F6F7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  postBtn: {
    position: "absolute",
    backgroundColor: "#3E6471",
    borderRadius: 25,
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  msg: {
    fontSize: 16,
  },
});

export default MyBlogsScreen;
