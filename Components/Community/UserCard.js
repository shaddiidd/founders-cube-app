import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import * as Contacts from 'expo-contacts';
import * as FileSystem from 'expo-file-system';

export default function UserCard({ member = {}, displayName }) {
  const phoneCall = () => {
    Linking.openURL(`tel:${member.phone}`);
  };

  const email = () => {
    Linking.openURL(`mailto:${member?.email}`);
  };

  const addToContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access contacts was denied');
        return;
      }
  
      const [firstName, ...lastNameParts] = displayName.split(" ");
      const lastName = lastNameParts.join(" ");
  
      let localImageUri = "";
      if (member?.preview?.imageUrl) {
        const imageUri = member.preview.imageUrl;
  
        try {
          const downloadedImage = await FileSystem.downloadAsync(
            imageUri,
            FileSystem.cacheDirectory + 'contact-image.jpg'
          );
          localImageUri = downloadedImage.uri;
        } catch (error) {
          console.log('Error downloading image:', error);
        }
      }
  
      const contact = {
        [Contacts.Fields.FirstName]: firstName,
        [Contacts.Fields.LastName]: lastName || "",
        [Contacts.Fields.Image]: localImageUri ? { uri: localImageUri } : undefined,
        [Contacts.Fields.Company]: member.company || "",
        [Contacts.Fields.PhoneNumbers]: [{ label: 'Mobile', number: member.phone }],
        [Contacts.Fields.Emails]: [{ label: 'Work', email: member.email }],
        [Contacts.Fields.UrlAddresses]: Object.values(member.links || {}).map(link => ({
          label: link.title || 'Website',
          url: link.url
        }))  
      };
  
      await Contacts.presentFormAsync(null, contact, { isNew: true });
  
    } catch (error) {
      console.error("Error presenting contact form:", error);
      Alert.alert('Error', 'An error occurred while presenting the contact form');
    }
  };
  
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.img}
        source={member.preview?.dummyUrl ? { uri: member.preview?.dummyUrl } : require("../../assets/profile_picture.png")}
      >
        <Image
          source={member?.preview?.imageUrl ?{ uri: member?.preview?.imageUrl } : ""}
          style={styles.img}
        />
        <TouchableOpacity
          onPress={addToContacts}
          activeOpacity={0.7}
          style={[styles.userAction, { position: "absolute", top: 20, right: 20 }]}
        >
          <Icon name="bookmark-outline" size={24} color="white" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.cardMainInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {displayName + "  "}
            {member?.isVerified ? (
              <Icon
                name="verified"
                size={22}
                color="white"
                style={styles.checkmark}
              />
            ) : (
              ""
            )}
          </Text>
          <Text style={styles.industry}>{member?.industry}</Text>
        </View>
        <View style={styles.userActions}>
          {member.phone && <TouchableOpacity
            onPress={phoneCall}
            activeOpacity={0.7}
            style={styles.userAction}
          >
            <Icon name="phone" size={24} color="white" />
          </TouchableOpacity>}
          {member.email && <TouchableOpacity
            onPress={email}
            activeOpacity={0.7}
            style={styles.userAction}
          >
            <Icon name="mail-outline" size={24} color="white" />
          </TouchableOpacity>}
        </View>
      </View>
      <View style={styles.cardSecondaryInfo}>
        <View style={styles.secondaryInfoItem}>
          <Text style={styles.secondaryInfoTitle}>Location</Text>
          <Text style={styles.secondaryInfoSubtitle}>{member.country || "-"}</Text>
        </View>
        <View style={styles.verticalSep} />
        <View style={styles.secondaryInfoItem}>
          <Text style={styles.secondaryInfoTitle}>Company</Text>
          <Text numberOfLines={1} style={styles.secondaryInfoSubtitle}>
            {member?.company || "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignItems: "center",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 30,
    resizeMode: "cover",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  cardMainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 90,
    width: "100%",
    paddingHorizontal: "5%",
  },
  nameContainer: {
    width: "45%",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  industry: {
    fontSize: 18,
    marginTop: 2,
    color: "white",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  userActions: {
    flexDirection: "row",
  },
  userAction: {
    backgroundColor: "rgba(93, 89, 89, 0.7)",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  cardSecondaryInfo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: -2,
    zIndex: -1,
  },
  secondaryInfoItem: {
    alignItems: "center",
    width: "45%",
  },
  secondaryInfoTitle: {
    color: "#A5A5A5",
    fontSize: 14,
    fontWeight: "300",
  },
  secondaryInfoSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 2,
    textAlign: "center",
  },
  verticalSep: {
    height: "95%",
    width: 0.6,
    backgroundColor: "#A5A5A5",
  },
});
