import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input'; // React Native equivalent for phone input
import { Picker } from '@react-native-picker/picker'; // Picker for select options

const TextIconOutside = ({
  type,
  value,
  icon,
  onChange,
  placeholder,
  select = false,
  options = [],
  title = ""
}) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      {!select && (
        <>
          {type === 'phone' ? (
            <PhoneInput
              defaultValue={value}
              defaultCode="JO"
              placeholder={placeholder || "+962 7 9999 9999"}
              onChangeFormattedText={(text) => onChange(text)}
              containerStyle={[styles.input, { backgroundColor: 'transparent' }]}
              textContainerStyle={[styles.phoneTextContainer, { backgroundColor: 'transparent' }]}
              codeTextStyle={{ backgroundColor: 'transparent' }}
              flagButtonStyle={{ display: 'none' }}
              style={styles.input}
            />          
          ) : (
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={(text) => onChange(text)}
              style={styles.input}
              keyboardType={type === 'number' ? 'numeric' : 'default'}
            />
          )}
        </>
      )}
      {select && (
        <TouchableOpacity 
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={styles.input}
          onPress={() => navigation.push("List", { options, onSelect: onChange, title })}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 16 }}>{value}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '95%',
    height: 50,
  },
  icon: {
    marginRight: '5%',
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: 'black',
    justifyContent: "center",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  phoneInputContainer: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  phoneTextContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: 'transparent', // Ensure transparency
  },
});

export default TextIconOutside;
