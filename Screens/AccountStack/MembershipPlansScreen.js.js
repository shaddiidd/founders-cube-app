import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import { get } from "../../fetch";
import Context from "../../Context";
import PlansOverviewCard from "../../Components/Account/PlansOverviewCard";

export default function MembershipPlansScreen({ navigation }) {
  const [packs, setPacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setLoading } = useContext(Context);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    setLoading(true);
    get("settings/packages")
      .then((response) => {
        const updatedResponse = Object.keys(response).map((id) => ({
          id,
          ...response[id],
        }));
        setPacks(updatedResponse);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There seems to be a problem. Please come back later"
        );
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {packs.length ? (
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
        >
          {packs.map((item, index) => (
            <View style={styles.page} key={item.id}>
              <PlansOverviewCard
                pack={item}
                onPress={() =>
                  navigation.navigate("PaymentMethodScreen", { pack: item })
                }
              />
            </View>
          ))}
        </PagerView>
      ) : (
        <></>
      )}

      {packs.length > 1 && (
        <View style={styles.paginationContainer}>
          {packs.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F7",
  },
  pagerView: {
    flex: 1,
    width: "100%",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  paginationContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: 25,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    marginHorizontal: 3,
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
