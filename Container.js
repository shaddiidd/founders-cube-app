import React, { useContext, useEffect, useState } from 'react';
import { View, StatusBar, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import AppNavigation from './AppNavigation';
import Context from './Context';

export default function Container() {
  const { loading } = useContext(Context);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 400);
  }, []);

  return (
    <>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />
      {start && <AppNavigation />}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  blank: {
    flex: 1,
    backgroundColor: "#F6F7F7"
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
