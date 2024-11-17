import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TopPlaceholder from "../../Components/Text/TopPlaceholder";
import { Icon } from "react-native-elements";
import Context from "../../Context";
import { post, put } from "../../fetch";
import { countriesArr } from "../../countries";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";
import LinkCard from "../../Components/Community/LinkCard";
import { industries } from "../../data/industries";

const EditProfileScreen = ({ route }) => {
  const { user, id } = route.params;
  const [profile, setProfile] = useState({});
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const [showBioError, setShowBioError] = useState(false);
  const [countries, setCountries] = useState([]);
  const { setLoading, getUserData } = useContext(Context);
  const [bioLength, setBioLength] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    setCountries(countriesArr.map((country) => country.name.common).sort());
    setProfile({
      name: user.name || "",
      bio: user.bio || "",
      phone: user.phone || "",
      country: user.country || "",
      company: user.company || "",
      industry: user.industry || "",
      links: user.links || {},
    });
  }, [user]);

  useEffect(() => {
    if (profile.bio) {
      setBioLength(profile.bio.length);
      setShowBioError(false);
    }
  }, [profile]);

  const addLink = (link, key = null) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      links: {
        ...prevProfile.links,
        ...(key ? { [key]: link } : { [`link-${Date.now()}`]: link }),
      },
    }));
  };

  const removeLink = (key) => {
    setProfile((prevProfile) => {
      const updatedLinks = { ...prevProfile.links };
      delete updatedLinks[key];
      return { ...prevProfile, links: updatedLinks };
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert("Sorry!", "Permission required to access the gallery.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedProfilePic(pickerResult.assets[0]);
    }
  };

  const uploadFile = async (file) => {
    try {
      const response = await post("/file/uploadLink", {
        fileName: file.name,
        storagePath: "user",
        contentType: file.type,
      });

      const uploadUrl = response.data;

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.mimeType,
        },
        body: await fetch(file.uri).then((r) => r.blob()),
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const uploadImage = async () => {
    if (!selectedProfilePic) {
      return;
    }

    try {
      const optimizedImage = await manipulateAsync(
        selectedProfilePic.uri,
        [{ resize: { width: 480, height: 480 } }],
        { format: SaveFormat.JPEG, compress: 0.25 }
      );

      const imageId = `image-${Date.now()}`;
      const optimizedImageWithMeta = {
        uri: optimizedImage.uri,
        type: "image/jpeg",
        name: imageId,
      };

      const dummyImage = await manipulateAsync(
        selectedProfilePic.uri,
        [{ resize: { width: 15, height: 15 } }],
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
  const submit = async () => {
    if (
      profile.name.length &&
      profile.bio.length >= 300 &&
      profile.phone.length &&
      profile.industry.length &&
      profile.country.length
    ) {
      setLoading(true);

      let image = null;
      if (selectedProfilePic) image = await uploadImage();

      const body = {
        name: profile.name,
        bio: profile.bio,
        phone: profile.phone,
        country: profile.country,
        company: profile.company,
        industry: profile.industry,
        links: profile.links,
      }
      if (image) body.image = image;
      
      put(`user/${id}`, body)
        .then(() => {
          getUserData();
          navigation.pop();
          Alert.alert("Success!", "Your profile has been updated!")
        })
        .catch((error) => {
          Alert.alert("Sorry!", error?.response?.data?.error || "There seems to be a problem. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert("All fields are required!", "Make sure you've filled all fields correctly.");
      profile.bio.length < 300 && setShowBioError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <ScrollView
        style={{ backgroundColor: "#F6F7F7" }}
        contentContainerStyle={styles.container}
      >
        <TouchableOpacity
          style={styles.profilePicture}
          activeOpacity={0.7}
          onPress={pickImage}
        >
          <Image
            source={
              selectedProfilePic
                ? { uri: selectedProfilePic.uri }
                : user.preview?.imageUrl
                ? { uri: user.preview?.imageUrl }
                : require("../../assets/profile_picture.png")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <TopPlaceholder
            placeholder="Name"
            autoCapitalize
            value={profile.name}
            onChange={(value) => setProfile({ ...profile, name: value })}
            longPlaceholder="Ahmad Alaa"
          />
          <TopPlaceholder
            placeholder="Email"
            autoCapitalize
            required={false}
            value={user.email}
            readOnly
          />
          <TopPlaceholder
            placeholder="Phone"
            type="numeric"
            longPlaceholder="+962799999999"
            value={profile.phone}
            onChange={(value) => setProfile({ ...profile, phone: value })}
          />
          <TopPlaceholder
            placeholder="Industry"
            value={profile.industry}
            options={industries.slice(1)}
            onChange={(value) => setProfile({ ...profile, industry: value })}
          />
          <TopPlaceholder
            placeholder="Country"
            value={profile.country}
            onChange={(value) => setProfile({ ...profile, country: value })}
            options={countries}
          />
          <TopPlaceholder
            placeholder="Company"
            value={profile.company}
            onChange={(value) => setProfile({ ...profile, company: value })}
            longPlaceholder="ABC Company"
            autoCapitalize
            required={false}
          />
          <TopPlaceholder
            placeholder="About"
            value={profile.bio}
            onChange={(value) => setProfile({ ...profile, bio: value })}
            long
            length={300}
            longPlaceholder="Write a brief description about who you are and what you do. (At least 300 characters)"
          />
          <Text style={[styles.taCount, { color: profile?.bio?.trim().length < 300 ? "red" : "green" }]}>{profile?.bio?.trim().length}/300</Text>
          
          <Text style={styles.heading}>Links</Text>
          {profile.links &&
            Object.entries(profile.links).map(([key, link]) => (
              <LinkCard
                key={key}
                link={link}
                edit
                onRemove={() => removeLink(key)}
                onEdit={() =>
                  navigation.navigate("Link", {
                    routeLink: link,
                    addLink,
                    linkKey: key,
                  })
                }
              />
            ))}
            <TouchableOpacity
            activeOpacity={0.7}
            style={styles.linksBtn}
            onPress={() =>
              navigation.navigate("Link", { routeLink: {}, addLink })
            }
          >
            <View style={styles.iconContainer}>
              <Icon name="add" type="material" size={25} color="#00516A" />
            </View>
            <Text style={styles.addLinkTitle}>Add Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={submit}
            activeOpacity={0.7}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    position: "relative",
  },
  profilePicture: {
    borderWidth: 2,
    borderRadius: 75,
    borderColor: "#437689",
    height: 150,
    width: 150,
    margin: 10,
    padding: 3,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    resizeMode: "cover",
    overflow: "hidden",
  },
  userInfo: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },
  taCount: {
    marginTop: -10,
    fontSize: 13,
    fontWeight: "600",
    width: "90%",
    textAlign: "right",
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    width: "90%",
  },
  linksBtn: {
    width: "90%",
    backgroundColor: "white",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    marginVertical: 5,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: "rgba(52, 122, 143, 0.38)",
    padding: 7,
    borderRadius: 100,
  },
  addLinkTitle: {
    fontSize: 18,
  },
  save: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  saveText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default EditProfileScreen;
