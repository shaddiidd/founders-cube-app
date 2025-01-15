import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const ListItem = ({ icon, title, to, sep = true, onPress, nav = false }) => {

  const navigation = useNavigation();
  const handlePress = () => {
    if (to) {
        navigation.navigate(to)
    }
    else if (onPress) {
        onPress();
    }
  }

  return (
    <>
        <TouchableOpacity activeOpacity={0.7} style={styles.listItem} onPress={handlePress}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={icon} type="ionicon" color="#777" size={25} />
                <Text style={styles.listItemTitle}>{title}</Text>
            </View>
            {nav && <Icon name="chevron-forward" type="ionicon" color="#777" size={22} />}
        </TouchableOpacity>
        {sep ? <View style={styles.sep} /> : <></>}
    </>
  );
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 5,
        width: "90%"
    },
    listItemTitle: {
        marginLeft: 10,
        fontSize: 16,
    },
    sep: {
        backgroundColor: "black",
        width: "90%",
        height: 1,
        opacity: 0.1
    }
});

export default ListItem;
