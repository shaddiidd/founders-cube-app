import { View, StyleSheet, Alert, Dimensions } from "react-native";
import { get } from "../../fetch";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import PlansOverviewCard from "../../Components/Account/PlansOverviewCard";
import "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

export default function MembershipPlansScreen() {
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
      <Carousel
        width={width}
        data={packs}
        renderItem={({ item }) => (
          <View style={styles.carouselItemContainer}>
            <PlansOverviewCard pack={item} />
          </View>
        )}
        mode="default"
        onSnapToItem={(index) => setCurrentIndex(index)}
        loop={false}
        pagingEnabled
        style={styles.carousel}
        containerCustomStyle={{ paddingLeft: "5%" }}
      />

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
    alignItems: "center",
  },
  carousel: {
    height: "95%",
    paddingLeft: "5%",
  },
  carouselItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 20,
    height: 6,
    marginHorizontal: 2,
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
