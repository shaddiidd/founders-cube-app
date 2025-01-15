import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import MembersCard from "../../components/community/MembersCard";
import { get } from "../../utils/fetch";
import Context from "../../states/Context";
import { useNavigation } from "@react-navigation/native";
import Search from "../../components/inputs/Search";
import { industries } from "../../data/industries";

const MembersScreen = ({ route }) => {
  const { special } = route.params || false;
  const [members, setMembers] = useState([]);
  const [shownMembers, setShownMembers] = useState([]);
  const [verifiedMembers, setVerifiedMembers] = useState(false);
  const { setLoading } = useContext(Context);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: special ? "Special Members" : "Connect with Founders",
    });
  }, [navigation, special]);

  const fetchMembers = async () => {
    try {
      const response = await get(special ? "special-members" : "user/");
      const updatedResponse = Object.keys(response).map((id) => ({
        id,
        ...response[id],
      }));
      setMembers(updatedResponse);
      filterMembers(
        updatedResponse,
        searchText,
        selectedOption,
        verifiedMembers
      );
    } catch {
      Alert.alert("Sorry!", "There seems to be a problem. Please come back later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMembers();
  }, []);

  const filterMembers = (
    membersData,
    searchText,
    selectedOption,
    verifiedMembers
  ) => {
    const filteredMembers = membersData.filter((member) => {
      const isAllOption = selectedOption.toLowerCase() === "all";
      const matchesIndustry =
        isAllOption ||
        (member.industry &&
          member.industry.toLowerCase() === selectedOption.toLowerCase());
      const matchesSearchText =
        member.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        (member.industry &&
          member.industry.toLowerCase().includes(searchText.toLowerCase())) ||
        (member.bio &&
          member.bio.toLowerCase().includes(searchText.toLowerCase()));
      const matchesVerified = !verifiedMembers || member.isVerified;

      return matchesIndustry && matchesSearchText && matchesVerified;
    });

    setShownMembers(filteredMembers);
  };

  useEffect(() => {
    filterMembers(members, searchText, selectedOption, verifiedMembers);
  }, [members, searchText, selectedOption, verifiedMembers]);

  const openFilter = () => {
    const memberIndustries = new Set(
      members
        .filter((member) => member?.industry)
        .map((member) => member.industry)
    );

    const filteredOptions = industries.filter(
      (option) => option === "All" || memberIndustries.has(option)
    );

    navigation.navigate("List", {
      options: filteredOptions,
      onSelect: (option) => {
        setSelectedOption(option);
        setVerifiedMembers(false);
      },
      title: "Industries",
    });
  };

  return (
    <View style={styles.container}>
      <Search
        placeholder="Search members"
        searchText={searchText}
        onSearch={setSearchText}
      />
      <ScrollView bounces={false} onPress={() => Keyboard.dismiss()} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", flexDirection: "row" }} horizontal style={styles.buttonContainer}>
        {selectedOption === "All" ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.filter}
            onPress={openFilter}
          >
            <Icon name="funnel" type="ionicon" size={16} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.toggleButton,
              selectedOption !== "All" &&
                !verifiedMembers &&
                styles.activeButton,
            ]}
            onPress={openFilter}
          >
            <Icon name="funnel" type="ionicon" size={16} />
            <Text style={styles.buttonText}> {selectedOption}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.toggleButton,
            selectedOption === "All" && !verifiedMembers && styles.activeButton,
          ]}
          onPress={() => {
            setVerifiedMembers(false);
            setSelectedOption("All");
          }}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.toggleButton, verifiedMembers && styles.activeButton]}
          onPress={() => {
            setVerifiedMembers(true);
            setSelectedOption("All");
          }}
        >
          <Text style={styles.buttonText}>Verified </Text>
          <Icon name="verified" size={16} />
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={shownMembers}
        keyExtractor={(member) => member.id.toString()}
        renderItem={({ item }) => <MembersCard member={item} />}
        style={styles.list}
        horizontal={false}
        onScroll={() => Keyboard.dismiss()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchMembers();
            }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F6F7F7",
    paddingTop: 5,
  },
  list: {
    width: "100%",
    paddingTop: 5,
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: "5%",
    maxHeight: 40,
  },
  toggleButton: {
    alignItems: "center",
    borderRadius: 50,
    marginRight: 7,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderWidth: 1,
    height: 30
  },
  filter: {
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    height: 30,
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default MembersScreen;
