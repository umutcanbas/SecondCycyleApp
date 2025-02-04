import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import EyeOpen from '../assets/icons/eye-open.svg';
import EyeClose from '../assets/icons/eye-close.svg';

const Input = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  isSecure = false,
  containerStyles,
  isMultiline=false,
}) => {
  const [isSecureText, setSecureText] = useState(isSecure);

  return (
    <View
      style={{
        ...styles.container,
        ...containerStyles,
      }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="black"
        autoCapitalize="none"
        secureTextEntry={isSecureText}
        keyboardType={keyboardType}
        multiline={isMultiline}
      />
      {isSecure && (
        <TouchableOpacity
          onPress={() => setSecureText(prev => !prev)}
          style={styles.icon}>
          {isSecureText ? (
            <EyeClose width={26} height={26} />
          ) : (
            <EyeOpen width={26} height={26} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    margin: 10,
    paddingHorizontal: 14,
    borderRadius: 45,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  input: {
    width: 350,
    color: 'black',
    marginLeft: 10,
  },
  icon: {
    padding: 5,
  },
});
