import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const MembersCard = ({ member }) => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const nameParts = member?.name?.split(' ');
    const newName = nameParts?.length > 1 
      ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}` 
      : member?.name;
    setDisplayName(newName);
  }, [member]);
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => {navigation.navigate("Member", { id: member.id, memberData: member, displayName })}}>
        <View style={styles.content}>
          <View style={styles.imgContainer}>
            <ImageBackground
              source={member.preview.dummyUrl ? { uri: member.preview.dummyUrl } : require("../../assets/profile_picture.png")}
              style={styles.img}
              resizeMode="cover"
            >
              <Image source={member?.preview?.imageUrl ?{ uri: member?.preview?.imageUrl } : ""} style={styles.img} />
            </ImageBackground>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.name}>
              {displayName + " "}
              {member.isVerified ? (
                <Icon name="verified" size={16} />
              ) : (
                ""
              )}
            </Text>
            {member.industry ? <Text style={styles.industry}>{member.industry}</Text> : <></>}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  card: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    height: 50,
    width: 50,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#437689",
    padding: 1,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  txtContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    margin: 0,
    fontSize: 18,
    fontWeight: "500",
    maxWidth: "100%"
  },
  industry: {
    margin: 0,
    color: "grey",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default MembersCard;
