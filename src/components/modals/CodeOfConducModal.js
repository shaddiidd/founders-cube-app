import React, { useState } from "react";
import { View, Modal, StyleSheet, StatusBar, Platform } from "react-native";
import ListItem from "../account/ListItem";
import Terms from "./Terms";

const CodeOfConducModal = ({ termsError }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <ListItem
        icon="document-text-outline"
        title="Code of Conduct"
        onPress={openModal}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View style={styles.modalOverlay}>
          <Terms closeModal={closeModal} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 80,
  },
});

export default CodeOfConducModal;
