import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { get, post, remove } from "../../fetch";
import Context from "../../Context";
import { useNavigation } from "@react-navigation/native";

export default function BlogScreen({ route }) {
  const { id, b } = route.params;
  const { user, setLoading, loading } = useContext(Context);
  const [blog, setBlog] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fetchBlog = () => {
    setRefreshing(true);
    get(`blog/${id}`)
      .then((response) => {
        setBlog(response);
        setLoading(false);
      })
      .catch((error) =>
        Alert.alert(
          "Sorry!",
          error?.response?.data?.error ||
            "There seems to be a problem. Please come back later"
        )
      )
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (b) {
      setBlog(b);
    } else {
      setLoading(true);
      fetchBlog();
    }
  }, [id, b]);

  const like = () => {
    setBlog({ ...blog, isLiked: true, likes: blog.likes + 1 });
    post(`blog/${id}/like`)
      .then(() => {})
      .catch((error) =>
        Alert.alert(
          "Sorry!",
          error?.response?.data?.error ||
            "There seems to be a problem. Please come back later."
        )
      );
  };

  const unlike = () => {
    setBlog({ ...blog, isLiked: false, likes: blog.likes + -1 });
    remove(`blog/${id}/like`)
      .then(() => {})
      .catch((error) =>
        Alert.alert(
          "Sorry!",
          error?.response?.data?.error ||
            "There seems to be a problem. Please come back later."
        )
      );
  };

  if (loading) return <View style={styles.container} />;

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F6F7F7" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchBlog} />
        }
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: isImageLoaded
                ? blog?.preview?.imageUrl
                : blog?.preview?.dummyUrl,
            }}
            style={styles.image}
            onLoad={() => setIsImageLoaded(true)}
          />
          <View
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={{ flexDirection: "row" }}
          >
            {blog.title ? (
              <View style={styles.category}>
                <Icon name={blog.isLiked ? "heart" : "heart-outline"} type="ionicon" size={16} color="#E02A2A" />
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {" "}
                  {blog.likes}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {blog.topics &&
              blog.topics.map((category) => (
                <View key={category} style={styles.category}>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </View>
              ))}
          </View>
          <View style={{ width: "90%" }}>
            <Text style={styles.title}>{blog.title}</Text>
            <Text style={styles.date}>{blog.created}</Text>
            <Text style={styles.content} selectable selectionColor={"#E02A2A"}>
              {blog.content}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.likeBtn}
            onPress={blog.isLiked ? unlike : like}
          >
            <Icon
              name={blog.isLiked ? "heart" : "heart-outline"}
              type="ionicon"
              size={30}
              color="#E02A2A"
            />
            <Text style={styles.likeTxt}> {blog.likes}</Text>
          </TouchableOpacity>
          <Text>Like this blog if you like it</Text>
        </View>
      </ScrollView>

      {(blog?.writer === user?.uid || user?.type === "admin") && (
        <TouchableOpacity
          onPress={() => navigation.navigate("NewBlog", { id, b: blog })}
          style={styles.postBtn}
          activeOpacity={0.7}
        >
          <Icon name="create" type="material" color="white" size={25} />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#F6F7F7",
  },
  image: {
    borderRadius: 20,
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#e6e6e6",
  },
  categoriesContainer: {
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 8
  },
  category: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  date: {
    color: "#716D6D",
    marginTop: 2,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
  likeBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  likeTxt: {
    fontSize: 18,
    fontWeight: "500",
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
});
