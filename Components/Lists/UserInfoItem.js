import React, { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import * as Clipboard from 'expo-clipboard';

const UserInfoItem = ({ item, onPress }) => {
  const [showCopied, setShowCopied] = useState(false);

  const copyTextToClipboard = async (text) => {
    // Clipboard.setString(text);
    setShowCopied(true);
  };

  useEffect(() => {
    if (showCopied) {
      const timer = setTimeout(() => setShowCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCopied]);

  return (
    <TouchableOpacity
      style={[styles.listItem, item.to === "" && styles.disabled]}
      onPress={onPress}
      disabled={item.unclickable}
      activeOpacity={0.7}
    >
      <Image source={item.img} style={styles.icon} />
      <Text style={[styles.text, item.to === "" && styles.disabledText]}>{item.text}</Text>
      {showCopied && <Text style={styles.copiedText}>COPIED</Text>}
      {item.to === "" && <Text style={styles.soonText}>SOON</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 20,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  copiedText: {
    fontSize: 15,
    color: '#7dbcd9',
    position: 'absolute',
    right: 30,
    fontWeight: "bold"
  },
  soonText: {
    fontSize: 15,
    color: '#7dbcd9',
    position: 'absolute',
    right: 30,
    fontWeight: "bold"
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default UserInfoItem;
