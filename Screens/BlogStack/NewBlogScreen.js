import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import { Icon } from "react-native-elements";
import { get, post, put } from "../../fetch";
import { useNavigation } from "@react-navigation/native";
import TextFieldWithDropdown from "./TextFieldWithDropdown";
import * as AndroidImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export default function NewBlogScreen({ route }) {
  const { user, setLoading } = useContext(Context);
  const { id, b } = route.params || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [topics, setTopics] = useState([]);
  const [blog, setBlog] = useState({
    title: b?.title || "",
    content: b?.content || "",
    topics: b?.topics || [],
    ...(b && { preview: b?.preview || null }),
    ...(user.type === "admin" && { isPublished: b?.status === "published" }),
  });
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    get("settings/topics")
      .then((response) => {
        const t = Object.values(response);
        setTopics(t);
      })
      .catch(() => {
        Alert.alert(
          "Sorry",
          "There seems to be a problem. Please come back later."
        );
        navigation.pop();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const postBlog = async () => {
    if (
      blog.title?.length === 0 ||
      blog.topics?.length === 0 ||
      blog.content.length < 300 ||
      (!id && !selectedImage)
    ) {
      Alert.alert(
        "All fields are required",
        "Please make sure you've filled all fields correctly."
      );
    } else if (b) {
      setLoading(true);

      const body = {
        title: blog.title,
        topics: blog.topics,
        content: blog.content,
      };

      if (user.type === "admin") body.isPublished = blog.isPublished;

      let image;
      if (selectedImage) image = await uploadImage();
      if (image) body.image = image;

      put(`blog/${id}`, body)
        .then(() => {
          Alert.alert("Success!", "Your blog has been updated!");
          navigation.pop();
        })
        .catch((error) =>
          Alert.alert(
            "Sorry!",
            error?.response?.data?.error ||
              "There seems to be a problem. Please come back later."
          )
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      const image = await uploadImage();
      const body = { ...blog, image };

      post("blog", body)
        .then(() => {
          Alert.alert("Success!", "Your blog has been posted!");
          navigation.pop();
        })
        .catch((error) => {
          console.log(error.response.data);
          Alert.alert(
            "Sorry!",
            "There seems to be a problem. Please come back later."
          );
        })
        .finally(() => setLoading(false));
    }
  };

  const addTopic = (label) =>
    !blog.topics.includes(label) &&
    setBlog({ ...blog, topics: [...blog.topics, label] });

  const uploadFile = async (file) => {
    console.log("file:", file);

    try {
      const response = await post("/file/uploadLink", {
        fileName: file.name,
        storagePath: "blog",
        contentType: file.type,
      });

      const uploadUrl = response.data;

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: await fetch(file.uri).then((r) => r.blob()),
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const optimizedImage = await manipulateAsync(selectedImage.uri, [], {
        format: SaveFormat.JPEG,
        compress: 0.25,
      });

      const imageId = `image-${Date.now()}`;
      const optimizedImageWithMeta = {
        uri: optimizedImage.uri,
        type: "image/jpeg",
        name: imageId,
      };

      const dummyImage = await manipulateAsync(
        selectedImage.uri,
        [{ resize: { width: 16, height: 9 } }],
        { format: SaveFormat.JPEG, compress: 0.25 }
      );

      const dummyId = `dummy-${Date.now()}`;
      const dummyImageWithMeta = {
        uri: dummyImage.uri,
        type: "image/jpeg",
        name: dummyId,
      };

      await uploadFile(optimizedImageWithMeta);
      await uploadFile(dummyImageWithMeta);

      return { imageId, dummyId };
    } catch (error) {
      console.error("Error manipulating image:", error);
    }
  };

  const pickImageIOS = async () => {
    const ImagePicker = require("react-native-image-crop-picker");

    try {
      const result = await ImagePicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      });
      setSelectedImage({ ...result, uri: result.path });
    } catch (error) {
      console.log(error);
    }
  };

  const pickImageAndroid = async () => {
    const permissionResult =
      await AndroidImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }
    const result = await AndroidImagePicker.launchImageLibraryAsync({
      mediaTypes: AndroidImagePicker.MediaTypeOptions.Images,
      allowsEditing: Platform.OS === "ios" ? false : true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ backgroundColor: "#F6F7F7" }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={pickImageAndroid}
          onPress={Platform.OS === "ios" ? pickImageIOS : pickImageAndroid}
          style={styles.imagePicker}
        >
          {selectedImage?.uri || blog.preview?.imageUrl ? (
            <Image
              source={{
                uri: selectedImage?.uri || blog.preview?.imageUrl,
              }}
              style={styles.image}
            />
          ) : (
            <Text style={{ color: "#666" }}>Upload Image from Camera Roll</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={blog.title || ""}
          onChangeText={(value) => setBlog({ ...blog, title: value })}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.content}
          placeholder="This is a new blog! (At least 300 characters)"
          multiline
          value={blog.content || ""}
          onChangeText={(content) => setBlog({ ...blog, content })}
          scrollEnabled={false}
        />
        {blog?.content && blog.content?.length !== 0 && (
          <Text
            style={[
              styles.characterCount,
              { color: blog.content.trim().length < 300 ? "red" : "green" },
            ]}
          >
            {blog.content.trim().length}/300
          </Text>
        )}
        <View style={styles.topicsContainer}>
          {blog.topics &&
            blog.topics.map((topic) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={topic}
                style={styles.topic}
                onPress={() =>
                  setBlog((prevBlog) => ({
                    ...prevBlog,
                    topics: prevBlog.topics.filter((t) => t !== topic),
                  }))
                }
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>{topic}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <TextFieldWithDropdown
          placeholder="Add topics"
          options={topics}
          onSelect={(label) => addTopic(label)}
        />
        {user.type === "admin" && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBlog({ ...blog, isPublished: !blog.isPublished })}
            style={styles.checkContainer}
          >
            {blog.isPublished ? (
              <Icon name="eye-off" type="ionicon" size={22} color="red" />
            ) : (
              <Icon name="rocket" type="ionicon" size={22} color="#437689" />
            )}
            <Text style={styles.label}>
              {" "}
              {blog.isPublished ? "Hide" : "Publish"} this blog
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={postBlog}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {id ? "Update" : "Post"} Blog
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    fontSize: 16,
    marginTop: 15,
    fontWeight: "600",
  },
  topicsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "90%",
  },
  topic: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    backgroundColor: "#e6e6e6",
  },
  content: {
    flexShrink: 1,
    minHeight: 100,
    width: "90%",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    marginTop: 15,
    textAlignVertical: "top",
  },
  characterCount: {
    fontWeight: "500",
    width: "90%",
    marginBottom: 10,
    textAlign: "right",
  },
  imagePicker: {
    width: "90%",
    aspectRatio: 16 / 9,
    // borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#e6e6e6",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
