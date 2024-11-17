import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Icon } from "react-native-elements";

export default function LinkCard({ link, edit = false, onEdit, onRemove }) {
  const openURL = () => {
    Linking.openURL(`https://${link.url}`);
  };

  return (
    <TouchableOpacity
      onPress={edit ? () => {} : openURL}
      activeOpacity={edit ? 1 : 0.7}
      style={styles.card}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <Icon name="link" type="material" size={25} color="#00516A" />
        </View>
        <Text style={[styles.title, { maxWidth: edit ? "71%" : "78%" }]}>{link.title}</Text>
      </View>
      {edit ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.7} onPress={onEdit}>
            <Icon
              name="create"
              type="material"
              size={20}
              color="#457789"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
            <Icon
              name="trash"
              type="ionicon"
              size={20}
              color="#E02A2A"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Icon name="open-outline" type="ionicon" color="rgb(52, 122, 143)" size={22} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "white",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  title: {
    fontSize: 18,
  },
  icon: {
    marginLeft: 5,
  },
});
