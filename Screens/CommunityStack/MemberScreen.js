import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { get, put, remove } from "../../fetch";
import Context from "../../Context";
import { useNavigation } from "@react-navigation/native";
import UserCard from "../../Components/Community/UserCard";
import LinkCard from "../../Components/Community/LinkCard";

const MemberScreen = ({ route }) => {
  const { id, memberData } = route.params;
  const navigation = useNavigation();
  const [member, setMember] = useState({});
  const { setLoading, loading } = useContext(Context);
  const [showFullBio, setShowFullBio] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const nameParts = member?.name?.split(" ");
    const newName =
      nameParts?.length > 1
        ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
        : member?.name;
    navigation.setOptions({ headerTitle: newName || "Member" });
    setDisplayName(newName);
  }, [member]);

  useEffect(() => {
    if (memberData) {
      setMember(memberData);
    } else {
      setLoading(true);
      fetchMember();
    }
  }, [id, memberData]);

  const fetchMember = () => {
    setRefreshing(true);
    get(`user/${id}`)
      .then((response) => setMember(response))
      .catch(() => {})
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  if (!Object.keys(member).length)
    return <View style={{ backgroundColor: "#F6F7F7", flex: 1 }} />;

  return (
    <ScrollView
      style={{ backgroundColor: "#F6F7F7" }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchMember} />
      }
    >
      <UserCard member={member} displayName={displayName} />
      <Text style={styles.heading}>About Me</Text>
      <Text style={styles.bio}>
        {member?.bio ? (
          <>
            {showFullBio ? (
              <>
                {member.bio.split("\n").map((line, index) => (
                  <Text key={index}>
                    {line}
                    {"\n"}
                  </Text>
                ))}
              </>
            ) : (
              <>
                {member.bio.split(" ").length > 40
                  ? member.bio
                      .split(" ")
                      .filter((_, index) => index < 40)
                      .join(" ") + "..."
                  : member.bio}
              </>
            )}
          </>
        ) : (
          "No bio yet..."
        )}
      </Text>
      {member?.bio && member.bio.length > 330 ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleBio}
          style={styles.seeMore}
        >
          <Text style={styles.seeMoreText}>
            {showFullBio ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <Text style={styles.heading}>Links</Text>
      {member.links && Object.keys(member.links).length > 0 ? (
        Object.entries(member.links).map(([key, link]) => (
          <LinkCard key={key} link={link} />
        ))
      ) : (
        <Text style={styles.bio}>No links yet...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 15,
    backgroundColor: "#F6F7F7",
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    width: "90%",
  },
  bio: {
    width: "90%",
    fontSize: 16,
  },
  seeMore: {
    width: "90%",
    alignItems: "flex-end",
  },
  seeMoreText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  btnContainer: {
    width: "85%",
    marginBottom: 10,
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MemberScreen;
