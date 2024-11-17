import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FeaturedBlog from "../../Components/Blog/FeaturedBlog";
import BlogCard from "../../Components/Blog/BlogCard";
import { get } from "../../fetch";
import Context from "../../Context";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../../Components/Blog/ProfileCard";

const BlogScreen = () => {
  const [whatsappLink, setWhatsappLink] = useState("");
  const { user, setLoading, loading, authCheck } = useContext(Context);
  const navigation = useNavigation();
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBlogs = () => {
    get("blog/published")
      .then((response) => {
        const updatedResponse = Object.keys(response).map((id) => ({
          id,
          ...response[id],
        }));
        setBlogs(updatedResponse);
      })
      .then(() => {
        get("settings/community")
          .then((response) => {
            setWhatsappLink(response.whatsappLink);
            setLoading(false);
          })
          .catch(() =>
            Alert.alert(
              "Sorry",
              "There seems to be a problem. Please come back later."
            )
          );
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
    fetchBlogs();
  }, []);

  const refreshBlogs = () => {
    setRefreshing(true);
    fetchBlogs();
    authCheck();
  };

  const whatsapp = () => {
    Linking.openURL(whatsappLink);
  };

  if (!blogs.length || !whatsappLink.length) return <View style={styles.container} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%", flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshBlogs} />
        }
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../../assets/cube-whitebg.png")}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={whatsapp}>
            <FontAwesome name="whatsapp" size={30} color="#457789" />
          </TouchableOpacity>
        </View>
        {user.name && <ProfileCard />}
        {blogs.length > 0 && <FeaturedBlog blog={blogs[0]} />}
        <View style={{ marginTop: blogs.length > 0 ? 20 : 0, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%" }}>
          <Text
            style={styles.heading}
          >
            Latest Blogs
          </Text>
          {blogs?.length && <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("AllBlogs", { blogsParam: blogs })}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>}
        </View>
        {blogs.length > 1 ? (
          blogs.slice(1, 4).map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <Text style={styles.msg}>No blogs yet...</Text>
        )}
        {Platform.OS === "android" && <View style={{ height: 50 }} />}
      </ScrollView>
      {(user.type?.toLowerCase() === "admin" ||
        user.role?.toLowerCase() === "editor") && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewBlog")}
            style={styles.postBtn}
            activeOpacity={0.7}
          >
            <Icon name="add" type="material" color="white" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyBlogs")}
            style={[
              styles.postBtn,
              {
                width: 40,
                height: 40,
                backgroundColor: "#eee",
                bottom: 75,
                right: 20,
              },
            ]}
            activeOpacity={0.7}
          >
            <Icon name="article" type="material" color="#3E6471" size={25} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
  },
  viewAll: {
    color: "#3E6471",
    fontSize: 14,
    fontWeight: "600",
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
    width: "90%",
    fontSize: 16,
  },
});

export default BlogScreen;
