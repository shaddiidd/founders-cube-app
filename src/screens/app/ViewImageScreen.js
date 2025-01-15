import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';

const ViewImageScreen = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        maximumZoomScale={3}
        minimumZoomScale={1}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkgrey",
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ViewImageScreen;
