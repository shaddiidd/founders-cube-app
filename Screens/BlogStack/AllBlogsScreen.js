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
import Search from "../../Components/Text/Search";

const AllBlogsScreen = ({ route }) => {
  const { user, setLoading, loading } = useContext(Context);
  const { blogsParam } = route.params;
  const navigation = useNavigation();
  const [blogs, setBlogs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchBlogs = () => {
    setRefreshing(true);
    get("blog/published")
      .then((response) => {
        const updatedResponse = Object.keys(response).map((id) => ({
          id,
          ...response[id],
        }));
        setBlogs(updatedResponse);
        setDisplayedBlogs(updatedResponse);
        setSearchQuery("");
        setSelectedOption(null);
      })
      .catch(() =>
        Alert.alert(
          "Sorry",
          "There seems to be a problem. Please come back later."
        )
      )
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    get("settings/topics")
      .then((response) => {
        const t = Object.values(response);
        setTopics(t);
      })
      .finally(() => setLoading(false));
    setBlogs(blogsParam);
    setDisplayedBlogs(blogsParam);
    setSelectedOption(null);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredBlogs = blogs?.filter(
        (blog) =>
          blog?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          blog?.content?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      setDisplayedBlogs(filteredBlogs);
      setSelectedOption(null);
    } else {
      setDisplayedBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  const onFilter = (topic) => {
    if (topic === "All") {
      setDisplayedBlogs(blogs);
      setSelectedOption(null);
      return;
    }
    const filteredBlogs = blogs?.filter((blog) =>
      blog?.topics?.includes(topic)
    );
    setDisplayedBlogs(filteredBlogs);
    setSearchQuery("");
    setSelectedOption(topic);
  };

  if (loading) return <View style={styles.container} />

  if (!blogs.length)
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.msg}>No blogs yet.</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Search
        placeholder="Search..."
        searchText={searchQuery}
        onSearch={setSearchQuery}
        onFilter={onFilter}
        options={topics}
        selectedOption={selectedOption}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ marginTop: 10, paddingTop: 5, width: "100%", flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchBlogs} />
        }
      >
        {displayedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
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
    alignItems: "center",
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

export default AllBlogsScreen;
