import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Container = ({ children, back = true }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {back && (
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          {/* <Image source={require('../../assets/Header/backArrow.png')} style={styles.backIcon} /> */}
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
    width: '100%',
    position: 'absolute',
    top: 20,
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    maxWidth: 700,
    minHeight: '85%',
  },
  back: {
    paddingTop: 30,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 7,
  },
  backText: {
    color: '#437689', // Replace with your color
    opacity: 0.7,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    marginTop: 40,
  },
});

export default Container;
