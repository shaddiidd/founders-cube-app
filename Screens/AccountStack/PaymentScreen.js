import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { get, post } from "../../fetch";
import Context from "../../Context";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const [accountDetails, setAccountDetails] = useState({});
  const { loading, setLoading, user } = useContext(Context);
  const { pack, type } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 150, height: 0 });

  useEffect(() => {
    setLoading(true);
    get("settings/billing")
      .then((response) => {
        setLoading(false);
        setAccountDetails(response);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Error", "There seems to be a problem");
      });
  }, [setLoading]);

  useEffect(() => {
    navigation.setOptions({ title: `${pack.name} Plan` || "Payment" });
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      setSelectedImage(selected);

      Image.getSize(selected.uri, (width, height) => {
        const aspectRatio = height / width;
        const calculatedHeight = 150 * aspectRatio;
        setImageDimensions({ width: 150, height: calculatedHeight });
      });
    }
  };

  const uploadFile = async (file) => {
    try {
      const response = await post("/file/uploadLink", {
        fileName: file.name,
        storagePath: "sales",
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
      console.error("Error uploading file:", error);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const optimizedImage = await manipulateAsync(
        selectedImage.uri,
        [],
        { format: SaveFormat.JPEG, compress: 0.25 }
      );

      const imageId = `image-${Date.now()}`;
      const optimizedImageWithMeta = {
        uri: optimizedImage.uri,
        type: "image/jpeg",
        name: imageId,
      };

      await uploadFile(optimizedImageWithMeta);

      return { imageId };
    } catch (error) {
      console.error("Error manipulating image:", error);
    }
  };

  const submit = async () => {
    setLoading(true);
    const image = await uploadImage();
    const body = {
      method: type,
      pid: pack.id,
      image,
    };

    post("sales", body)
      .then(() => Alert.alert("Success!", "Payment has been sent. You'll be notified as soon as we approve it."))
      .catch((error) => Alert.alert("Sorry!", error?.response?.data?.error || "There seems to be a problem. Please come back later."))
      .finally(() => {
        setLoading(false);
        navigation.pop(4);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ flex: 1 }}>
          <Text style={styles.price}>JD {pack.price}</Text>
          <Text style={styles.mainDetails}>{pack.name} plan fees</Text>
        </View>
        <View style={styles.listIconContainer}>
          {type === "CLIQ" && <Icon name="cash-outline" type="ionicon" size={30} color="#437689" />}
          {type === "Bank" && <Icon name="business-outline" type="ionicon" size={30} color="#437689" />}
          {type === "Card" && <Icon name="card-outline" type="ionicon" size={30} color="#437689" />}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={{ color: "#666" }}>Name</Text>
          <Text style={styles.value}>{accountDetails.name}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={{ color: "#666" }}>Bank</Text>
          <Text style={styles.value}>{accountDetails.bank}</Text>
        </View>
        {type.toLowerCase() !== "cliq" && (
          <>
            <View style={styles.cardRow}>
              <Text style={{ color: "#666" }}>ACC Number</Text>
              <Text style={styles.value}>{accountDetails.accountNo}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={{ color: "#666" }}>IBAN</Text>
              <Text style={styles.value}>{accountDetails.iban}</Text>
            </View>
          </>
        )}
        {type.toLowerCase() === "cliq" && (
          <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>CLIQ</Text>
            <Text style={styles.value}>{accountDetails.cliq}</Text>
          </View>
        )}
      </View>
      {!selectedImage ? (
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={pickImage}>
          <Icon name="image" color="white" />
          <Text style={styles.buttonText}> Upload Screenshot</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}

      {selectedImage && (
        <TouchableOpacity onPress={() => setSelectedImage(null)} activeOpacity={0.7} style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={{ width: imageDimensions.width, height: imageDimensions.height, borderRadius: 10 }}
          />
          <View style={styles.trash}>
            <Icon name="trash" type="ionicon" color="white" size={10} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F7F7",
    flex: 1,
  },
  main: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    width: "90%",
    fontSize: 30,
    fontWeight: "600",
  },
  mainDetails: {
    color: "#666",
  },
  listIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#eee",
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    marginTop: 20
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  value: {
    fontWeight: "500",
    maxWidth: "50%",
    textAlign: "right",
  },
  imagePreviewContainer: {
    // marginTop: 15,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    objectFit: "contain",
    backgroundColor: "#ccc"
  },
  
  trash: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent:"center",
    alignItems: "center",
    position: "absolute",
    top: 2,
    right: 2,
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#000",
    width: "90%",
    minHeight: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default PaymentScreen;
